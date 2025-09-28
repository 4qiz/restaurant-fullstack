import React, { useState } from "react";
import { useSet } from "react-use";
import { getAvailableProductSizes } from "../lib/get-available-pizza-sizes";
import { ProductItem, ProductItemSize } from "@prisma/client";

// interface ReturnProps {
//   size: PizzaSize;
//   type: PizzaType;
//   setSize: (size: PizzaSize) => void;
//   setType: (type: PizzaType) => void;
//   selectedIngredients: Set<number>;
//   addIngredient: (ingredient: number) => void;
//   availableSizes: Variant[];
//   currentItemId?: number;
// }

//для отображения доступных размеров и типов
// export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
//   const [size, setSize] = React.useState<PizzaSize>(30);
//   const [type, setType] = React.useState<PizzaType>(1);

//   const [selectedIngredients, { toggle: addIngredient }] = useSet(
//     new Set<number>([])
//   );

//   const availableSizes = getAvailablePizzaSizes(type, items);

//   const currentItemId = items.find(
//     (item) => item.productType === type && item.size === size
//   )?.id;

//   React.useEffect(() => {
//     const isAvailableSize = availableSizes?.find(
//       (item) => Number(item.value) === size && !item.disabled
//     );
//     const availableSize = availableSizes?.find((item) => !item.disabled);

//     if (!isAvailableSize && availableSize) {
//       setSize(Number(availableSize.value) as PizzaSize);
//     }
//   }, [type]);

//   return {
//     size,
//     type,
//     setSize,
//     setType,
//     selectedIngredients,
//     addIngredient,
//     availableSizes,
//     currentItemId,
//   };
// };

export const useProductOptions = (items: ProductItem[]) => {
  const [size, setSize] = useState<ProductItemSize>(ProductItemSize.MEDIUM);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailableProductSizes(items);

  const currentItemId = items.find((item) => item.productItemSize === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => item.value === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(availableSize.value as ProductItemSize);
    }
  }, [availableSizes, size]);

  return {
    size,
    setSize,
    selectedIngredients,
    addIngredient,
    availableSizes,
    currentItemId,
  };
};
