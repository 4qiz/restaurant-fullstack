using RestaurantOrder.Data;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;

namespace RestaurantOrder.Interfaces
{
    public interface IOrdersStrategy
    {
        bool CanHandle(string role);
        Task<List<Order>> GetOrders(AppDbContext dbContext, OrdersRequest request, CancellationToken cancellationToken);
    }
}
