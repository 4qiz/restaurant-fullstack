"use server";

import * as z from "zod";
import { RegisterSchema } from "@/shared/schemas/schemas";
import bcryptjs from "bcryptjs";
import { prisma } from "@/shared/lib/prisma-client";
import { getUserEmployeeByEmail } from "@/entities/employee-user/services/get-employee-user-by";
import { redirect } from "next/navigation";
import { routes } from "@/shared/constants/routes";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiels = await RegisterSchema.safeParseAsync(values);

  if (!validatedFiels.success) {
    return { error: "Неправильно заполнены поля" };
  }

  const { email, password, name, role } = validatedFiels.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserEmployeeByEmail(email);

  if (existingUser) {
    return { error: "Пользователь с таким Email уже существует" };
  }

  const employee = await prisma.employeeUser.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name,
    },
  });

  redirect(routes.employeeUserId(employee.id));
};
