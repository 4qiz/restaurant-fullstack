import { useEffect, useState } from "react";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";
import { getAdminSignalR } from "@/shared/lib/signalr/get-admin-signalr";
import { OrderStatus } from "@prisma/client";

export const useStatus = (
  orderId: number,
  statusDb: OrderStatus
): OrderStatus => {
  const [status, setStatus] = useState(statusDb);
  const user = useCurrentUser();
  const token = user?.token;

  useEffect(() => {
    if (!token) return;

    getAdminSignalR(token, undefined, (updatedOrder) => {
      if (updatedOrder.orderId === orderId) {
        setStatus(updatedOrder.status);
      }
    });
  }, [token, orderId]);

  return status;
};
