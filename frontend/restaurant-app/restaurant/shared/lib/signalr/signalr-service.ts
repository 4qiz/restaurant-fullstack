import { OrderDto } from "@/shared/services/dto/order-dto";
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const getSignalRConnection = async (
  token: string,
  onOrderUpdated: (order: OrderDto) => void
) => {
  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error(
      "[getSignalRConnection] - NEXT_PUBLIC_ORDER_SERVICE_URL undefined"
    );
  }

  const hubUrl = apiUrl + "/hubs/orders";

  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();
      console.log("✅ SignalR подключен");
    } catch (err) {
      console.error("Ошибка подключения к SignalR:", err);
    }
  }

  connection.on("OrderUpdated", onOrderUpdated);

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
