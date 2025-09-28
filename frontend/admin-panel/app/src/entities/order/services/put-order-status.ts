import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import { OrderDto } from "../dto/order-dto";

export const putOrderStatus = async (
  orderId: number,
  isCanceled: boolean = false,
  token: string
): Promise<{ order: OrderDto | null; error?: string }> => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_ORDER_SERVICE_URL is undefined");
  }

  try {
    const response = await fetch(
      apiUrl + ordersApiRoutes.putOrderStatus(orderId, isCanceled),
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { order: null, error: "Ошибка при обновлении статуса" };
    }

    const data = await response.json();
    return { order: data };
  } catch (error) {
    console.error("[putOrderStatus] - ", error);
    return { order: null, error: "Ошибка при обновлении статуса" };
  }
};
