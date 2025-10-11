import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  types?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
  limit?: string;
  page?: string;
  categoryId?: string;
}

// const DEFAULT_MIN_PRICE = 0;
// const DEFAULT_MAX_PRICE = 3000;

// поиск продуктов по фильтрам
export const findProducts = async (params: GetSearchParams) => {
  const maxProductPrice = await prisma.productItem.aggregate({
    _max: {
      price: true,
    },
  });

  const minPrice = Number(params.priceFrom) || 0;
  const maxPrice = Number(params.priceTo) || maxProductPrice._max.price;

  // const ingredientsIds = params.ingredients?.split(",").map(Number);
  // const productTypes = params.types?.split(",").map(Number);
  // const sizes = params.sizes?.split(",").map(Number);

  // const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  // const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: { id: "asc" },
        where: {
          categoryId: isNaN(Number(params.categoryId))
            ? undefined
            : Number(params.categoryId),
          items: {
            some: {
              price: { gte: minPrice, lte: maxPrice || undefined },
              isActive: true,
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

  return { categories, maxPrice: maxProductPrice._max.price };
};
