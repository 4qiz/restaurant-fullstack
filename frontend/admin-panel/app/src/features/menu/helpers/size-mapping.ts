import { ProductItemSize } from "@prisma/client";

export const sizeTranslations: Record<ProductItemSize, string> = {
  [ProductItemSize.SMALL]: "Маленький",
  [ProductItemSize.MEDIUM]: "Средний",
  [ProductItemSize.BIG]: "Большой",
};
