"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/shared/schemas/schemas";
import bcryptjs from "bcryptjs";
import { getTokenByToken } from "@/shared/services/user/get-token";
import { getUserByEmail } from "@/shared/services/user/get-user";
import { prisma } from "@/prisma/prisma-client";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Ссылка недействительна" };
  }

  const validatedFiels = await NewPasswordSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return {
      error:
        "Пароль должен быть длинной хотя бы 8 символов и содержать буквы и цифры",
    };
  }

  const { password } = validatedFiels.data;

  const existingToken = await getTokenByToken(token);
  if (!existingToken) {
    return { error: "Ссылка недействительна" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return { error: "Ссылка недействительна" };
  }

  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: "Ссылка недействительна" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.newPasswordToken.delete({
    where: existingToken,
  });

  return { success: "Пароль восстановлен" };
};
