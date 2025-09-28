import { prisma } from "@/shared/lib/prisma-client";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
