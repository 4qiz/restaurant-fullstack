import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import { ChartDataDto, StatsCardDto } from "../dto/stats-card-dto";

export const fetchRevenueChartData = async (
  period: "month" | "week" | "day"
): Promise<{ chartData: ChartDataDto[]; stats: StatsCardDto[] }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
    if (!apiUrl)
      throw new Error(
        "API URL is undefined. Please check your environment variables."
      );

    const query = `${apiUrl}${ordersApiRoutes.revenueChart()}?filter=${period}`;

    const response = await fetch(query);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return { chartData: data.chartData, stats: data.stats };
  } catch (error) {
    throw error;
  }
};
