import { MeasureUnit, ProductItem, ProductItemSize } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  const filteredProductByType = items.filter(
    (item) => item.productType === type
  );
  const availableProductSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredProductByType.some(
      (p) => Number(p.size) === Number(item.value)
    ),
  }));
  return availableProductSizes;
};

export const getAvailableProductSizes = (items: ProductItem[]): Variant[] => {
  const availableProductSizes: Variant[] = items.map((item) => ({
    name: sizeTranslations[item.productItemSize],
    value: item.productItemSize,
    disabled: !item.isActive,
  }));
  return availableProductSizes;
};

export const sizeTranslations: Record<ProductItemSize, string> = {
  [ProductItemSize.SMALL]: "Маленький",
  [ProductItemSize.MEDIUM]: "Средний",
  [ProductItemSize.BIG]: "Большой",
};

export const unitTranslations: Record<MeasureUnit, string> = {
  [MeasureUnit.GRAM]: "гр",
  [MeasureUnit.MILLILITERS]: "мл",
  [MeasureUnit.PIECES]: "шт",
};

export const productItemSizeOrderMap: Record<ProductItemSize, number> = {
  SMALL: 1,
  MEDIUM: 2,
  BIG: 3,
};

export const sortProductItems = (productItems: ProductItem[]) => {
  return productItems.sort(
    (a, b) =>
      productItemSizeOrderMap[a.productItemSize] -
      productItemSizeOrderMap[b.productItemSize]
  );
};
