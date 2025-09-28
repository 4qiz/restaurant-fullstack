import { UserRole } from "@prisma/client";
import * as z from "zod";

//Minimum eight characters, at least one letter and one number:
const passwordRegex = new RegExp("^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$");

export const EmployeeCardSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email({ message: "Неправильный email" })),
  role: z.nativeEnum(UserRole),
  lastEnterDate: z.optional(z.date()),
  isActive: z.optional(z.boolean()),
  password: z
    .string()
    .or(z.literal("")) // Разрешаем пустую строку
    .transform((val) => (val === "" ? undefined : val)), // Превращаем "" в undefined
  newPassword: z
    .string()
    .regex(passwordRegex, {
      message:
        "Пароль должен быть длинной хотя бы 8 символов и содержать буквы и цифры",
    })
    .or(z.literal("")) // Разрешаем пустую строку
    .transform((val) => (val === "" ? undefined : val)), // Превращаем "" в undefined
});
