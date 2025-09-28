"use client";

import { axiosInstance } from "@/shared/lib/api/instance";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";
import { ArrowDownToLine, CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/ui/calendar";
import { apiRoutes } from "@/shared/constants/routes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { ru } from "date-fns/locale";

interface SalesReportParams {
  from?: string;
  to?: string;
}

interface SalesReportRow {
  productId: number;
  name: string;
  quantity: number;
  averagePrice: number;
  total: number;
}

interface SalesReportResponse {
  from: string;
  to: string;
  data: SalesReportRow[];
}

export const SalesReport: React.FC = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const [fromDate, setFromDate] = useState<Date>(thirtyDaysAgo);
  const [toDate, setToDate] = useState<Date>(now);
  const [reportData, setReportData] = useState<SalesReportResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_ORDER_SERVICE_URL is undefined");
  }

  // Convert local date to UTC, and set it to midnight (00:00:00 UTC)
  const toUTCStartOfDay = (date: Date) => {
    const localDateMidnight = new Date(date.setHours(0, 0, 0, 0));
    return new Date(
      localDateMidnight.getTime() -
        localDateMidnight.getTimezoneOffset() * 60000
    );
  };

  // Convert local date to UTC, and set it to the end of the day (23:59:59 UTC)
  const toUTCEndOfDay = (date: Date) => {
    const localDateEndOfDay = new Date(date.setHours(23, 59, 59, 999));
    return new Date(
      localDateEndOfDay.getTime() -
        localDateEndOfDay.getTimezoneOffset() * 60000
    );
  };

  const exportToExcel = () => {
    const params: SalesReportParams = {};
    if (fromDate) params.from = toUTCStartOfDay(fromDate).toISOString(); // Convert from to UTC at 00:00:00
    if (toDate) params.to = toUTCEndOfDay(toDate).toISOString(); // Convert to to UTC at 23:59:59

    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = `${apiUrl}${apiRoutes.exportSalesReport()}?${query}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchData = async (from?: Date | null, to?: Date | null) => {
      setLoading(true);
      try {
        const params: SalesReportParams = {};
        if (from) params.from = toUTCStartOfDay(from).toISOString(); // Convert from to UTC at 00:00:00
        if (to) params.to = toUTCEndOfDay(to).toISOString(); // Convert to to UTC at 23:59:59

        const response = await axiosInstance.get<SalesReportResponse>(
          `${apiUrl}${apiRoutes.getSalesReport()}`,
          {
            params,
          }
        );
        setReportData(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке отчета", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(fromDate, toDate);
  }, [fromDate, toDate, apiUrl]);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Статистика продаж</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="w-full md:w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-fit justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "yyyy-MM-dd") : "С даты"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={(date) => {
                    if (date) setFromDate(date);
                  }}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-fit justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "yyyy-MM-dd") : "По дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={(date) => {
                    if (date) setToDate(date);
                  }}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            onClick={exportToExcel}
            className="ml-auto w-full md:w-fit"
            variant={"secondary"}
          >
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Экспорт в Excel
          </Button>
        </div>

        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="text-center">№</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead className="text-center">Количество</TableHead>
                  <TableHead className="text-center">Средняя цена</TableHead>
                  <TableHead className="text-center">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData?.data.map((row, index) => (
                  <TableRow key={row.productId}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell className="text-center">
                      {row.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.averagePrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
