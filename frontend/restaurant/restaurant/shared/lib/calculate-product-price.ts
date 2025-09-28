import { Ingredient, ProductItem } from "@prisma/client";

//подсчет полной стоимости товара
//используется для ExtendedProductForm
// export const calculatePizzaPrice = (
//   type: PizzaType,
//   size: PizzaSize,
//   items: ProductItem[],
//   ingredients: Ingredient[],
//   selectedIngredients: Set<number>
// ) => {
//   const productPrice =
//     items.find((item) => item.productType === type && item.size === size)
//       ?.price || 0;
//   const totalIngredientsPrice = ingredients
//     .filter((ing) => selectedIngredients.has(ing.id))
//     .reduce((acc, ing) => acc + ing.price, 0);
//   const totalPrice = productPrice + totalIngredientsPrice;
//   return totalPrice;
// };

export const calculateProductPrice = (
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  item?: ProductItem
) => {
  const productPrice = item?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ing) => selectedIngredients.has(ing.id))
    .reduce((acc, ing) => acc + ing.price, 0);
  const totalPrice = productPrice + totalIngredientsPrice;
  return totalPrice;
};
