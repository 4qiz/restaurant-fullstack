"use client";

import { OrderDto } from "@/shared/services/dto/order-dto";
import { Container } from "../../shared/container";
import { Title } from "../../shared/title";
import { useOrders } from "./hooks/useOrders";
import { OrderItem } from "./order-item";
import { OrderStatus } from "@prisma/client";

export const OrdersContainer = ({ ordersDb }: { ordersDb: OrderDto[] }) => {
  const orders = useOrders(ordersDb);

  const nowOrdersStatuses = new Set<OrderStatus>([
    OrderStatus.PENDING,
    OrderStatus.CREATED,
    OrderStatus.COOKING,
    OrderStatus.INDELIVERY,
    OrderStatus.WAITINGDELIVERY,
    OrderStatus.READYFORPICK,
    OrderStatus.SUCCEEDED,
  ]);

  const historyOrdersStatuses = new Set<OrderStatus>([
    OrderStatus.CANCELLED,
    OrderStatus.RECEIVED,
    OrderStatus.REFUND,
  ]);

  return (
    <Container className="">
      <Title text="Текущие заказы" size="md" className="font-bold pb-3" />
      <div className="flex flex-col gap-6 flex-1 pb-6">
        {orders
          .filter((order) => nowOrdersStatuses.has(order.status))
          .map((order) => (
            <OrderItem
              key={order.orderId}
              id={order.orderId}
              items={order.items}
              createdAt={new Date(order.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
              totalAmount={order.totalAmount}
              status={order.status}
              canUserCancel={order.status === OrderStatus.CREATED}
            />
          ))}
      </div>
      <Title text="История заказов" size="md" className="font-bold pb-3" />
      <div className="flex flex-col gap-6 flex-1 ">
        {orders
          .filter((order) => historyOrdersStatuses.has(order.status))
          .map((order) => (
            <OrderItem
              key={order.orderId}
              id={order.orderId}
              items={order.items}
              createdAt={new Date(order.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
              totalAmount={order.totalAmount}
              status={order.status}
              canUserCancel={false}
            />
          ))}
      </div>
    </Container>
  );
};
