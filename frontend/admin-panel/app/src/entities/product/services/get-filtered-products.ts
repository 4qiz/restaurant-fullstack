import { prisma } from "@/shared/lib/prisma-client";

export interface ProductsSearchParams {
  name?: string;
  categoryId?: string;
  priceFrom?: string;
  priceTo?: string;
  sortBy?: string;
}

export const getFilteredProducts = async (params: ProductsSearchParams) => {
  const maxProductPrice = await prisma.productItem.aggregate({
    _max: {
      price: true,
    },
  });

  const minPrice = Number(params.priceFrom) || 0;
  const maxPrice = Number(params.priceTo) || maxProductPrice._max.price;

  const categoriesWithProducts = await prisma.category.findMany({
    include: {
      products: {
        orderBy: { id: "asc" },
        where: {
          name: params.name
            ? { contains: params.name, mode: "insensitive" }
            : undefined, // Case-insensitive search
          categoryId: isNaN(Number(params.categoryId))
            ? undefined
            : Number(params.categoryId),
          items: {
            some: {
              price: { gte: minPrice, lte: maxPrice || undefined },
            },
          },
        },
        include: {
          items: {
            where: { price: { gte: minPrice, lte: maxPrice || undefined } },
            orderBy: { price: "asc" },
          },
          ingredients: true,
        },
      },
    },
  });

  return { categoriesWithProducts, maxPrice: maxProductPrice._max.price };
};
