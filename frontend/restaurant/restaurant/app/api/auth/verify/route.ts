import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  } catch (error) {
    console.error("[Verify GET]", error);
  }

  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Требуется код подтверждения" },
      { status: 400 }
    );
  }

  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  });

  if (!verificationCode) {
    return NextResponse.json({ error: "Неверный код" }, { status: 400 });
  }

  if (
    verificationCode.createdAt.getTime() + 10 * 60 * 1000 <
    new Date().getTime()
  ) {
    return NextResponse.json({ error: "Код истёк" }, { status: 400 });
  }

  await prisma.user.update({
    where: {
      id: verificationCode.userId,
    },
    data: {
      verified: new Date(),
    },
  });

  await prisma.verificationCode.delete({
    where: {
      id: verificationCode.id,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return NextResponse.redirect(baseUrl || "/");
}
