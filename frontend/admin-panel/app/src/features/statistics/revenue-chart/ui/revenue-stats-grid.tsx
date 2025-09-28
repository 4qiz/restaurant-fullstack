import { StatsCardDto } from "@/entities/statistics/revenue-chart/dto/stats-card-dto";
import { StatCard } from "../../ui/stat-card";

export const RevenueStatsGrid = ({ stats }: { stats: StatsCardDto[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
    {stats.map((stat, index) => (
      <StatCard key={index} amount={stat.amount} label={stat.label} />
    ))}
  </div>
);
