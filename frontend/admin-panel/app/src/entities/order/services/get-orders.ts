import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import { OrderDto } from "../dto/order-dto";

export const getOrders = async (
  token: string,
  filters?: { history?: boolean }
): Promise<{ orders: OrderDto[]; error?: string }> => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_ORDER_SERVICE_URL is undefined");
  }

  const queryParams = new URLSearchParams();

  if (filters && filters.history !== undefined) {
    queryParams.append("history", String(filters.history));
  }

  try {
    const response = await fetch(
      `${apiUrl}${ordersApiRoutes.getOrders()}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { orders: [], error: "Ошибка при получении заказов" };
    }

    const data = await response.json();
    return { orders: data };
  } catch (error) {
    console.error("[getOrders] - ", error);
    return { orders: [], error: "Ошибка при получении заказов" };
  }
};
