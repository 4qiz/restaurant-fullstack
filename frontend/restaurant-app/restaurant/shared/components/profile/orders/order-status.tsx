import React from "react";
import { OrderStatus as IOrderStatus } from "@prisma/client";
import { Badge } from "../../ui/badge";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  variant: IOrderStatus;
  text?: string;
}
export const statusTranslations: Record<IOrderStatus, string> = {
  SUCCEEDED: "Оплачен",
  CANCELLED: "Отменен",
  PENDING: "Ожидает оплаты",
  CREATED: "Новый",
  COOKING: "Готовится",
  WAITINGDELIVERY: "Ожидает курьера",
  INDELIVERY: "В доставке",
  READYFORPICK: "Ожидает получения",
  RECEIVED: "Получен",
  REFUND: "Возврат средств",
};

export const OrderStatus: React.FC<Props> = ({ className, variant, text }) => {
  return (
    <Badge
      className={cn(
        {
          "bg-yellow-100 text-yellow-700 ": variant === IOrderStatus.PENDING, // Ожидает оплаты
          "": variant === IOrderStatus.SUCCEEDED, // Оплачен (TODO: delete)
          "bg-red-100 text-red-700 ": variant === IOrderStatus.CANCELLED, // Не оплачен (финальный статус)

          "bg-green-100 text-green-700 ": variant === IOrderStatus.CREATED, // Создан
          "bg-orange-100 text-orange-700 ": variant === IOrderStatus.COOKING, // Готовится
          "bg-purple-100 text-purple-700":
            variant === IOrderStatus.WAITINGDELIVERY, // Ожидает курьера
          "bg-indigo-100 text-indigo-700 ": variant === IOrderStatus.INDELIVERY, // В процессе доставки
          "bg-teal-100 text-teal-700 ": variant === IOrderStatus.READYFORPICK, // Готов, ожидает получения
          "bg-gray-100 text-gray-700 ": variant === IOrderStatus.RECEIVED, // Получен (финальный статус)
          "bg-pink-100 text-pink-700 ": variant === IOrderStatus.REFUND, // Возврат средств
        },
        "font-semibold text-base text-center rounded-full ",
        className
      )}
    >
      {statusTranslations[variant] || text}
    </Badge>
  );
};
