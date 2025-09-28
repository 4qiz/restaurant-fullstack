import { MeasureUnit, ProductItem, ProductItemSize } from "@prisma/client";

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

export interface CreateProductItemValues {
  price: number;
  isActive: boolean;
  measureUnit: MeasureUnit;
  productItemSize: ProductItemSize;
  weight: number;
  productId: number;
}
