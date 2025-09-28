import { prisma } from "@/shared/lib/prisma-client";
import { CreateProductItemValues } from "../domain";

export const createProductItem = async (values: CreateProductItemValues) => {
  await prisma.productItem.create({
    data: {
      price: values.price,
      isActive: values.isActive,
      measureUnit: values.measureUnit,
      productItemSize: values.productItemSize,
      weight: values.weight,
      productId: values.productId,
    },
  });
};
