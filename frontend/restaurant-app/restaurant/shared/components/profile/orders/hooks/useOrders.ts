import { useState, useEffect } from "react";
import { OrderDto } from "@/shared/services/dto/order-dto";
import { useSession } from "next-auth/react";
import { getSignalRConnection } from "@/shared/lib/signalr/signalr-service";

export const useOrders = (ordersDb: OrderDto[]) => {
  const [orders, setOrders] = useState<OrderDto[]>(ordersDb);
  const { data } = useSession();
  const token = data?.user.token;

  useEffect(() => {
    if (!token) return;

    getSignalRConnection(token, (updatedOrder) => {
      setOrders((prev) => {
        const updatedOrders = prev.map((order) =>
          order.orderId === updatedOrder.orderId
            ? { ...order, status: updatedOrder.status }
            : order
        );
        return updatedOrders;
      });
    });
  }, [token]);

  return orders;
};
