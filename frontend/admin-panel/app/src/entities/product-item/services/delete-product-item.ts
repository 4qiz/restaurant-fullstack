import { prisma } from "@/shared/lib/prisma-client";

export const deleteProductItem = async (productItemId: number) => {
  await prisma.productItem.delete({ where: { id: productItemId } });
};
