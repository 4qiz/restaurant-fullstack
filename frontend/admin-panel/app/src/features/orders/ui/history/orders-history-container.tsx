import { OrderDto } from "@/entities/order/dto/order-dto";
import { OrdersList } from "../index/orders-list";

export const OrdersHistoryContainer = ({
  ordersDb,
}: {
  ordersDb: OrderDto[];
}) => {
  return (
    <div className=" w-full lg:w-1/2">
      <OrdersList title="История" orders={ordersDb} key="history-orders" />
    </div>
  );
};
