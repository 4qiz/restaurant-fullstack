"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Title } from "./title";
import { ProductImage } from "./product-image";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import { Ingredient, ProductItem, ProductItemSize } from "@prisma/client";
import { useProductOptions } from "@/shared/hooks/use-pizza-options";
import { getProductDetails } from "@/shared/lib/get-product-details";

interface Props {
  imageUrl: string;
  name: string;
  description?: string | null;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
}

export const ExtendedProductForm: React.FC<Props> = ({
  name,
  description,
  items,
  imageUrl,
  ingredients,
  onSubmit,
  className,
  loading,
}) => {
  const {
    size,
    selectedIngredients,
    addIngredient,
    availableSizes,
    currentItemId,
    setSize,
  } = useProductOptions(items);

  const { textDetails, totalPrice } = getProductDetails(
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAddCart = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center w-full h-full md:flex-row md:justify-between"
      )}
    >
      <ProductImage imageUrl={imageUrl} />

      <div className="flex flex-col justify-between h-full w-full bg-[#FCFCFC] p-7 rounded-lg ">
        <div>
          <Title text={name} size="md" className="font-extrabold mb-3" />

          {description && (
            <p className="text-muted-foreground mb-3">{description}</p>
          )}
          <p className="text-muted-foreground mb-3">{textDetails}</p>
          <div className="flex flex-col gap-2 mb-3">
            <GroupVariants
              items={availableSizes}
              selectedValue={size}
              onChange={(value) => setSize(value as ProductItemSize)}
            />

            {/* <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onChange={(value) => setType(Number(value) as PizzaType)}
            /> */}
          </div>
        </div>
        {ingredients.length > 0 && (
          <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-2">
            <div className="grid grid-cols-3  gap-3">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))}
            </div>
          </div>
        )}

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAddCart}
        >
          В корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
