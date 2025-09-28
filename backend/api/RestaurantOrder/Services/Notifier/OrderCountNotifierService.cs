using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RestaurantOrder.Data;
using RestaurantOrder.Hubs;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;

namespace RestaurantOrder.Services.Notifier
{
    public class OrderCountNotifierService : IOrderCountNotifier
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<OrderHub> _hubContext;

        public OrderCountNotifierService(AppDbContext context, IHubContext<OrderHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task NotifyAsync()
        {
            var adminCount = await GetAdminOrderCountAsync();
            var deliveryCount = await GetDeliveryOrderCountAsync();

            await NotifyGroupAsync("admin", adminCount);
            await NotifyGroupAsync("manager", adminCount);
            await NotifyGroupAsync("delivery", deliveryCount);
        }

        // 🔹 Получение количества заказов для администратора
        private async Task<int> GetAdminOrderCountAsync()
        {
            return await _context.Orders.AsNoTracking()
                .Where(o => o.Status == OrderStatus.CREATED)
                .CountAsync();
        }

        // 🔹 Получение количества заказов для курьера
        private async Task<int> GetDeliveryOrderCountAsync()
        {
            return await _context.Orders.AsNoTracking()
                .Where(o => o.Status == OrderStatus.WAITINGDELIVERY)
                .CountAsync();
        }

        // 🔸 Уведомление группы через SignalR
        private async Task NotifyGroupAsync(string groupName, int count)
        {
            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveOrderCount", count);
        }
    }
}
