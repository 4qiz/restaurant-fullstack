"use client";

import { formatNumber } from "@/shared/lib/format-number";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { RevenueStatsGrid } from "./revenue-stats-grid";
import { useRevenueChart } from "../hooks/use-revenue-chart";
import { MessageCard } from "@/shared/components/message-card";

const chartConfig = {
  value: {
    label: "Сумма",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const RevenueChartCard = ({ className }: { className?: string }) => {
  const { chartData, statsData, period, setPeriod, error } = useRevenueChart();

  const handlePeriodChange = (newPeriod: "month" | "week" | "day") => {
    setPeriod(newPeriod);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-3">
        <CardTitle className="text-nowrap">Выручка</CardTitle>
        {/* Кнопки фильтров */}
        <div className="flex gap-1">
          <Button
            variant={period === "day" ? "default" : "outline"}
            onClick={() => handlePeriodChange("day")}
          >
            День
          </Button>
          <Button
            variant={period === "week" ? "default" : "outline"}
            onClick={() => handlePeriodChange("week")}
          >
            Неделя
          </Button>
          <Button
            variant={period === "month" ? "default" : "outline"}
            onClick={() => handlePeriodChange("month")}
          >
            Месяц
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="md:h-[250px] flex items-center justify-center">
            <MessageCard message="Ошибка при получении данных" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  period === "month" ? value.slice(0, 3) : value.slice(0, 5)
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={7}
                tickFormatter={(value) => formatNumber(value)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              {/* Gradient */}
              <defs>
                <linearGradient id="ChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type="bump"
                fill="url(#ChartGradient)"
                fillOpacity={0.6}
                stroke="var(--color-value)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <RevenueStatsGrid stats={statsData} />
      </CardFooter>
    </Card>
  );
};
