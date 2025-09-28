"use server";

import * as z from "zod";
import { CreateProductItemSchema } from "../schemas/create-product-item-schema";
import { revalidatePath } from "next/cache";
import { routes } from "@/shared/constants/routes";
import { getProductById } from "@/entities/product/services/get-product-by-id";
import { createProductItem } from "@/entities/product-item/services/create-product-item";
import { CreateProductItemValues } from "@/entities/product-item/domain";

export const addProductItem = async (
  productId: number,
  values: z.infer<typeof CreateProductItemSchema>
) => {
  const product = await getProductById(productId);
  if (!product) {
    return { error: "Товар не найден" };
  }

  // Проверка существующих размеров
  const sizeExists = product.items.some(
    (productItem) => productItem.productItemSize === values.productItemSize
  );

  if (sizeExists) {
    return { error: "Блюдо такого размера уже существует" };
  }

  await createProductItem({
    price: values.price,
    isActive: values.isActive,
    measureUnit: values.measureUnit,
    productItemSize: values.productItemSize,
    weight: values.weight,
    productId: product.id,
  } satisfies CreateProductItemValues);

  revalidatePath(routes.menuId(productId));
  return { success: "Данные сохранены" };
};
