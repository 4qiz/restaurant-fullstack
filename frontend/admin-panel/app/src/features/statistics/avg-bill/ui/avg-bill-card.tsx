"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAvgBill } from "../hooks/use-avg-bill";
import { MessageCard } from "@/shared/components/message-card";
import { Skeleton } from "@/shared/ui/skeleton";

export const AvgBillCard = ({ className }: { className?: string }) => {
  const { data, error, isLoading } = useAvgBill();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Средний чек</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-end w-full gap-3 text-center">
        {error ? (
          <MessageCard message="Ошибка при получении данных" />
        ) : isLoading || !data ? (
          <>
            <Skeleton className="w-full h-16 p-3 bg-secondary rounded" />
            <Skeleton className="w-full h-[52px] bg-secondary rounded " />
            <Skeleton className="w-full h-[52px] bg-secondary rounded " />
            <Skeleton className="w-full h-[52px] bg-secondary rounded " />
          </>
        ) : (
          <>
            <div className="w-full text-4xl p-3 bg-secondary font-light rounded">
              {data.total}
            </div>
            <BillRowItem label="Сегодня" value={data.today} />
            <BillRowItem label="7 дней" value={data.week} />
            <BillRowItem label="30 дней" value={data.month} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

const BillRowItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center w-full gap-3 text-base md:text-xl ">
      <div className="w-1/3 bg-secondary p-3 rounded text-nowrap">{label}</div>
      <div className="w-2/3 bg-secondary p-3 rounded font-light ">{value}</div>
    </div>
  );
};
