"use server";

import * as z from "zod";
import { LoginSchema } from "@/shared/schemas/schemas";
import { AuthError } from "next-auth";
import { getUserEmployeeByEmail } from "@/entities/employee-user/services/get-employee-user-by";
import { signIn } from "@/shared/lib/auth-js/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>
  //callbackUrl?: string | null
) => {
  const validatedFiels = await LoginSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "validate error" };
  }

  const { email, password } = validatedFiels.data;

  const existingUser = await getUserEmployeeByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Неправильный логин или пароль" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type == "CredentialsSignin")
        return { error: "Неверный логин или пароль" };
      if (error.type == "AccessDenied") return { error: "Доступ запрещён" };
      return { error: "Error" };
    }
    throw error; // throws NEXT_REDIRECT error
  }
};
