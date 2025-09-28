import { Category, Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};

export type CategoryWithProducts = Category & {
  products: (Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
  })[];
};

export type ProductWithItems = Product & {
  items: ProductItem[];
};

export interface EditProductValues {
  name: string;
  description?: string;
  categoryId: number;
}

export interface CreateProductValues {
  name: string;
  description?: string;
  imageUrl: string;
  categoryId: number;
}
