using ClosedXML.Excel;
using RestaurantOrder.Dtos.SalesReport;
using RestaurantOrder.Interfaces;

namespace RestaurantOrder.Services.SalesReport
{
    public class SalesReportExcelExporter : ISalesReportExcelExporter
    {
        public byte[] Export(List<SalesReportRow> rows, DateTime from, DateTime to)
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Sales Report");

            worksheet.Cell("A1").Value = $"Отчет по продажам за период: {from:dd.MM.yyyy} - {to:dd.MM.yyyy}";
            worksheet.Range("A1:E1").Merge().Style.Font.SetBold().Font.FontSize = 14;

            // Заголовки
            worksheet.Cell("A2").Value = "№";
            worksheet.Cell("B2").Value = "Название";
            worksheet.Cell("C2").Value = "Количество";
            worksheet.Cell("D2").Value = "Средняя цена";
            worksheet.Cell("E2").Value = "Сумма продаж";

            var row = 3;
            int index = 1;
            foreach (var item in rows)
            {
                worksheet.Cell(row, 1).Value = index++;
                worksheet.Cell(row, 2).Value = item.Name;
                worksheet.Cell(row, 3).Value = item.Quantity;
                worksheet.Cell(row, 4).Value = item.AveragePrice;
                worksheet.Cell(row, 5).Value = item.Total;
                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return stream.ToArray();
        }
    }
}
