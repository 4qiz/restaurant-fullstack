import * as z from "zod";

export const EditProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Название не указано" })
    .refine((val) => val.trim().length > 0, {
      message: "Название не может быть пустым",
    }), // Дополнительная проверка на пустую строку

  description: z.optional(z.string().trim()),
  categoryId: z.string({ message: "Категория не указана" }),
});
