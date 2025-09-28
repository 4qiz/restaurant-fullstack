using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using RestaurantOrder.Data;
using RestaurantOrder.Hubs;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Models;
using RestaurantOrder.Services.Notifier;
using RestaurantOrder.Services.SalesReport;
using RestaurantOrder.Services.Statistics;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

namespace RestaurantOrder
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var orderHubUrl = "/hubs/orders";

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddHealthChecks();
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters
                    .Add(new JsonStringEnumConverter(System.Text.Json.JsonNamingPolicy.SnakeCaseUpper));
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database
            var dataSourceBuilder = new NpgsqlDataSourceBuilder(builder.Configuration.GetConnectionString("Postgres"));
            dataSourceBuilder.MapEnum<OrderStatus>();
            dataSourceBuilder.MapEnum<PaymentType>();
            dataSourceBuilder.MapEnum<MeasureUnit>();
            dataSourceBuilder.MapEnum<ProductItemSize>();
            dataSourceBuilder.MapEnum<OrderType>();

            var dataSource = dataSourceBuilder.Build();
            builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(dataSource));

            // Cors
            var allowedOriginsRaw = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string>();
            var allowedOrigins = allowedOriginsRaw?.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries) ?? throw new Exception("Cors:AllowedOrigins is null");
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontendPolicy", policy =>
                {
                    policy.SetIsOriginAllowed(_ => true)//WithOrigins(allowedOrigins)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials(); // Для SignalR
                });
            });

            // JWT
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = builder.Configuration.GetValue<bool>("Jwt:RequireHttpsMetadata"); // https in production
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"] ?? throw new Exception("jwtSettings[SecretKey] is null"))),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"]
                    };

                    // Configure the Authority to the expected value for
                    // the authentication provider. This ensures the token
                    // is appropriately validated.
                    options.Authority = "Authority URL"; // TODO: Update URL jwtSettings["Authority"]

                    // We have to hook the OnMessageReceived event in order to
                    // allow the JWT authentication handler to read the access
                    // token from the query string when a WebSocket or 
                    // Server-Sent Events request comes in.

                    // Sending the access token in the query string is required when using WebSockets or ServerSentEvents
                    // due to a limitation in Browser APIs. We restrict it to only calls to the
                    // SignalR hub in this code.
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];

                            // If the request is for our hub...
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                (path.StartsWithSegments(orderHubUrl)))
                            {
                                // Read the token out of the query string
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            // SignalR
            builder.Services.AddSignalR().AddJsonProtocol(options =>
            {
                options.PayloadSerializerOptions.Converters
                   .Add(new JsonStringEnumConverter());
            });

            // Services
            builder.Services.AddScoped<StatisticsService>();
            builder.Services.AddScoped<IOrderCountNotifier, OrderCountNotifierService>();
            builder.Services.AddScoped<ISalesReportService, SalesReportService>();
            builder.Services.AddScoped<ISalesReportDataService, SalesReportDataService>();
            builder.Services.AddScoped<ISalesReportExcelExporter, SalesReportExcelExporter>();

            // MediatR
            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            // Регистрируем все стратегии
            builder.Services.Scan(scan => scan
                .FromAssemblyOf<IOrdersStrategy>()
                .AddClasses(classes => classes.AssignableTo<IOrdersStrategy>())
                .AsImplementedInterfaces()
                .WithScopedLifetime());


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("FrontendPolicy");
            app.MapHub<OrderHub>(orderHubUrl);

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<AppDbContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }

            app.MapHealthChecks("/health");

            app.Run();
        }
    }
}

