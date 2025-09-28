using RestaurantOrder.Dtos.Order;

namespace RestaurantOrder.Interfaces
{
    public interface IOrderPublisher
    {
        Task PublishOrderAsync(OrderDto order);
    }
}
