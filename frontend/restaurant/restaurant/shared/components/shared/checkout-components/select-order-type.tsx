"use client";

import { useEffect } from "react";
import { CheckoutAddress } from "./checkout-address";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { CheckoutSelfPick } from "./checkout-selfpick";
import { OrderType } from "@prisma/client";
import { useFormContext } from "react-hook-form";

export const SelectOrderType = () => {
  const { setValue, watch } = useFormContext();
  const orderType = watch("orderType");

  useEffect(() => {
    // Set default order type when component mounts
    setValue("orderType", OrderType.DELIVERY);
  }, [setValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-1/2">
        <RadioGroup
          value={orderType}
          onValueChange={(value) => setValue("orderType", value as OrderType)}
          className="flex gap-4"
        >
          <div className="flex-1">
            <RadioGroupItem
              value={OrderType.DELIVERY}
              id="delivery"
              className="hidden"
            />
            <button
              type="button"
              className={cn(
                "w-full px-4 py-1 rounded-full border text-lg transition-all text-center",
                orderType === OrderType.DELIVERY
                  ? "ring-1 ring-ring font-semibold bg-white text-neutral-600"
                  : "border-transparent bg-gray-200 text-neutral-600"
              )}
              onClick={() => setValue("orderType", OrderType.DELIVERY)}
            >
              Доставка
            </button>
          </div>
          <div className="flex-1">
            <RadioGroupItem
              value={OrderType.SELFPICK}
              id="selfpick"
              className="hidden"
            />
            <button
              type="button"
              className={cn(
                "w-full px-4 py-1 rounded-full border text-lg transition-all text-center",
                orderType === OrderType.SELFPICK
                  ? "ring-1 ring-ring font-semibold bg-white text-neutral-600"
                  : "border-transparent bg-gray-200 text-neutral-600"
              )}
              onClick={() => setValue("orderType", OrderType.SELFPICK)}
            >
              Самовывоз
            </button>
          </div>
        </RadioGroup>
      </div>

      {/* Conditional rendering */}
      {orderType === OrderType.DELIVERY ? (
        <CheckoutAddress />
      ) : (
        <CheckoutSelfPick />
      )}
    </div>
  );
};
