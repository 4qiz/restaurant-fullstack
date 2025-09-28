import { OrderDto } from "@/entities/order/dto/order-dto";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { OrderListItem } from "./order-list-item";
import { MessageCard } from "@/shared/components/message-card";
import { Check } from "lucide-react";

export const OrdersList = ({
  orders,
  title,
}: {
  title: string;
  orders: OrderDto[];
}) => {
  return (
    <Card className="w-full ">
      <CardContent className="flex flex-col gap-3 p-6">
        <CardTitle>{title}</CardTitle>
        {orders.length === 0 ? (
          <MessageCard message="Нет заказов" icon={<Check />} />
        ) : (
          orders.map((order) => (
            <OrderListItem
              key={order.orderId}
              id={order.orderId}
              status={order.status}
              createdAt={new Date(order.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
