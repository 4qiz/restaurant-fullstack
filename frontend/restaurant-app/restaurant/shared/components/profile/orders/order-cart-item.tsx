import React from "react";
import { CartItemDetailsImage } from "../../shared/cart-item-details/cart-item-details-image";
import { CartItemInfo } from "../../shared/cart-item-details/cart-item-info";
import { cn } from "@/shared/lib/utils";
import { CartItemDetailsPrice } from "../../shared/cart-item-details/cart-item-details-price";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface Props {
  productId: number;
  imageUrl?: string;
  name: string;
  description?: string;
  count: number;
  price: number;
  className?: string;
}

export const OrderCartItem: React.FC<Props> = ({
  imageUrl,
  name,
  description,
  count,
  price,
  className,
  productId,
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-center p-4 px-7",
        className
      )}
    >
      {isMobile ? (
        <>
          <div className="flex flex-row  justify-between gap-3 w-full">
            {imageUrl ? <CartItemDetailsImage src={imageUrl} /> : <div>no</div>}
            <div className="w-full flex flex-col">
              <CartItemInfo productId={productId} name={name} />
              {description && (
                <span className="text-muted-foreground">{description}</span>
              )}
              <span className="text-muted-foreground">{count} шт.</span>
              <CartItemDetailsPrice value={price} className="self-end" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {imageUrl ? <CartItemDetailsImage src={imageUrl} /> : <div>no</div>}
            <CartItemInfo
              productId={productId}
              name={name}
              details={description}
            />
          </div>
          <div>
            <CartItemDetailsPrice value={price} />
            <span className="text-gray-400">{count} шт.</span>
          </div>
        </>
      )}
    </div>
  );
};
