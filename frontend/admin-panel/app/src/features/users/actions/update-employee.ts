"use server";

import * as z from "zod";
import { EmployeeCardSchema } from "../schemas/employee-card-schema";
import {
  getUserEmployeeByEmail,
  getUserEmployeeById,
} from "@/entities/employee-user/services/get-employee-user-by";
import bcryptjs from "bcryptjs";
import { prisma } from "@/shared/lib/prisma-client";

export const updateEmployee = async (
  employeeUserId: string,
  values: z.infer<typeof EmployeeCardSchema>
) => {
  const user = await getUserEmployeeById(employeeUserId);
  if (!user) {
    return { error: "Пользователь не найден" };
  }

  // change email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserEmployeeByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email уже используется" };
    }
  }

  // change password
  if (values.newPassword && values.password) {
    const passwordsMatch = await bcryptjs.compare(
      values.password,
      user.password
    );
    if (!passwordsMatch) {
      return { error: "Неверный пароль" };
    }

    const hashPassword = await bcryptjs.hash(values.newPassword, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
  }

  await prisma.employeeUser.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Информация о пользователе обновлена" };
};
