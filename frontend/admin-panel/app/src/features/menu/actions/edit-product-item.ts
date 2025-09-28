"use server";

import * as z from "zod";
import { EditProductItemSchema } from "../schemas/edit-product-item-schema";
import { getProductItemById } from "@/entities/product-item/services/get-product-item-by-id";
import { prisma } from "@/shared/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { routes } from "@/shared/constants/routes";
import { getProductById } from "@/entities/product/services/get-product-by-id";

export const editProductItem = async (
  productItemId: number,
  values: z.infer<typeof EditProductItemSchema>
) => {
  const productItem = await getProductItemById(productItemId);
  if (!productItem) {
    return { error: "Размер не найден" };
  }

  const product = await getProductById(productItem.productId);
  if (!product) {
    return { error: "Товар не найден" };
  }

  // Проверка существующих размеров
  const sizeExists = product.items.some(
    (item) =>
      item.productItemSize === values.productItemSize &&
      item.id !== productItemId
  );

  if (sizeExists) {
    return { error: "Блюдо такого размера уже существует" };
  }

  await prisma.productItem.update({
    where: {
      id: productItem.id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath(routes.menuId(productItem.productId));
  return { success: "Сохранено" };
};
