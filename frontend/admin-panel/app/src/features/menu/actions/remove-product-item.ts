"use server";

import { deleteProductItem } from "@/entities/product-item/services/delete-product-item";
import { getProductItemById } from "@/entities/product-item/services/get-product-item-by-id";
import { routes } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";

export const removeProductItem = async (id: number) => {
  const productItem = await getProductItemById(id);
  if (!productItem) {
    return { error: "Вариант не найден" };
  }

  // const product = await getProductById(productItem.productId);

  // if (product && product.items.length === 1) {
  //   return { error: "Невозможно удалить последний размер" };
  // }

  await deleteProductItem(id);
  revalidatePath(routes.menuId(productItem.productId));
  return { success: true };
};
