using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Constants;
using RestaurantOrder.Data;
using RestaurantOrder.Dtos.Order;
using RestaurantOrder.Hubs;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Mappers;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;
using System.Security.Claims;

namespace RestaurantOrder.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize]
    public class OrderController(
        AppDbContext context,
        IHubContext<OrderHub> hubContext,
        IMediator mediator, 
        IOrderCountNotifier orderCountNotifier
) : ControllerBase
    {
        private string? GetUserId() => User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        private string? GetUserRole() => User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        /// <summary>
        /// Получает список заказов.
        /// Стратегия получения заказов зависит от роли пользователя
        /// </summary>
        /// <param name="filters"> фильтры списка заказов (только для ADMIN)</param>
        /// <returns> 
        /// Для USER - заказы клиента;
        /// Для MANAGER - новые заказы, заказы в работе;
        /// Для DELIVERY - заказы в доставке;
        /// Для ADMIN - все заказы, фильтры;
        /// </returns>
        /// <response code="200"></response>
        /// <response code="401">Не авторизован</response>
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] OrdersFiltersDto filters, CancellationToken cancellationToken)
        {
            string? userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Invalid user ID" });
            }

            string? role = GetUserRole();
            if (role == null)
            {
                return Unauthorized(new { message = "Invalid user role" });
            }

            var request = new OrdersRequest(role, userId, filters);
            var orders = await mediator.Send(request, cancellationToken);

            return Ok(orders.Select(OrderMapper.OrderToDto));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN, MANAGER, DELIVERY")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await context.Orders.AsNoTracking()
                .Include(o => o.Items)
                .ThenInclude(o => o.Ingredients)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(OrderMapper.OrderToDto(order));
        }

        /// <summary>
        /// POST api/order 
        /// </summary>
        /// <param name="dto">Тело заказа</param>
        /// <response code="200">Заказ сохранен</response>
        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto dto)
        {
            try
            {
                string? userId = GetUserId();
                if (userId == null)
                {
                    return Unauthorized(new { message = "Invalid user ID" });
                }

                // новые заказы клиента
                var newOrdersCount = await context.Orders.AsNoTracking()
                    .Where(o => o.UserId == userId &&
                    (o.Status == OrderStatus.CREATED || o.Status == OrderStatus.COOKING))
                    .CountAsync();

                if (newOrdersCount >= 5)
                {
                    return BadRequest(new { message = "Maximum 5 active orders" });
                }

                //await orderPublisher.PublishOrderAsync(dto); // Отправляем в RabbitMQ

                // Mapper
                var order = OrderMapper.DtoToOrder(dto);

                //  Сохраняем в БД
                context.Orders.Add(order);
                await context.SaveChangesAsync();
                dto.OrderId = order.OrderId; // update ai id

                await orderCountNotifier.NotifyAsync();

                //  отправка заказа в админку
                await hubContext.Clients.All.SendAsync("NewOrderAdmin", dto);

                return Ok(new { message = "Order created successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[OrderController] - ${ex}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }

        }

        [HttpPut("{orderId}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromQuery] bool isCancelled)
        {
            string? userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Invalid user ID" });
            }

            string? role = GetUserRole();
            if (role == null)
            {
                return Unauthorized(new { message = "Invalid user role" });
            }

            var order = await context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound();
            }

            if (isCancelled && order.HasPaid)
            {
                order.Status = OrderStatus.REFUND;
            }
            else if (isCancelled) // TODO: protect cancel order; if role = user && order status = created
            {
                order.Status = OrderStatus.CANCELLED;
            }
            else if (order.Status == OrderStatus.CREATED && (role == UserRoles.ADMIN || role == UserRoles.MANAGER))
            {
                order.Status = OrderStatus.COOKING;
            }
            else if (order.Status == OrderStatus.COOKING && (role == UserRoles.ADMIN || role == UserRoles.MANAGER))
            {
                if (order.Type == OrderType.DELIVERY)
                {
                    order.Status = OrderStatus.WAITINGDELIVERY;
                }
                else
                {
                    order.Status = OrderStatus.READYFORPICK;
                }
            }
            else if (order.Status == OrderStatus.WAITINGDELIVERY && (role == UserRoles.ADMIN || role == UserRoles.DELIVERY))
            {
                order.Status = OrderStatus.INDELIVERY;
                order.DeliveryId = userId;
            }
            else if (order.Status == OrderStatus.INDELIVERY && (role == UserRoles.ADMIN || role == UserRoles.DELIVERY))
            {
                order.Status = OrderStatus.READYFORPICK;
            }
            else if (order.Status == OrderStatus.READYFORPICK && (role == UserRoles.ADMIN || role == UserRoles.DELIVERY) && order.Type == OrderType.DELIVERY)
            {
                order.Status = OrderStatus.RECEIVED;
                order.HasPaid = true;
            }
            else if (order.Status == OrderStatus.READYFORPICK && (role == UserRoles.ADMIN || role == UserRoles.MANAGER) && order.Type == OrderType.SELFPICK)
            {
                order.Status = OrderStatus.RECEIVED;
                order.HasPaid = true;
            }

            await context.SaveChangesAsync();

            var orderDto = OrderMapper.OrderToDto(order);

            // Уведомляем клиента через SignalR
            await hubContext.Clients
                .User(order.UserId.ToString()) // WARNING: signalR use jwt sub as userId
                .SendAsync("OrderUpdated", orderDto);

            await hubContext.Clients.All.SendAsync("OrderUpdatedAdmin", orderDto);

            await orderCountNotifier.NotifyAsync();

            return Ok(orderDto);
        }
    }
}
