import { useEffect, useState } from "react";
import { OrderDto } from "@/entities/order/dto/order-dto";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";
import { getAdminSignalR } from "@/shared/lib/signalr/get-admin-signalr";

export const useAdminOrders = (ordersDb: OrderDto[]) => {
  const [orders, setOrders] = useState<OrderDto[]>(ordersDb);
  const user = useCurrentUser();
  const token = user?.token;

  useEffect(() => {
    if (!token) return;

    getAdminSignalR(
      token,
      (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
      },
      (updatedOrder) => {
        console.log("SignalR get updated order✅");
        // setOrders((prev) =>
        //   prev.map((order) =>
        //     order.orderId === updatedOrder.orderId ? updatedOrder : order
        //   )
        // );
        setOrders((prev) => {
          const orderExists = prev.some(
            (order) => order.orderId === updatedOrder.orderId
          );

          if (orderExists) {
            // Обновляем существующий заказ
            return prev.map((order) =>
              order.orderId === updatedOrder.orderId ? updatedOrder : order
            );
          } else {
            // Добавляем новый заказ
            return [...prev, updatedOrder];
          }
        });
      }
    );
  }, [token]);

  return { orders, setOrders };
};
