import { prisma } from "@/shared/lib/prisma-client";

export const getProductItemById = async (id: number) => {
  const productItem = await prisma.productItem.findUnique({ where: { id } });
  return productItem;
};
