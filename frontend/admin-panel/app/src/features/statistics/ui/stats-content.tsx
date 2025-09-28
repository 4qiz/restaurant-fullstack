import { ProductsChartCard } from "../products-chart/ui/products-chart-card";
import { SalesReport } from "../sales-report/sales-report";

export const StatsContent = () => {
  return (
    <div className="space-y-3">
      <ProductsChartCard className="w-full xl:w-2/3" />
      <SalesReport />
    </div>
  );
};
