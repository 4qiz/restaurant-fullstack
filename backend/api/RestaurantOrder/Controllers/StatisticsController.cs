using Microsoft.AspNetCore.Mvc;
using RestaurantOrder.Dtos.RevenueChart;
using RestaurantOrder.Services.Statistics;

namespace RestaurantOrder.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController(StatisticsService statsService) : ControllerBase
    {
        [HttpGet("top-products-chart")]
        public async Task<IActionResult> GetProductStatistics([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] int topCount = 5)
        {
            if (!startDate.HasValue)
            {
                startDate = DateTime.UtcNow.AddDays(-7); // Use UTC time
            }

            if (!endDate.HasValue)
            {
                endDate = DateTime.UtcNow; // Use UTC time
            }

            if (startDate > endDate)
            {
                return BadRequest("Start date cannot be after end date.");
            }

            var statistics = await statsService.GetProductStatisticsAsync(startDate.Value, endDate.Value, topCount);

            return Ok(statistics);
        }

        [HttpGet("revenue-chart-data")]
        public async Task<IActionResult> GetRevenueChartData([FromQuery] string? filter)
        {
            filter ??= "month";

            List<ChartDataDto> chartData;

            if (filter == "week")
            {
                chartData = await statsService.GetWeekRevenueChartDataAsync();
            }
            else if (filter == "day")
            {
                chartData = await statsService.GetDayRevenueChartDataAsync();
            }
            else
            {
                chartData = await statsService.GetMonthRevenueChartDataAsync();
            }

            var stats = await statsService.GetRevenueStatsAsync();

            return Ok(new { chartData, stats });
        }

        [HttpGet("avg-bill")]
        public async Task<IActionResult> GetAverageBill()
        {
            var data = await statsService.GetAvgBillDataAsync();

            return Ok(data);
        }
    }
}
