"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onChange?: (value: Variant["value"]) => void;
  className?: string;
  selectedValue?: Variant["value"];
}

export const GroupVariants: React.FC<Props> = ({
  items,
  onChange,
  className,
  selectedValue,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
      )}
    >
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => onChange?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
