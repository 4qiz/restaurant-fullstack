import { prisma } from "@/shared/lib/prisma-client";

export const setLastEnterDate = async (userId: string) => {
  await prisma.employeeUser.update({
    where: { id: userId },
    data: { updatedAt: new Date() },
  });
};
