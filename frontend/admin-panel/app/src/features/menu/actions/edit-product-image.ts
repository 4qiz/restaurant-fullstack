"use server";

import { getProductById } from "@/entities/product/services/get-product-by-id";
import { routes } from "@/shared/constants/routes";
import { prisma } from "@/shared/lib/prisma-client";
import { revalidatePath } from "next/cache";

export const editProductImage = async (productId: number, imageUrl: string) => {
  const product = await getProductById(productId);
  if (!product) {
    return { error: "Товар не найден" };
  }
  await prisma.product.update({ where: { id: productId }, data: { imageUrl } });
  revalidatePath(routes.menuId(productId));
  return { success: "Изображение загружено" };
};
