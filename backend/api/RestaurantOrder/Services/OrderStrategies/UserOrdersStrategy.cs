using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Constants;
using RestaurantOrder.Data;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;

namespace RestaurantOrder.Services.OrderStrategies
{
    public class UserOrdersStrategy : IOrdersStrategy
    {
        public bool CanHandle(string role) => role == UserRoles.USER;

        public async Task<List<Order>> GetOrders(AppDbContext dbContext, OrdersRequest request, CancellationToken cancellationToken)
        {
            return await dbContext.Orders
                .AsNoTracking()
                .Include(o=>o.Items)
                .ThenInclude(o=>o.Ingredients)
                .Where(o => o.UserId == request.UserId)
                .OrderByDescending(o=>o.CreatedAt)
                .ToListAsync(cancellationToken);
        }
    }

}
