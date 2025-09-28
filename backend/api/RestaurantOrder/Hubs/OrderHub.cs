using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using RestaurantOrder.Interfaces;
using System.Security.Claims;

namespace RestaurantOrder.Hubs
{
    [Authorize]
    public class OrderHub(IOrderCountNotifier orderCountNotifier) : Hub
    {
        public override async Task OnConnectedAsync()
        {

            await base.OnConnectedAsync();
        }

        public async Task SubscribeToOrderUpdates()
        {
            var userId = GetUserIdFromClaims(Context);
            var role = GetUserRoleFromClaims(Context);

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
            {
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, role.ToLower());

            await orderCountNotifier.NotifyAsync();
        }

        public static string? GetUserIdFromClaims(HubCallerContext context)
        {
            return context.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public static string? GetUserRoleFromClaims(HubCallerContext context)
        {
            return context.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        }
    }
}
