import { EmployeeUsersResponse } from "@/entities/employee-user/domain";
import { getEmployeeUsers } from "@/entities/employee-user/services/get-employee-users";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const dynamic = "force-dynamic";

// Определяем схему валидации через zod
const GetEmployeesSchema = z.object({
  page: z.string().optional().default(DEFAULT_PAGE.toString()), // строка, но конвертируем
  limit: z.string().optional().default(DEFAULT_LIMIT.toString()), // строка, но конвертируем
  search: z.string().optional().default(""),
  role: z.nativeEnum(UserRole).optional().or(z.literal("ALL")),
});

// Функция обработки GET-запроса
export async function GET(req: NextRequest) {
  try {
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsedParams = GetEmployeesSchema.parse(searchParams);

    const page = parseInt(parsedParams.page, 10);
    const limit = parseInt(parsedParams.limit, 10);
    const role = parsedParams.role === "ALL" ? undefined : parsedParams.role;

    const data = await getEmployeeUsers({
      page,
      limit,
      search: parsedParams.search,
      role,
    });

    return NextResponse.json(data satisfies EmployeeUsersResponse);
  } catch (error) {
    console.error("Error fetching employee users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
