import { prisma } from "@/shared/lib/prisma-client";
import { EditProductValues } from "../domain";

export const updateProduct = async (
  productId: number,
  values: EditProductValues
) => {
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...values,
    },
  });
};
