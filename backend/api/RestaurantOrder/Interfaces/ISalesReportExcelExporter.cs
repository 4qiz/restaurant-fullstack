using RestaurantOrder.Dtos.SalesReport;

namespace RestaurantOrder.Interfaces
{
    public interface ISalesReportExcelExporter
    {
        byte[] Export(List<SalesReportRow> rows, DateTime from, DateTime to);
    }
}
