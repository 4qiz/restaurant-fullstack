import { prisma } from "@/shared/lib/prisma-client";

export const getCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({ where: { id } });
  return category;
};
