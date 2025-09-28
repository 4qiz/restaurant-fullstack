import { OrderItemDto } from "@/entities/order/dto/order-dto";
import { sizeTranslations } from "@/features/menu/helpers/size-mapping";
import { unitTranslations } from "@/features/menu/helpers/unit-mapping";
import { routes } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/css";
import { Badge } from "@/shared/ui/badge";
import { ProductItemSize } from "@prisma/client";
import Link from "next/link";

export const OrderItemsList = ({ items }: { items: OrderItemDto[] }) => {
  return (
    <div className="flex flex-col flex-grow p-3 overflow-y-auto h-full ">
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b pb-2 items-center"
          >
            <div className="flex  space-x-2">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt="img"
                  className="w-14 h-14 flex-shrink-0 object-cover rounded-lg"
                />
              ) : (
                <div className="w-14 h-14 flex-shrink-0 bg-secondary flex items-center justify-center rounded-lg">
                  <span className="text-xs text-muted-foreground text-center">
                    Нет фото
                  </span>
                </div>
              )}
              <div className="space-y-2">
                <Link
                  href={routes.menuId(item.productId)}
                  className="font-semibold"
                >
                  {item.name}
                </Link>
                <div className="text-sm">
                  <Badge
                    inert
                    className={cn(
                      {
                        "bg-green-100 text-green-700 ":
                          item.productItemSize === ProductItemSize.SMALL,
                        "bg-orange-100 text-orange-700 ":
                          item.productItemSize === ProductItemSize.MEDIUM,
                        "bg-red-100 text-red-700 ":
                          item.productItemSize === ProductItemSize.BIG,
                      },
                      "mr-2 "
                    )}
                  >
                    {sizeTranslations[item.productItemSize]}
                  </Badge>
                  {item.weight} {unitTranslations[item.measureUnit]}
                </div>
              </div>
            </div>
            <p className="font-semibold text-nowrap">
              {item.quantity} × {item.price} ₽
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
