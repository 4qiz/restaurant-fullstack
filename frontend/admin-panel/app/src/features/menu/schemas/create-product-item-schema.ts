import { MeasureUnit, ProductItemSize } from "@prisma/client";
import * as z from "zod";

export const CreateProductItemSchema = z.object({
  productItemSize: z.nativeEnum(ProductItemSize),
  measureUnit: z.nativeEnum(MeasureUnit),
  price: z
    .number({ message: "Цена указана неверно" })
    .positive({ message: "Цена указана неверно" }),
  weight: z
    .number({ message: "Вес указан неверно" })
    .positive({ message: "Вес указан неверно" }),

  isActive: z.boolean(),
});
