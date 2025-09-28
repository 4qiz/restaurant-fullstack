import { StatsCardDto } from "@/entities/statistics/revenue-chart/dto/stats-card-dto";

export const StatCard = ({ amount, label }: StatsCardDto) => (
  <div className="flex flex-col items-center justify-center border rounded-lg p-3">
    <p className="font-light text-nowrap ">{amount}</p>
    <p className="text-nowrap">{label}</p>
  </div>
);
