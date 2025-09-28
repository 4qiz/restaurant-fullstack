using Microsoft.AspNetCore.Mvc;
using RestaurantOrder.Dtos.SalesReport;
using RestaurantOrder.Interfaces;

namespace RestaurantOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ISalesReportService _reportService;
        private readonly ISalesReportDataService _dataService;

        public ReportsController(ISalesReportService reportService, ISalesReportDataService dataService)
        {
            _reportService = reportService;
            _dataService = dataService;
        }

        [HttpGet("sales")]
        public async Task<IActionResult> GenerateSalesReport([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var file = await _reportService.GenerateReportAsync(from, to);

            var fileName = $"SalesReport_{DateTime.UtcNow:yyyyMMddHHmmss}.xlsx";
            return File(file,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName);
        }

        [HttpGet("sales/data")]
        public async Task<ActionResult<SalesReportResponseDto>> GetSalesReportData([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var actualTo = to ?? DateTime.UtcNow;
            var actualFrom = from ?? actualTo.AddDays(-30);

            var data = await _dataService.GetReportDataAsync(actualFrom, actualTo);

            return Ok(new SalesReportResponseDto
            {
                From = actualFrom,
                To = actualTo,
                Data = data
            });
        }
    }
}
