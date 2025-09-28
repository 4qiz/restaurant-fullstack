import { MeasureUnit, ProductItemSize } from "@prisma/client";
import * as z from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Название не указано" })
    .refine((val) => val.trim().length > 0, {
      message: "Название не может быть пустым",
    }), // Дополнительная проверка на пустую строку

  description: z.optional(z.string().trim()),
  imageUrl: z.string({ message: "Выберите изображение" }),
  categoryId: z.string({ message: "Категория не указана" }),

  // productItem
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
