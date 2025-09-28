namespace RestaurantOrder.Dtos.SalesReport
{
    public class SalesReportRow
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal Total { get; set; }
    }
}
