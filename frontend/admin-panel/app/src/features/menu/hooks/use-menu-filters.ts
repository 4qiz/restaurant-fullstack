import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  name?: string;
  categoryId?: string;
}

export interface MenuFilters {
  name?: string;
  categoryId?: string;
  prices: PriceRangeProps;
}

interface ReturnProps extends MenuFilters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setCategoryId: (value: string) => void;
  setName: (value: string) => void;
  reset: () => void;
}

export const useMenuFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  // name
  const [name, setName] = useState(
    searchParams.has("name") ? searchParams.get("name") : ""
  );

  // categoryId
  const [categoryId, setCategoryId] = useState(
    searchParams.has("categoryId") ? searchParams.get("categoryId") : ""
  );

  //prices
  const [prices, setPrices] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setName("");
    setCategoryId("");
    setPrices({ priceFrom: undefined, priceTo: undefined });
  };

  return useMemo(
    () => ({
      name,
      categoryId,
      prices,
      setName,
      setCategoryId,
      setPrices: updatePrice,
      reset,
    }),
    [name, categoryId, prices]
  );
};
