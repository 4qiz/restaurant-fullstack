namespace RestaurantOrder.Models
{
    public class Order
    {
        public int OrderId { get; set; } //pk
        public string UserId { get; set; } = string.Empty;
        public string? DeliveryId { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Comment { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DeliveryPrice { get; set; }

        public OrderStatus Status { get; set; }
        public OrderType Type { get; set; }
        public PaymentType PaymentType { get; set; }
        public bool HasPaid { get; set; }

        public List<OrderItem> Items { get; set; } = [];

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class OrderItem
    {
        public int Id { get; set; } //pk
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }

        public int ProductItemId { get; set; }
        public decimal Price { get; set; }
        public int Weight { get; set; }
        public ProductItemSize ProductItemSize { get; set; }
        public MeasureUnit MeasureUnit { get; set; }

        public int Quantity { get; set; }

        public List<Ingredient> Ingredients { get; set; } = [];

        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }

    public class Ingredient
    {
        public int Id { get; set; }
        public int IngredientId { get; set; } //pk
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public int OrderItemId { get; set; }
        public OrderItem OrderItem { get; set; } = null!;
    }
}
