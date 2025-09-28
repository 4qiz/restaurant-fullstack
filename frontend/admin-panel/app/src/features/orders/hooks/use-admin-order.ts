import { useEffect, useState } from "react";
import { OrderDto } from "@/entities/order/dto/order-dto";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";
import { getAdminSignalR } from "@/shared/lib/signalr/get-admin-signalr";

export const useAdminOrder = (orderDb: OrderDto) => {
  const [order, setOrder] = useState<OrderDto>(orderDb);
  const user = useCurrentUser();
  const token = user?.token;

  useEffect(() => {
    if (!token) return;

    getAdminSignalR(
      token,
      () => {
        return;
      },
      (updatedOrder) => {
        setOrder(updatedOrder);
      }
    );

    return () => {};
  }, [token]);

  return { order, setOrder };
};
