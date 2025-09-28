import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// получение стоимости доставки

export async function GET() {
  try {
    const deliveryPrice = await prisma.deliveryPrice.findFirst();

    return NextResponse.json(deliveryPrice);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "[CART_GET] Server error" },
      { status: 500 }
    );
  }
}
