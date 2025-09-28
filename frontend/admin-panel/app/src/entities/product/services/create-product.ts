import { prisma } from "@/shared/lib/prisma-client";
import { CreateProductValues } from "../domain";

export const createProduct = async (values: CreateProductValues) => {
  const newProduct = await prisma.product.create({
    data: { ...values },
  });
  return newProduct.id;
};
