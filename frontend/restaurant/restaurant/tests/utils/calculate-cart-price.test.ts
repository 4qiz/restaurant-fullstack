import { MeasureUnit, ProductItemSize } from "@prisma/client";
import { calculateCartPrice } from "../../shared/lib/calculate-cart-price";
import { CartItemDTO } from "@/shared/services/dto/cart-dto";

const product = {
  id: 1,
  name: "Product 1",
  imageUrl: "product1.jpg",
  categoryId: 1,
  category: {
    id: 1,
    name: "Category 1",
    description: "Description of category 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "",
  isActive: false,
  isDeleted: false,
};

const productItem = {
  id: 1,
  price: 100,
  size: 1,
  productType: 1,
  productId: 1,
  product: product,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  measureUnit: MeasureUnit.GRAM,
  productItemSize: ProductItemSize.MEDIUM,
  weight: 1,
};

const ingredient1 = {
  id: 1,
  name: "Ingredient 1",
  price: 20,
  imageUrl: "ingredient1.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ingredient2 = {
  id: 2,
  name: "Ingredient 2",
  price: 30,
  imageUrl: "ingredient2.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("calculateCartPrice", () => {
  it("должен правильно вычислить цену для продукта без дополнительных ингредиентов", () => {
    const cartItem: CartItemDTO = {
      id: 1,
      productItem: productItem, // productItem теперь с правильной структурой
      ingredients: [], // пустой список ингредиентов
      quantity: 2,
      cartId: 1,
      productItemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = calculateCartPrice(cartItem);
    expect(result).toBe(200); // 100 * 2
  });

  it("вычисляет цену с учетом стоимости ингредиентов и количества", () => {
    const cartItem: CartItemDTO = {
      id: 1,
      productItem: productItem,
      ingredients: [ingredient1, ingredient2],
      quantity: 2,
      cartId: 1,
      productItemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = calculateCartPrice(cartItem);
    expect(result).toBe(300); // (100 + 20 + 30) * 2 = 300
  });

  it("должен корректно вычислять цену для товара с количеством 1", () => {
    const cartItem: CartItemDTO = {
      id: 1,
      productItem: productItem, // productItem теперь с правильной структурой
      ingredients: [], // пустой список ингредиентов
      quantity: 1,
      cartId: 1,
      productItemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = calculateCartPrice(cartItem);
    expect(result).toBe(100); // 100 * 1
  });

  it("должен корректно учитывать цену товара и ингредиентов при нулевом количестве", () => {
    const cartItem: CartItemDTO = {
      id: 1,
      productItem: productItem, // productItem теперь с правильной структурой
      ingredients: [ingredient1, ingredient2], // два ингредиента
      quantity: 0,
      cartId: 1,
      productItemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = calculateCartPrice(cartItem);
    expect(result).toBe(0); // (100 + 20 + 30) * 0 = 0
  });
});
