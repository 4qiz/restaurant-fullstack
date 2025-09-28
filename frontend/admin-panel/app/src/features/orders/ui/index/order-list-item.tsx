import { getLastDigits } from "@/shared/lib/get-last-digits";
import { Button } from "@/shared/ui/button";
import { OrderStatusBadge } from "../order-status-badge";
import { OrderStatus } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";

export const OrderListItem = ({
  createdAt,
  id,
  status,
}: {
  id: number;
  status: OrderStatus;
  createdAt: string;
}) => {
  return (
    <Link href={routes.orderId(id)}>
      <div className="flex flex-col md:flex-row items-center justify-between border rounded-lg p-2 w-full mx-auto gap-3 ">
        <div className="md:hidden flex w-full justify-between">
          <span className=" font-medium">#{getLastDigits(id)}</span>
          <span className="">{createdAt}</span>
        </div>
        <span className="hidden md:block font-medium">
          #{getLastDigits(id)}
        </span>
        <OrderStatusBadge
          status={status}
          className=" max-md:w-full flex items-center justify-center"
        />
        <span className="hidden md:block">{createdAt}</span>
        <Button className="max-md:w-full">
          Просмотреть
          <ArrowRight />
        </Button>
      </div>
    </Link>
  );
};
