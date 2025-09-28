import { prisma } from "@/shared/lib/prisma-client";
import { Prisma, UserRole } from "@prisma/client";
import { EmployeeUsersResponse } from "../domain";

export const getEmployeeUsers = async (params: {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
}) => {
  const { page, limit, search, role } = params;

  const whereClause = {
    OR: search
      ? [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ]
      : undefined,
    role: role || undefined,
  } satisfies Prisma.EmployeeUserWhereInput;

  const users = await prisma.employeeUser.findMany({
    select: { id: true, name: true, email: true, role: true },
    where: whereClause,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { role: "asc" },
  });

  const totalUsers = await prisma.employeeUser.count({ where: whereClause });
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    totalUsers,
    totalPages,
    currentPage: page,
  } satisfies EmployeeUsersResponse;
};
