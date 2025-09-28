import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import { ProductChartDate } from "../domain";
import { ProductsChartDto } from "../dto/products-chart-dto";

// Функция для получения стартовой даты в зависимости от фильтра
const getStartDate = (filter: ProductChartDate): string => {
  const now = new Date();

  switch (filter) {
    case "today":
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Начало текущего дня
      return today.toISOString();

    case "7days":
      now.setDate(now.getDate() - 7); // 7 дней назад
      return now.toISOString();

    case "30days":
    default:
      now.setDate(now.getDate() - 30); // 30 дней назад (по умолчанию)
      return now.toISOString();
  }
};

export const fetchProductStatistics = async (
  filter: ProductChartDate
): Promise<{ data: ProductsChartDto[]; error?: string }> => {
  const startDate = getStartDate(filter);
  const endDate = new Date().toISOString();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
    if (!apiUrl)
      throw new Error(
        "API URL is undefined. Please check your environment variables."
      );

    // Формируем параметры запроса
    const params: Record<string, string> = {
      startDate,
      endDate,
    };

    // Формируем URL с параметрами
    const queryString = new URLSearchParams(params).toString();
    const query = `${apiUrl}${ordersApiRoutes.productsChart()}?${queryString}`;

    // Выполняем запрос
    const response = await fetch(query);

    if (!response.ok) {
      return { data: [], error: "Ошибка при загрузке данных" };
    }

    const data = await response.json();
    return { data: data };
  } catch (error) {
    console.log("Error fetching product statistics:", error);
    return { data: [], error: "Ошибка при загрузке данных" };
  }
};
