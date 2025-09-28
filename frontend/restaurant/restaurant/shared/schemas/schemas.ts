import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({ message: "Неправильный email" }),
});

//Minimum eight characters, at least one letter and one number:
const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

// export const NewPasswordSchema = z.object({
//   password: z.string().min(6, { message: "Придумай хоть немного посложнее" }),
// });

export const passwordSchema = z.string().regex(passwordRegex, {
  message:
    "Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву, одну строчную букву и одну цифру.",
});

export const NewPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
