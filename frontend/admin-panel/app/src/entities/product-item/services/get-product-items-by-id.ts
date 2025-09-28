import { prisma } from "@/shared/lib/prisma-client";

export const getProductItemsByProductId = async (productId: number) => {
  const productItems = await prisma.productItem.findMany({
    where: { productId },
  });

  return productItems;
};
