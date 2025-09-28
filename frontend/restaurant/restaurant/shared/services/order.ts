import { OrderDto } from "@/shared/services/dto/order-dto";
import { axiosInstance } from "./instance";

export const sendOrder = async (
  order: OrderDto,
  token: string
): Promise<{ isSuccess: boolean; error?: string }> => {
  const baseUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!baseUrl) {
    console.log("NEXT_PUBLIC_ORDER_SERVICE_URL undefined");
    throw new Error("Ошибка при отправке заказа.");
  }
  const createOrderUrl = `${baseUrl}/api/orders`;

  const response = await axiosInstance.post(createOrderUrl, order, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  if (response.status === 400) {
    return { isSuccess: false, error: "Максимум 5 активных заказов" };
  }
  if (response.status !== 200) {
    return { isSuccess: false, error: "Ошибка при отправке заказа." };
  }

  return { isSuccess: true };
};

export const getOrders = async (
  token: string
): Promise<{ orders: OrderDto[]; error?: string }> => {
  const baseUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!baseUrl) {
    console.log("NEXT_PUBLIC_ORDER_SERVICE_URL undefined");
    return { orders: [], error: "Ошибка при получении заказов" };
  }
  const createOrderUrl = `${baseUrl}/api/orders`;
  try {
    const response = await axiosInstance.get<OrderDto[]>(createOrderUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return { orders: [], error: "Ошибка при получении заказов" };
    }

    return { orders: response.data };
  } catch (error) {
    console.error("[getOrders] - ", error);
    return { orders: [], error: "Ошибка при получении заказов" };
  }
};

export const cancelOrder = async (
  orderId: number,
  token: string
): Promise<{ order: OrderDto | null; error?: string }> => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_ORDER_SERVICE_URL is undefined");
  }

  try {
    const response = await fetch(
      apiUrl + `/api/orders/${orderId}/status?isCancelled=${true}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { order: null, error: "Ошибка при отмене заказа" };
    }

    const data = await response.json();
    return { order: data };
  } catch (error) {
    console.error("[putOrderStatus] - ", error);
    return { order: null, error: "Ошибка при отмене заказа" };
  }
};
