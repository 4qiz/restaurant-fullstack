namespace RestaurantOrder.Dtos.SalesReport
{
    public class SalesReportResponseDto
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<SalesReportRow> Data { get; set; } = new();
    }
}
