import { OrderDto } from "@/entities/order/dto/order-dto";
import { routes } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ArrowLeft, BoxIcon, CheckCircle2, Truck, XCircle } from "lucide-react";
import Link from "next/link";
import { OrderType, PaymentType } from "@prisma/client";
import { getLastDigits } from "@/shared/lib/get-last-digits";
import { OrderActions } from "./order-actions";
import { OrderItemsList } from "./order-item-list";
import { RealtimeStatus } from "./realtime-status";
import { OrderAddress } from "./order-address";
import { OrderSelfpick } from "./order-selfpick";

export const OrderCard = async ({ order }: { order: OrderDto }) => {
  return (
    <Card className="flex flex-col lg:flex-row w-full max-w-screen-lg overflow-auto ">
      {/* left part */}
      <div className="flex flex-col lg:w-2/3 border-r">
        {/* Header 1 */}
        <div className="flex items-center max-h-[40px] min-h-[40px]  border-b">
          <Link href={routes.orders()}>
            <Button size={"icon"} variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          <h2 className="text-lg font-semibold w-full text-center pr-8">
            Заказ #{getLastDigits(order.orderId)}
          </h2>
        </div>

        {/* Order information */}
        <div className=" flex flex-col gap-3  p-3 h-full">
          {/* status and date */}
          <div className=" flex justify-between items-center gap-1">
            <RealtimeStatus orderId={order.orderId} status={order.status} />
            <span className="text-center">
              {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </span>
          </div>

          {/* personal info */}
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            <div className="grid grid-flow-col grid-rows-3  border rounded-lg p-3 gap-1 w-full">
              <div className="font-semibold">Имя</div>
              <div className="font-semibold">Почта</div>
              <div className="font-semibold">Телефон</div>
              <div className="">{order.fullName}</div>
              <div className="">{order.email}</div>
              <div className="">{order.phone}</div>
            </div>
            <div className="grid grid-flow-col grid-rows-3 border rounded-lg p-3 gap-1 w-full">
              <div className="font-semibold">Оплата</div>
              <div className="font-semibold">Способ</div>
              <div className="font-semibold">Статус</div>
              <div className=""></div>
              <div className="">
                {order.paymentType === PaymentType.ONLINE
                  ? "Онлайн"
                  : "При получении"}
              </div>
              <div className="">
                {order.hasPaid ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" />
                    Оплачен
                  </span>
                ) : (
                  <span className="flex items-center">
                    <XCircle className="w-5 h-5 mr-2 text-destructive" />
                    Не оплачен
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* comment */}
          {order.comment && (
            <div className="p-3 border rounded-lg  space-y-1">
              <p className=" font-semibold">Комментарий</p>
              <p className="text-wrap ">{order.comment}</p>
            </div>
          )}

          {order.type === OrderType.DELIVERY ? (
            <OrderAddress address={order.address} />
          ) : (
            <OrderSelfpick />
          )}
        </div>

        {/* Footer with buttons */}
        <OrderActions
          orderId={order.orderId}
          status={order.status}
          type={order.type}
        />
      </div>

      {/* right side */}
      <div className="flex flex-col lg:w-1/3  border-l ">
        {/* Header 2 */}
        <div className="flex justify-center items-center max-h-[40px] min-h-[40px] h-[40px] border-b ">
          <h2 className="text-lg font-semibold">Состав заказа</h2>
        </div>

        <div className="flex flex-col  justify-between">
          {/* Order items */}
          <div className="lg:min-h-[200px] lg:max-h-[340px] 2xl:max-h-[400px]">
            <OrderItemsList items={order.items} />
          </div>

          {/* Prices */}
          <div className=" p-3 border-t text-lg  ">
            <div className="flex justify-between  ">
              <div className="flex items-center">
                <BoxIcon className="mr-2 w-5 h-5 text-muted-foreground" />
                <span>Товары</span>
              </div>
              <span>{order.totalAmount - order.deliveryPrice} ₽</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Truck className="mr-2 w-5 h-5 text-muted-foreground" />
                <span>Доставка</span>
              </div>
              <span>{order.deliveryPrice} ₽</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <div className="flex items-center">
                <span>Сумма</span>
              </div>
              <span>{order.totalAmount} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
