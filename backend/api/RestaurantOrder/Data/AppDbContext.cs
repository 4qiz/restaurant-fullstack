using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;
using RestaurantOrder.Models;

namespace RestaurantOrder.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasPostgresEnum<OrderStatus>();
            builder.HasPostgresEnum<PaymentType>();
            builder.HasPostgresEnum<MeasureUnit>();
            builder.HasPostgresEnum<ProductItemSize>();
            builder.HasPostgresEnum<OrderType>();
        }
    }
}
