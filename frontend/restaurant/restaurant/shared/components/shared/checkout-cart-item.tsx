"use client";

import React from "react";
import { X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";
import { CountButtonProps } from "./count-button";
import { cn } from "@/shared/lib/utils";

interface Props extends CartItemProps {
  onClickRemove: () => void;
  onClickCountButton: CountButtonProps["onClick"];
  className?: string;
}

export const CheckoutCartItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  className,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 lg:flex-row lg:items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      {/* Left Section: Image and Info */}
      <div className="flex items-center gap-4 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      {/* Right Section: Price and Buttons */}
      <div className="flex flex-row items-center justify-between w-full lg:w-auto gap-4">
        {/* Price */}
        <CartItemDetails.Price value={price} className="text-lg" />

        {/* Count Button and Remove Button */}
        <div className="flex items-center gap-3 md:gap-5">
          <CartItemDetails.CountButton
            onClick={onClickCountButton}
            value={quantity}
          />
          <button type="button" onClick={onClickRemove}>
            <X
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
