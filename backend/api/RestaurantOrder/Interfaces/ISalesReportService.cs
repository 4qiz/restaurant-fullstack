namespace RestaurantOrder.Interfaces
{
    public interface ISalesReportService
    {
        Task<byte[]> GenerateReportAsync(DateTime? from, DateTime? to);
    }
}
