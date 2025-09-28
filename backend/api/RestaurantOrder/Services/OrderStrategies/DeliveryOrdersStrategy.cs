using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Constants;
using RestaurantOrder.Data;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;

namespace RestaurantOrder.Services.OrderStrategies
{
    public class DeliveryOrdersStrategy : IOrdersStrategy
    {
        public bool CanHandle(string role) => role == UserRoles.DELIVERY;

        public async Task<List<Order>> GetOrders(AppDbContext dbContext, OrdersRequest request, CancellationToken cancellationToken)
        {
            var orders = dbContext.Orders
                .AsNoTracking()
                .Include(o => o.Items)
                .ThenInclude(o => o.Ingredients)
                .OrderByDescending(o => o.CreatedAt)
                .AsQueryable();

            var filters = request.Filters;

            if (filters.History)
            {
                orders = orders.Where(o => o.DeliveryId == request.UserId
                    && (o.Status == OrderStatus.CANCELLED
                    || o.Status == OrderStatus.RECEIVED
                    || o.Status == OrderStatus.REFUND));
            }
            else
            {
                orders = orders.Where(o => o.Status == OrderStatus.WAITINGDELIVERY
                    || (o.Status == OrderStatus.INDELIVERY && o.DeliveryId == request.UserId)
                    || (o.Status == OrderStatus.READYFORPICK && o.DeliveryId == request.UserId));
            }

            var result = await orders.ToListAsync(cancellationToken);
            return result;
        }
    }
}
