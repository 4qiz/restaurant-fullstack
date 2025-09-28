"use client";

import { OrderStatus } from "@prisma/client";
import { useStatus } from "../../hooks/use-status";
import { OrderStatusBadge } from "../order-status-badge";

export const dynamic = "force-dynamic";

export const RealtimeStatus = ({
  orderId,
  status: statusDb,
}: {
  orderId: number;
  status: OrderStatus;
}) => {
  const status = useStatus(orderId, statusDb);

  return <OrderStatusBadge status={status} />;
};
