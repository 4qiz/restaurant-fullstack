using MediatR;
using RestaurantOrder.Data;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;
using RestaurantOrder.Services.OrderQueries;

namespace RestaurantOrder.Services.QueryHandlers
{
    public class OrdersRequestHandler(AppDbContext dbContext,
        IEnumerable<IOrdersStrategy> strategies) : IRequestHandler<OrdersRequest, List<Order>>
    {
        public async Task<List<Order>> Handle(OrdersRequest request, CancellationToken cancellationToken)
        {
            var strategy = strategies.SingleOrDefault(s => s.CanHandle(request.Role))
                ?? throw new UnauthorizedAccessException("Недостаточно прав");
            return await strategy.GetOrders(dbContext, request, cancellationToken);
        }
    }
}