import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import { OrderDto } from "../dto/order-dto";

export const getOrder = async (
  orderId: number,
  token: string
): Promise<{ order: OrderDto | null; error?: string }> => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_ORDER_SERVICE_URL is undefined");
  }

  try {
    const response = await fetch(apiUrl + ordersApiRoutes.getOrder(orderId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { order: null, error: "Ошибка при получении заказа" };
    }

    const data = await response.json();
    return { order: data };
  } catch (error) {
    console.error("[getOrders] - ", error);
    return { order: null, error: "Ошибка при получении заказа" };
  }
};
