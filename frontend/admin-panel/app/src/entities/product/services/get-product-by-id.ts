import { prisma } from "@/shared/lib/prisma-client";
import { ProductWithItems } from "../domain";

/**
 * Получает продукт по идентификатору.
 * @param {number} id - Уникальный идентификатор продукта.
 * @returns {Promise<ProductWithItems | null>} Объект продукта с вложенными элементами
 */
export const getProductById = async (
  id: number
): Promise<ProductWithItems | null> => {
  // получение продукта из БД
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
  return product;
};
