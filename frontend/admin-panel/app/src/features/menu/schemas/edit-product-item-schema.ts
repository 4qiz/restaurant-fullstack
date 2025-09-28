import { MeasureUnit, ProductItemSize } from "@prisma/client";
import * as z from "zod";

export const EditProductItemSchema = z.object({
  productItemSize: z.nativeEnum(ProductItemSize),
  measureUnit: z.nativeEnum(MeasureUnit),
  price: z
    .number({ message: "Цена указана неверно" })
    .positive({ message: "Цена указана неверно" }),
  weight: z
    .number({ message: "Вес указан неверно" })
    .min(1, { message: "Не менее 1" })
    .max(10000, { message: "Не более 10000" }),

  isActive: z.boolean(),
});
