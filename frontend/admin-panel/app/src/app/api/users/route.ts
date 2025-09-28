import { UsersResponse } from "@/entities/user/domain";
import { getUsers } from "@/entities/user/services/get-users";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const dynamic = "force-dynamic";

// Определяем схему валидации через zod
const GetUsersSchema = z.object({
  page: z.string().optional().default(DEFAULT_PAGE.toString()), // строка, но конвертируем
  limit: z.string().optional().default(DEFAULT_LIMIT.toString()), // строка, но конвертируем
  search: z.string().optional().default(""),
});

// Функция обработки GET-запроса
export async function GET(req: NextRequest) {
  try {
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsedParams = GetUsersSchema.parse(searchParams);

    const page = parseInt(parsedParams.page, 10);
    const limit = parseInt(parsedParams.limit, 10);

    const data = await getUsers({
      page,
      limit,
      search: parsedParams.search,
    });

    return NextResponse.json(data satisfies UsersResponse);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
