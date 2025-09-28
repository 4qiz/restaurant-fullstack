using MediatR;
using RestaurantOrder.Dtos.Order;
using RestaurantOrder.Models;

namespace RestaurantOrder.Services.OrderQueries
{
    public class OrdersRequest(string role, string userId, OrdersFiltersDto filters) : IRequest<List<Order>>
    {
        public string Role { get; } = role;
        public string UserId { get; } = userId;
        public OrdersFiltersDto Filters { get; } = filters;
    }
}
