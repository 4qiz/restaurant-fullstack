import { prisma } from "@/shared/lib/prisma-client";

export const getUserEmployeeByEmail = async (email: string) => {
  const user = await prisma.employeeUser.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserEmployeeById = async (id: string) => {
  const user = await prisma.employeeUser.findUnique({
    where: {
      id,
    },
  });
  return user;
};
