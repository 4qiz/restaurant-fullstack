import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  types?: string;
  sizes?: string;
  ingredients?: string;
  categoryId?: string;
}

export interface Filters {
  sizes: Set<string>;
  types: Set<string>;
  prices: PriceRangeProps;
  selectedIngredients: Set<string>;
  categoryId?: string;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setCategoryId: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  //ingredients
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  //sizes
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  //types
  const [types, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("types") ? searchParams.get("types")?.split(",") : []
    )
  );

  //prices
  const [prices, setPrices] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  // categoryId
  const [categoryId, setCategoryId] = useState(
    searchParams.has("categoryId") ? searchParams.get("categoryId") : ""
  );

  return useMemo(
    () => ({
      categoryId,
      setCategoryId,
      prices,
      setPrices: updatePrice,
      selectedIngredients,
      setSelectedIngredients: toggleIngredients,
      sizes,
      setSizes: toggleSizes,
      types,
      setTypes: toggleTypes,
    }),
    [selectedIngredients, sizes, types, prices, categoryId]
  );
};
