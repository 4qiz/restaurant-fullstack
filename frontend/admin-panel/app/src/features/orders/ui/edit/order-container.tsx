import { OrderDto } from "@/entities/order/dto/order-dto";
import { OrderCard } from "./order-card";

export const OrderContainer = ({ orderDb: order }: { orderDb: OrderDto }) => {
  return <OrderCard order={order} />;
};
