import { CartItemDTO } from "../services/dto/cart-dto";

//стоимость одного продукта в корзине
export const calculateCartPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (price, ingredient) => price + ingredient.price,
    0
  );
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
