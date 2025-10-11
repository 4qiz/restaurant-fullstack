import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};
