import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./api-routes";

/**
 * Выполняет поиск продуктов по названию.
 *
 * @param {string} query - название товара.
 * @returns {Promise<Product[]>} - список найденных товаров.
 */
export const search = async (query: string): Promise<Product[]> => {
  // список товаров
  const products = await axiosInstance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  );
  return products.data;
};
