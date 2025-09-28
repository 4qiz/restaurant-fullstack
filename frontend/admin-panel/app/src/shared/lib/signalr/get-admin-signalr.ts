import { OrderDto } from "@/entities/order/dto/order-dto";
import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const getAdminSignalR = async (
  token: string,
  onNewOrder?: (order: OrderDto) => void,
  onOrderUpdated?: (order: OrderDto) => void,
  onReceiveOrderCount?: (count: number) => void
) => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error(
      "[getAdminSignalR] - NEXT_PUBLIC_ORDER_SERVICE_URL undefined"
    );
  }

  const hubUrl = apiUrl + ordersApiRoutes.hub();
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();

      console.log("✅ SignalR подключен");
    } catch (err) {
      console.error("Ошибка подключения к SignalR:", err);
    }
  }

  if (onNewOrder) {
    connection.on("NewOrderAdmin", onNewOrder);
  }
  if (onOrderUpdated) {
    connection.on("OrderUpdatedAdmin", onOrderUpdated);
  }
  if (onReceiveOrderCount) {
    connection.on("ReceiveOrderCount", onReceiveOrderCount);
    await connection.invoke("SubscribeToOrderUpdates");
  }

  // Отключаем соединение при закрытии вкладки
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      if (connection) {
        connection.stop();
        console.log("⛔ SignalR отключен");
      }
    });
  }

  return connection;
};
