import { OrderStatus, OrderType, UserRole } from "@prisma/client";
import { OrderDto } from "./dto/order-dto";

export const filterNewOrders = (orders: OrderDto[], userRole: UserRole) => {
  return orders.filter((order) => {
    if (userRole === UserRole.DELIVERY) {
      return order.status === OrderStatus.WAITINGDELIVERY;
    }
    return order.status === OrderStatus.CREATED;
  });
};

export const filterInWorkOrders = (
  orders: OrderDto[],
  user: { id: string; role: string }
) => {
  return orders.filter((order) => {
    if (user.role === UserRole.MANAGER) {
      return (
        order.status === OrderStatus.COOKING ||
        (order.status === OrderStatus.READYFORPICK && OrderType.SELFPICK)
      );
    }
    if (user.role === UserRole.DELIVERY) {
      return (
        order.deliveryId === user.id &&
        (order.status === OrderStatus.INDELIVERY ||
          order.status === OrderStatus.READYFORPICK)
      );
    }
    if (user.role === UserRole.ADMIN) {
      return (
        order.status === OrderStatus.INDELIVERY ||
        order.status === OrderStatus.READYFORPICK ||
        order.status === OrderStatus.WAITINGDELIVERY ||
        order.status === OrderStatus.COOKING
      );
    }
    return true; // dont show orders if user role incorrect
  });
};
