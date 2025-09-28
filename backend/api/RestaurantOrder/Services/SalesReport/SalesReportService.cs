using RestaurantOrder.Interfaces;

namespace RestaurantOrder.Services.SalesReport
{
    public class SalesReportService : ISalesReportService
    {
        private readonly ISalesReportDataService _dataService;
        private readonly ISalesReportExcelExporter _exporter;

        public SalesReportService(
            ISalesReportDataService dataService,
            ISalesReportExcelExporter exporter)
        {
            _dataService = dataService;
            _exporter = exporter;
        }

        public async Task<byte[]> GenerateReportAsync(DateTime? from, DateTime? to)
        {
            var actualTo = to ?? DateTime.UtcNow;
            var actualFrom = from ?? actualTo.AddDays(-30);

            var data = await _dataService.GetReportDataAsync(actualFrom, actualTo);
            return _exporter.Export(data, actualFrom, actualTo);
        }
    }
}
