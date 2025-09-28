import { Ingredient, ProductItem, ProductItemSize } from "@prisma/client";
import { calculateProductPrice } from "./calculate-product-price";
import {
  sizeTranslations,
  unitTranslations,
} from "./get-available-pizza-sizes";

// export const getPizzaDetails = (
//   type: PizzaType,
//   size: PizzaSize,
//   items: ProductItem[],
//   ingredients: Ingredient[],
//   selectedIngredients: Set<number>
// ) => {
//   const totalPrice = calculatePizzaPrice(
//     type,
//     size,
//     items,
//     ingredients,
//     selectedIngredients
//   );
//   const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
//   return {
//     totalPrice,
//     textDetails,
//   };
// };

export const getProductDetails = (
  size: ProductItemSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const productItem = items.find((item) => item.productItemSize === size);

  const totalPrice = calculateProductPrice(
    ingredients,
    selectedIngredients,
    productItem
  );
  const weight = productItem?.weight
    ? `${productItem?.weight} ${unitTranslations[productItem.measureUnit]}`
    : "";
  const textDetails = `${sizeTranslations[size]}, ${weight}`;
  return {
    totalPrice,
    textDetails,
  };
};
