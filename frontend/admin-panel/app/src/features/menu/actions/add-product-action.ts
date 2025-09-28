"use server";

import * as z from "zod";

import { routes } from "@/shared/constants/routes";
import { CreateProductSchema } from "../schemas/create-product-schema";
import { redirect } from "next/navigation";
import { CreateProductValues } from "@/entities/product/domain";
import { createProduct } from "@/entities/product/services/create-product";
import { createProductItem } from "@/entities/product-item/services/create-product-item";
import { CreateProductItemValues } from "@/entities/product-item/domain";

export const addProductAction = async (
  values: z.infer<typeof CreateProductSchema>
) => {
  const categoryId = Number(values.categoryId);
  if (isNaN(categoryId)) {
    return { error: "Категория указана не верно" }; // Ошибка, если categoryId не число
  }

  const productId = await createProduct({
    name: values.name,
    categoryId: categoryId,
    description: values.description,
    imageUrl: values.imageUrl,
  } satisfies CreateProductValues);

  await createProductItem({
    price: values.price,
    isActive: values.isActive,
    measureUnit: values.measureUnit,
    productItemSize: values.productItemSize,
    weight: values.weight,
    productId: productId,
  } satisfies CreateProductItemValues);

  redirect(routes.menuId(productId));
};
