"use client";

import { ChevronDown } from "lucide-react";
import { OrderStatus as IOrderStatus } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { Title } from "../../shared/title";
import { OrderStatus } from "./order-status";
import { OrderCartItem } from "./order-cart-item";
import { OrderItemDto } from "@/shared/services/dto/order-dto";
import { useState } from "react";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { unitTranslations } from "@/shared/lib/get-available-pizza-sizes";
import { CancelOrderButton } from "./cancel-order-button";
import { getLastDigits } from "@/shared/lib/get-last-digits";

interface Props {
  id: number;
  items: OrderItemDto[];
  createdAt: string;
  totalAmount: number;
  status: IOrderStatus;
  canUserCancel: boolean;
  className?: string;
}

export const OrderItem: React.FC<Props> = ({
  id = 0,
  items,
  totalAmount = 0,
  createdAt,
  status,
  className,
  canUserCancel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-md select-none border",
        className
      )}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-col md:flex-row  cursor-pointer justify-start md:justify-between items-center p-4 md:p-7 border-b border-gray-100"
      >
        {isMobile ? (
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row items-center justify-between  w-full">
              <Title
                text={`Заказ #${getLastDigits(id)}`}
                size="sm"
                className="font-semibold "
              />
              <div className="flex items-center gap-5">
                <OrderStatus variant={status} />
              </div>
              <ChevronDown className={isExpanded ? "rotate-180" : ""} />
            </div>
            <span className="text-muted-foreground">{createdAt}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6">
              <Title
                text={`Заказ #${getLastDigits(id)}`}
                size="sm"
                className="font-semibold"
              />
              <span className="text-muted-foreground">{createdAt}</span>
            </div>
            <div className="flex items-center gap-5">
              <OrderStatus variant={status} />
              <ChevronDown className={isExpanded ? "rotate-180" : ""} />
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          "transition-all overflow-hidden",
          isExpanded ? "max-h-none" : "max-h-0"
        )}
      >
        <div>
          {items.map((item) => (
            <OrderCartItem
              key={item.productItemId}
              productId={item.productId}
              imageUrl={item.imageUrl}
              name={item.name}
              description={
                item?.weight
                  ? `${item?.weight} ${unitTranslations[item.measureUnit]}`
                  : undefined
              }
              count={item.quantity}
              price={item.price * item.quantity}
              className="border-b border-gray-100"
            />
          ))}

          <div className="flex items-center justify-between p-5 px-7">
            <h3 className="text-xl">
              Итого: <b>{totalAmount} ₽</b>
            </h3>

            {canUserCancel && <CancelOrderButton orderId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};
