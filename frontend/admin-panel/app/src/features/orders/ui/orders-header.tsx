import { routes } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const OrdersHeader = () => {
  return (
    <div className="flex gap-1 md:gap-3 max-sm:w-full">
      <Link href={routes.orders()} className="max-sm:w-full">
        <Button variant={"outline"} className="max-sm:w-full">
          Текущие заказы
        </Button>
      </Link>
      <Link href={routes.ordersHistory()} className="max-sm:w-full">
        <Button variant={"outline"} className="max-sm:w-full">
          История заказов
        </Button>
      </Link>
    </div>
  );
};
