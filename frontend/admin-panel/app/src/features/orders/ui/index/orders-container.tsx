"use client";

import { OrderDto } from "@/entities/order/dto/order-dto";
import { useAdminOrders } from "../../hooks/use-admin-orders";
import { OrdersList } from "./orders-list";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";
import { filterInWorkOrders, filterNewOrders } from "@/entities/order/domain";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";

export const OrdersContainer = ({ ordersDb }: { ordersDb: OrderDto[] }) => {
  const { orders } = useAdminOrders(ordersDb);
  const user = useCurrentUser();

  if (!user || !user.id || !user.role) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message="Ошибка, попробуйте перезагрузить страницу"
      />
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-3 w-full">
      <OrdersList
        title="Новые"
        orders={filterNewOrders(orders, user.role)}
        key="new-orders"
      />
      <OrdersList
        title="В работе"
        orders={filterInWorkOrders(orders, { id: user.id, role: user.role })}
        key="in-work-orders"
      />
    </div>
  );
};
