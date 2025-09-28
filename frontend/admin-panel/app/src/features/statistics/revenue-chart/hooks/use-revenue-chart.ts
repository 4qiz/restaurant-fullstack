"use client";

import {
  ChartDataDto,
  StatsCardDto,
} from "@/entities/statistics/revenue-chart/dto/stats-card-dto";
import { fetchRevenueChartData } from "@/entities/statistics/revenue-chart/services/fetch-revenue-chart";
import { useEffect, useState } from "react";

export const useRevenueChart = () => {
  const [period, setPeriod] = useState<"month" | "week" | "day">("month");
  const [chartData, setChartData] = useState<ChartDataDto[]>([]);
  const [statsData, setStatsData] = useState<StatsCardDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRevenueChartData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching

        const data = await fetchRevenueChartData(period);
        setChartData(data.chartData);
        setStatsData(data.stats);
      } catch (error) {
        setError("Ошибка при получении данных");
        console.log("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRevenueChartData();
  }, [period]);

  return {
    chartData,
    statsData,
    period,
    setPeriod,
    isLoading,
    error,
  };
};
