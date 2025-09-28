import { prisma } from "@/shared/lib/prisma-client";

export const getProducts = async (
  minPrice?: number,
  maxPrice?: number,
  categoryId?: number
) => {
  const categories = await prisma.category.findMany({
    where: { id: categoryId },
    include: {
      products: {
        orderBy: { id: "desc" },
        where: {
          items: {
            some: {
              price: { gte: minPrice, lte: maxPrice },
            },
          },
        },
        include: {
          items: {
            where: { price: { gte: minPrice, lte: maxPrice } },
            orderBy: { price: "asc" },
          },
          ingredients: true,
        },
      },
    },
  });
  return categories;
};
