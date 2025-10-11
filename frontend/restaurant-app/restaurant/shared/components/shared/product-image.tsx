import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg max-w-[400px] max-h-[400px]",
        className
      )}
    >
      <img src={imageUrl} alt="product" className="rounded-lg object-contain" />
    </div>
  );
};
