"use client";

import { ProductChartDate } from "@/entities/statistics/products-chart/domain";
import { ProductsChartDto } from "@/entities/statistics/products-chart/dto/products-chart-dto";
import { fetchProductStatistics } from "@/entities/statistics/products-chart/services/fetch-products-statistics";
import { MessageCard } from "@/shared/components/message-card";
import { routes } from "@/shared/constants/routes";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export const chartColors = Array.from(
  { length: 9 },
  (_, index) => `hsl(var(--chart-${index + 1}))`
);

export const ProductsChartCard = ({
  className,
  showLink,
}: {
  className?: string;
  showLink?: boolean;
}) => {
  const isMobile = useIsMobile();
  const [data, setData] = useState<ProductsChartDto[]>([]);
  const [filter, setFilter] = useState<ProductChartDate>("30days");
  const [error, setError] = useState<string | null>(null);

  const totalPrice = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.totalAmount, 0);
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await fetchProductStatistics(filter);
        if (error) {
          setError(error);
        } else {
          setError(null);
          setData(data);
        }
      } catch (error) {
        console.log("Error fetching product statistics:", error);
      }
    };
    loadData();
  }, [filter]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-3">
        <CardTitle className="text-nowrap">
          Топ 5 товаров{" "}
          {showLink && (
            <Link
              className="hover:underline text-muted-foreground"
              href={routes.stats()}
            >
              <Button variant={"ghost"}>Подробнее</Button>
            </Link>
          )}
        </CardTitle>
        {/* Кнопки фильтров */}
        <div className="flex gap-1">
          <Button
            onClick={() => {
              setFilter("today");
            }}
            variant={filter === "today" ? "default" : "outline"}
          >
            Сегодня
          </Button>
          <Button
            onClick={() => setFilter("7days")}
            variant={filter === "7days" ? "default" : "outline"}
          >
            7 дней
          </Button>
          <Button
            onClick={() => setFilter("30days")}
            variant={filter === "30days" ? "default" : "outline"}
          >
            30 дней
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error ? (
          <div className="md:h-[250px] flex items-center justify-center">
            <MessageCard message="Ошибка при получении данных" />
          </div>
        ) : data.length === 0 ? (
          <div className="md:h-[250px]flex items-center justify-center">
            <MessageCard message="Нет продаж" icon={<InfoIcon />} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={isMobile ? 400 : 250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="productName"
                innerRadius={60}
                strokeWidth={0}
                animationDuration={500}
                style={{ outline: "none" }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalPrice}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Всего
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;
                  console.log(payload);
                  return (
                    <div className="bg-secondary  p-3 rounded-lg shadow-lg">
                      <p className="text-xl font-semibold">{label}</p>
                      {payload.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <p className="text-sm">{`${entry.name}: ${entry.value}%`}</p>
                        </div>
                      ))}
                    </div>
                  );
                }}
                cursor={false} // Optionally remove the cursor change on hover
              />
              <Legend
                content={({ payload }) => (
                  <div className="flex flex-col gap-1">
                    {payload?.map((entry, index) => {
                      const product = data.find(
                        (d) => d.productName === entry.value
                      );
                      return (
                        <div
                          key={index}
                          className="flex flex-row justify-between w-full gap-3"
                        >
                          <span>
                            <span
                              className="inline-block w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span>{entry.value}</span>
                          </span>

                          <span className="font-light">
                            {product ? product.totalAmount : 0} шт
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                layout="vertical"
                align={isMobile ? "center" : "right"}
                verticalAlign={isMobile ? "bottom" : "middle"}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
