using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Data;
using RestaurantOrder.Dtos.AvgBill;
using RestaurantOrder.Dtos.RevenueChart;
using RestaurantOrder.Dtos.TopProductsChart;
using RestaurantOrder.Models;
using System.Globalization;

namespace RestaurantOrder.Services.Statistics
{
    public class StatisticsService(AppDbContext context)
    {
        private async Task<List<Order>> GetOrdersAsync(DateTime fromDate)
        {
            return await context.Orders.AsNoTracking()
                //.Where(o => o.Status == OrderStatus.RECEIVED && o.HasPaid && o.CreatedAt >= fromDate)
                .ToListAsync();
        }

        private async Task<List<Order>> GetOrdersAsync()
        {
            return await context.Orders.AsNoTracking().ToListAsync();
        }

        /// <summary>
        /// Топ 5 товаров за период
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="topCount"></param>
        /// <returns></returns>
        public async Task<List<ProductsChartDto>> GetProductStatisticsAsync(DateTime startDate, DateTime endDate, int? topCount)
        {
            var orders = await context.Orders
                .AsNoTracking()
                .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate)
                .Include(o => o.Items)
                .ToListAsync();

            var productStats = orders
                .SelectMany(o => o.Items)
                .GroupBy(i => i.Name)
                .Select(g => new
                {
                    ProductName = g.Key,
                    TotalAmount = g.Sum(i => i.Quantity), // Количество, а не сумма
                })
                .ToList();

            var totalAmount = productStats.Sum(p => p.TotalAmount);

            var sorted = productStats
                .OrderByDescending(p => p.TotalAmount)
                .ToList();

            var result = new List<ProductsChartDto>();

            if (topCount.HasValue && topCount.Value > 0 && topCount.Value < sorted.Count)
            {
                var topItems = sorted.Take(topCount.Value).ToList();
                var otherItems = sorted.Skip(topCount.Value).ToList();

                result.AddRange(topItems.Select(p => new ProductsChartDto
                {
                    ProductName = p.ProductName,
                    TotalAmount = p.TotalAmount,
                    Percentage = totalAmount > 0 ? Math.Round((decimal)p.TotalAmount / totalAmount * 100, 0) : 0
                }));

                var otherTotal = otherItems.Sum(p => p.TotalAmount);
                if (otherTotal > 0)
                {
                    result.Add(new ProductsChartDto
                    {
                        ProductName = "Остальное",
                        TotalAmount = otherTotal,
                        Percentage = totalAmount > 0 ? Math.Round((decimal)otherTotal / totalAmount * 100, 0) : 0
                    });
                }
            }
            else
            {
                result = sorted.Select(p => new ProductsChartDto
                {
                    ProductName = p.ProductName,
                    TotalAmount = p.TotalAmount,
                    Percentage = totalAmount > 0 ? Math.Round((decimal)p.TotalAmount / totalAmount * 100, 0) : 0
                }).ToList();
            }

            return result;
        }

        /// <summary>
        /// Сумма заказов по месяцам за последние 6 месяцев
        /// </summary>
        /// <returns></returns>
        public async Task<List<ChartDataDto>> GetMonthRevenueChartDataAsync()
        {
            var currentDate = DateTime.UtcNow;
            var orders = await GetOrdersAsync(currentDate.AddMonths(-5));

            return GetAggregatedRevenueData(6, i =>
            {
                var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1).AddMonths(-i);
                var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);
                var monthName = CultureInfo.GetCultureInfo("ru-RU").DateTimeFormat.GetMonthName(startOfMonth.Month);
                return (startOfMonth, endOfMonth, monthName);
            }, orders);
        }

        /// <summary>
        /// Сумма заказов по неделям за последние 6 недель
        /// </summary>
        /// <returns></returns>
        public async Task<List<ChartDataDto>> GetWeekRevenueChartDataAsync()
        {
            var currentDate = DateTime.UtcNow;
            var startOfCurrentWeek = currentDate.Date.AddDays(-(int)currentDate.DayOfWeek + (int)DayOfWeek.Monday);
            var orders = await GetOrdersAsync(startOfCurrentWeek.AddDays(-35));

            return GetAggregatedRevenueData(6, i =>
            {
                var startOfWeek = startOfCurrentWeek.AddDays(-7 * i);
                var endOfWeek = startOfWeek.AddDays(6);
                return (startOfWeek, endOfWeek, startOfWeek.ToString("dd.MM.yyyy"));
            }, orders);
        }

        /// <summary>
        /// Сумма заказов по дням за последние 7 дней 
        /// </summary>
        /// <returns></returns>
        public async Task<List<ChartDataDto>> GetDayRevenueChartDataAsync()
        {
            var currentDate = DateTime.UtcNow.Date;
            var orders = await GetOrdersAsync(currentDate.AddDays(-6));

            return GetAggregatedRevenueData(7, i =>
            {
                var day = currentDate.AddDays(-i);
                var startOfDay = day;
                var endOfDay = day.AddDays(1).AddTicks(-1); // Учитываем все время суток
                return (startOfDay, endOfDay, day.ToString("dd.MM.yyyy"));
            }, orders);
        }

        private List<ChartDataDto> GetAggregatedRevenueData(int periods, Func<int, (DateTime Start, DateTime End, string Label)> periodFunc, List<Order> orders)
        {
            var data = new List<ChartDataDto>();

            for (int i = periods - 1; i >= 0; i--)
            {
                var (start, end, label) = periodFunc(i);
                var totalAmount = orders
                    .Where(o => o.CreatedAt >= start && o.CreatedAt <= end)
                    .Sum(o => o.TotalAmount);

                data.Add(new ChartDataDto { Period = label, Value = totalAmount });
            }

            return data;
        }

        public async Task<List<StatsCardDto>> GetRevenueStatsAsync()
        {
            // Получаем текущую дату
            var currentDate = DateTime.Now;

            // Получаем заказы из базы данных
            var orders = await GetOrdersAsync();

            // Для квартала
            var quarterStartDate = currentDate.AddMonths(-3);
            var totalAmountQuarter = orders
                .Where(o => o.CreatedAt >= quarterStartDate && o.CreatedAt <= currentDate)
                .Sum(o => o.TotalAmount);

            // Для месяца
            var monthStartDate = currentDate.AddMonths(-1);
            var totalAmountMonth = orders
                .Where(o => o.CreatedAt >= monthStartDate && o.CreatedAt <= currentDate)
                .Sum(o => o.TotalAmount);

            // Для недели
            var weekStartDate = currentDate.AddDays(-7);
            var totalAmountWeek = orders
                .Where(o => o.CreatedAt >= weekStartDate && o.CreatedAt <= currentDate)
                .Sum(o => o.TotalAmount);

            // Для дня
            var dayStartDate = currentDate.AddDays(-1);
            var totalAmountDay = orders
                .Where(o => o.CreatedAt >= dayStartDate && o.CreatedAt <= currentDate)
                .Sum(o => o.TotalAmount);

            // Форматируем результат и возвращаем
            var stats = new List<StatsCardDto>
            {
                new() {
                    Amount = $"{totalAmountQuarter:n2} ₽",
                    Label = "За квартал"
                },
                new() {
                    Amount = $"{totalAmountMonth:n2} ₽",
                    Label = "За месяц"
                },
                new() {
                    Amount = $"{totalAmountWeek:n2} ₽",
                    Label = "За неделю"
                },
                new() {
                    Amount = $"{totalAmountDay:n2} ₽",
                    Label = "За день"
                }
            };
            return stats;
        }

        /// <summary>
        /// Средний чек 
        /// </summary>
        /// <returns></returns>
        public async Task<AvgBillDto> GetAvgBillDataAsync()
        {
            var currentDate = DateTime.UtcNow;
            var startOfToday = currentDate.Date;
            var startOfWeek = startOfToday.AddDays(-(int)currentDate.DayOfWeek + (int)DayOfWeek.Monday);
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1, 0, 0, 0, DateTimeKind.Utc);

            var totalAvg = await CalculateAverageBillAsync(null);
            var todayAvg = await CalculateAverageBillAsync(startOfToday);
            var weekAvg = await CalculateAverageBillAsync(startOfWeek);
            var monthAvg = await CalculateAverageBillAsync(startOfMonth);

            return new AvgBillDto
            {
                Total = FormatCurrency(totalAvg),
                Today = FormatCurrency(todayAvg),
                Week = FormatCurrency(weekAvg),
                Month = FormatCurrency(monthAvg)
            };
        }

        private async Task<decimal> CalculateAverageBillAsync(DateTime? startDate)
        {
            var query = context.Orders.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(o => o.CreatedAt >= startDate.Value);
            }

            var totalAmount = await query.SumAsync(o => o.TotalAmount);
            var orderCount = await query.CountAsync();

            return orderCount > 0 ? totalAmount / orderCount : 0;
        }

        private static string FormatCurrency(decimal amount) => $"{amount:N2} ₽";
    }
}
