import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import Link from "next/link";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
}) => {
  return (
    <div className={cn("p-4 sm:p-2 md:p-4", className)}>
      <Link href={`/product/${id}`}>
        {/* Image container */}
        <div className="flex justify-center items-center">
          <img className="rounded-lg " src={imageUrl} alt={name} />
        </div>

        {/* Product name */}
        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold line-clamp-2"
        />

        {/* Ingredients */}
        <p className="text-sm text-gray-400 line-clamp-2 sm:text-sm">
          {ingredients.map((i) => i.name).join(", ")}
        </p>

        {/* Price and Add Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px] sm:text-[16px] text-nowrap">
            от <b>{price} ₽</b>
          </span>

          <Button
            variant="secondary"
            className="text-base font-bold sm:text-sm md:text-base"
          >
            <Plus size={18} className="mr-1 sm:w-4 sm:h-4" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
