import { useEffect } from "react";
import QueryString from "qs";
import { useRouter } from "next/navigation";
import { MenuFilters } from "./use-menu-filters";

export const useQueryFilters = (filters: MenuFilters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      name: filters.name === "" ? undefined : filters.name,
      categoryId: filters.categoryId === "" ? undefined : filters.categoryId,
    };
    const query = QueryString.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters, router]);
};
