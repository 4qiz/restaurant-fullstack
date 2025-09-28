using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Constants;
using RestaurantOrder.Data;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;

namespace RestaurantOrder.Services.OrderStrategies
{
    public class AdminOrdersStrategy : IOrdersStrategy
    {
        public bool CanHandle(string role) => role == UserRoles.ADMIN;

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
                orders = orders.Where(o => o.Status == OrderStatus.CANCELLED
                    || o.Status == OrderStatus.RECEIVED
                    || o.Status == OrderStatus.REFUND);
            }

            if (filters.Statuses is { Count: > 0 })
            {
                var statusSet = new HashSet<OrderStatus>(filters.Statuses);
                orders = orders.Where(o => statusSet.Contains(o.Status));
            }

            if (filters.CreatedAtSince.HasValue)
            {
                orders = orders.Where(o => o.CreatedAt >= filters.CreatedAtSince.Value);
            }

            if (filters.CreatedAtBefore.HasValue)
            {
                orders = orders.Where(o => o.CreatedAt <= filters.CreatedAtBefore.Value);
            }

            var result = await orders.ToListAsync(cancellationToken);
            return result;
        }
    }
}
