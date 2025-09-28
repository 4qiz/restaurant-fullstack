using RestaurantOrder.Dtos.SalesReport;

namespace RestaurantOrder.Interfaces
{
    public interface ISalesReportDataService
    {
        Task<List<SalesReportRow>> GetReportDataAsync(DateTime from, DateTime to);
    }
}
