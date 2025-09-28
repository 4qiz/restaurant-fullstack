import * as z from "zod";
export const CreateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Укажите название категории" })
    .refine((val) => val.trim().length > 0, {
      message: "Укажите название категории",
    }),
});
