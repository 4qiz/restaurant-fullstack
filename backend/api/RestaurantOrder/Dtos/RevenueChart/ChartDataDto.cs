namespace RestaurantOrder.Dtos.RevenueChart
{
    public class StatsCardDto
    {
        public string Amount { get; set; }
        public string Label { get; set; }
    }

    public class ChartDataDto
    {
        public string Period { get; set; }
        public decimal Value { get; set; }
    }
}
