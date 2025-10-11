import {
  MeasureUnit,
  OrderStatus,
  OrderType,
  PaymentType,
  ProductItemSize,
} from "@prisma/client";
import { OrderDto } from "../dto/order-dto";

// eslint-disable-next-line
export const mapOrderToDto = (order: any): OrderDto => {
  return {
    orderId: order.orderId,
    userId: order.userId,
    fullName: order.fullName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    comment: order.comment || "",
    totalAmount: order.totalAmount,
    deliveryPrice: order.deliveryPrice,
    status: order.status as OrderStatus,
    type: order.type as OrderType,
    paymentType: order.paymentType as PaymentType,
    hasPaid: order.hasPaid,
    // eslint-disable-next-line
    items: order.items.map((item: any) => ({
      productId: item.productItem.product.id,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      productItemId: item.productItemId,
      price: item.productItem.price,
      weight: item.productItem.weight,
      productItemSize: item.productItem.productItemSize as ProductItemSize,
      measureUnit: item.productItem.measureUnit as MeasureUnit,
      quantity: item.quantity,
      // eslint-disable-next-line
      ingredients: item.ingredients.map((ing: any) => ({
        ingredientId: ing.id,
        name: ing.name,
        price: ing.price,
      })),
    })),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};
