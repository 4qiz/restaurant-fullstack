import React from "react";
import { cn } from "@/shared/lib/css";
import { OrderItemImage } from "./order-item-image";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";

interface Props {
  productId: number;
  imageUrl?: string;
  name: string;
  description?: string;
  count: number;
  price: number;
  className?: string;
}

export const OrderItem: React.FC<Props> = ({
  imageUrl,
  name,
  description,
  count,
  price,
  className,
  productId,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-center p-4 px-7",
        className
      )}
    >
      <div className="flex flex-row  justify-between gap-3 w-full">
        {imageUrl ? <OrderItemImage src={imageUrl} /> : <div>no</div>}
        <div className="w-full flex flex-col">
          <Link
            href={routes.menuId(productId)}
            className="text-lg font-bold flex-1 leading-6 line-clamp-2"
          >
            {name}
          </Link>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
          <span className="text-muted-foreground">{count} шт.</span>
          <h2 className={cn("font-bold text-nowrap", className)}>{price} ₽</h2>
        </div>
      </div>
    </div>
  );
};
