import { AvgBillDto } from "@/entities/statistics/avg-bill/dto/avg-bill-dto";
import { ordersApiRoutes } from "@/shared/constants/orders-api-routes";
import useSWR from "swr";

const fetchAvgBillData = async (query: string): Promise<AvgBillDto> => {
  try {
    const response = await fetch(query);

    if (!response.ok) {
      throw new Error("Failed to fetch average bill data");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const useAvgBill = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;

  if (!API_BASE_URL) {
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }
  const query = API_BASE_URL + ordersApiRoutes.avgBill();
  const { data, error, isLoading } = useSWR(query, fetchAvgBillData, {
    revalidateOnFocus: false, // Prevents refetching on tab focus
    shouldRetryOnError: true, // Automatically retries on failure
  });

  return {
    data,
    error,
    isLoading,
  };
};
