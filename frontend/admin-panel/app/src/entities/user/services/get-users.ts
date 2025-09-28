import { prisma } from "@/shared/lib/prisma-client";
import { Prisma } from "@prisma/client";

export const getUsers = async (params: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const { page, limit, search } = params;

  const whereClause = {
    OR: search
      ? [
          { fullName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ]
      : undefined,
  } satisfies Prisma.UserWhereInput;

  const users = await prisma.user.findMany({
    select: { id: true, fullName: true, email: true },
    where: whereClause,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: "asc" },
  });

  const totalUsers = await prisma.user.count({ where: whereClause });
  const totalPages = Math.ceil(totalUsers / limit);

  return { users, totalUsers, totalPages, currentPage: page };
};
