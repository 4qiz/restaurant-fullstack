import { AvgBillCard } from "../avg-bill/ui/avg-bill-card";
import { ProductsChartCard } from "../products-chart/ui/products-chart-card";
import { RevenueChartCard } from "../revenue-chart/ui/revenue-chart-card";

export const HomeStatistics = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col xl:flex-row gap-3 h-fit">
        <ProductsChartCard showLink className="w-full xl:w-1/2" />
        <AvgBillCard className="w-full xl:w-1/3  " />
      </div>
      <div className="flex flex-col xl:flex-row gap-3 ">
        <RevenueChartCard className="w-full xl:w-1/2" />
      </div>
    </div>
  );
};
