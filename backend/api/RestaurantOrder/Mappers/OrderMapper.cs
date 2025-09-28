using RestaurantOrder.Dtos.Order;
using RestaurantOrder.Models;

namespace RestaurantOrder.Mappers
{
    public static class OrderMapper
    {
        public static OrderDto OrderToDto(Order order)
        {
            return new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                DeliveryId = order.DeliveryId,
                FullName = order.FullName,
                Email = order.Email,
                Phone = order.Phone,
                Address = order.Address,
                Comment = order.Comment,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                Type = order.Type,
                PaymentType = order.PaymentType,
                DeliveryPrice = order.DeliveryPrice,
                HasPaid= order.HasPaid,
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt,
                Items = [.. order.Items.Select(item => new OrderItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Name,
                    ImageUrl= item.ImageUrl,
                    ProductItemId = item.ProductItemId,
                    Price = item.Price,
                    Weight = item.Weight,
                    ProductItemSize = item.ProductItemSize,
                    MeasureUnit = item.MeasureUnit,
                    Quantity = item.Quantity,
                    Ingredients = [.. item.Ingredients.Select(ing => new IngredientDto
                    {
                        IngredientId = ing.IngredientId,
                        Name = ing.Name,
                        Price = ing.Price
                    })]
                })]
            };
        }

        public static Order DtoToOrder(OrderDto dto)
        {
            return new Order
            {
                OrderId = dto.OrderId,
                UserId = dto.UserId,
                DeliveryId= dto.DeliveryId,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address,
                Comment = dto.Comment,
                TotalAmount = dto.TotalAmount,
                DeliveryPrice = dto.DeliveryPrice,
                Status = dto.Status,
                Type = dto.Type,
                PaymentType = dto.PaymentType,
                HasPaid = dto.HasPaid,
                CreatedAt = dto.CreatedAt,
                UpdatedAt = dto.UpdatedAt,
                Items = dto.Items.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Name = item.Name,
                    ImageUrl = item.ImageUrl,
                    ProductItemId = item.ProductItemId,
                    Price = item.Price,
                    Weight = item.Weight,
                    ProductItemSize = item.ProductItemSize,
                    MeasureUnit = item.MeasureUnit,
                    Quantity = item.Quantity,
                    Ingredients = item.Ingredients.Select(ing => new Ingredient
                    {
                        IngredientId = ing.IngredientId,
                        Name = ing.Name,
                        Price = ing.Price
                    }).ToList()
                }).ToList()
            };
        }
    }
}
