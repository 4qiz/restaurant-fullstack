"use server";
import * as z from "zod";
import { EditProductSchema } from "../schemas/edit-product-schema";
import { getProductById } from "@/entities/product/services/get-product-by-id";
import { updateProduct } from "@/entities/product/services/update-product";
import { EditProductValues } from "@/entities/product/domain";
import { revalidatePath } from "next/cache";
import { routes } from "@/shared/constants/routes";

export const editProduct = async (
  productId: number,
  values: z.infer<typeof EditProductSchema>
) => {
  const product = await getProductById(productId);
  if (!product) {
    return { error: "Товар не найден" };
  }

  const categoryId = Number(values.categoryId);
  if (isNaN(categoryId)) {
    return { error: "Категория указана не верно" }; // Ошибка, если categoryId не число
  }

  await updateProduct(product.id, {
    name: values.name,
    description: values.description,
    categoryId: categoryId,
  } satisfies EditProductValues);

  revalidatePath(routes.menuId(productId));
  return { success: "Данные сохранены" };
};
