import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };

    const cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }
    const maxProductsAmount = 10;
    if (data.quantity >= 1 && data.quantity <= maxProductsAmount) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: data.quantity,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(cartToken);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "[CART_PATCH] Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(cartToken);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "[CART_DELETE] Server error" },
      { status: 500 }
    );
  }
}
