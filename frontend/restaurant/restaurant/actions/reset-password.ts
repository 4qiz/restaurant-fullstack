"use server";

import { sendPasswordResetEmail } from "@/shared/lib/email/resend";
import { generateVerificationToken } from "@/shared/lib/generate-reset-token";
import { ResetSchema } from "@/shared/schemas/schemas";
import { getUserByEmail } from "@/shared/services/user/get-user";
import * as z from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFiels = await ResetSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "Укажите корректный Email" };
  }

  const { email } = validatedFiels.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Укажите корректный Email" };
  }

  const passwordResetToken = await generateVerificationToken(
    existingUser.email
  );

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Ссылка для сброса пароля отправлена на почту" };
};
