import { OrderStatus } from "@prisma/client";

export const statusTranslations: Record<OrderStatus, string> = {
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
