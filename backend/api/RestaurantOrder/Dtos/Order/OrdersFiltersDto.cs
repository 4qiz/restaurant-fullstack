using RestaurantOrder.Models;

namespace RestaurantOrder.Dtos.Order
{
    public class OrdersFiltersDto
    {
        public bool History { get; set; } = false;
        public List<OrderStatus>? Statuses { get; set; }
        public DateTime? CreatedAtSince { get; set; }
        public DateTime? CreatedAtBefore { get; set; }
    }
}
