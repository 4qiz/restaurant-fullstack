import { ProductItemSize } from "@prisma/client";
import { CartDTO } from "../services/dto/cart-dto";
import { calculateCartPrice } from "./calculate-cart-price";

// состояние ProducItem в корзине
export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  productItemSize: ProductItemSize;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean;
};

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calculateCartPrice(item),
    productItemSize: item.productItem.productItemSize,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.productType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
    disabled: false,
  })) as CartStateItem[];

  return { items, totalAmount: data.totalAmount };
};
