import { z } from "zod";

// const phoneRegex = new RegExp(
//   /^(\+7|7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
// );

//Minimum eight characters, at least one letter and one number:
const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

export const passwordSchema = z.string().regex(passwordRegex, {
  message:
    "Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву, одну строчную букву и одну цифру.",
});

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: z.string({ message: "Введите пароль" }),
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введите имя" }),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const formProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Введите имя" }),
});

export type TFormLoginData = z.infer<typeof formLoginSchema>;
export type TFormRegisterData = z.infer<typeof formRegisterSchema>;
export type TFormProfileData = z.infer<typeof formProfileSchema>;
