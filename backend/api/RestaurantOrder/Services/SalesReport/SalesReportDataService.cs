using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Data;
using RestaurantOrder.Dtos.SalesReport;
using RestaurantOrder.Interfaces;

namespace RestaurantOrder.Services.SalesReport
{
    public class SalesReportDataService : ISalesReportDataService
    {
        private readonly AppDbContext _context;

        public SalesReportDataService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SalesReportRow>> GetReportDataAsync(DateTime from, DateTime to)
        {
            var items = await _context.Orders
                .Where(o => o.CreatedAt >= from && o.CreatedAt <= to)
                .SelectMany(o => o.Items)
                .ToListAsync();

            return items
                .GroupBy(i => i.ProductId)
                .Select(g => new SalesReportRow
                {
                    ProductId = g.Key,
                    Name = g.First().Name,
                    Quantity = g.Sum(i => i.Quantity),
                    AveragePrice = g.Average(i => i.Price),
                    Total = g.Sum(i => i.Price * i.Quantity)
                })
                .OrderByDescending(r => r.Quantity)
                .ToList();
        }
    }
}
