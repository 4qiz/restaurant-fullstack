namespace RestaurantOrder.Dtos.TopProductsChart
{
    public class ProductsChartDto
    {
        public string ProductName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal Percentage { get; set; }
    }
}
