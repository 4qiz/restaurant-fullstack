import React from "react";
import { OrderStatus } from "@prisma/client";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/css";
import { statusTranslations } from "../helpers/status-translations";

interface Props {
  className?: string;
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<Props> = ({ className, status }) => {
  return (
    <Badge
      inert
      className={cn(
        {
          "bg-yellow-100 text-yellow-700 ": status === OrderStatus.PENDING, // Ожидает оплаты
          "": status === OrderStatus.SUCCEEDED, // Оплачен (TODO: delete)
          "bg-red-100 text-red-700 ": status === OrderStatus.CANCELLED, // Не оплачен (финальный статус)

          "bg-green-100 text-green-700 ": status === OrderStatus.CREATED, // Создан
          "bg-orange-100 text-orange-700 ": status === OrderStatus.COOKING, // Готовится
          "bg-purple-100 text-purple-700":
            status === OrderStatus.WAITINGDELIVERY, // Ожидает курьера
          "bg-indigo-100 text-indigo-700 ": status === OrderStatus.INDELIVERY, // В процессе доставки
          "bg-teal-100 text-teal-700 ": status === OrderStatus.READYFORPICK, // Готов, ожидает получения
          "bg-gray-100 text-gray-700 ": status === OrderStatus.RECEIVED, // Получен (финальный статус)
          "bg-pink-100 text-pink-700 ": status === OrderStatus.REFUND, // Возврат средств
        },
        "font-semibold text-base rounded-full text-center text-nowrap",
        className
      )}
    >
      {statusTranslations[status]}
    </Badge>
  );
};
