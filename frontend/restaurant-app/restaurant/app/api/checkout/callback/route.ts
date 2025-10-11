import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { PaymentCallbackData } from "@/@types/yookassa";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    if (order) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: isSucceeded ? OrderStatus.CREATED : OrderStatus.CANCELLED,
          hasPaid: isSucceeded,
        },
      });

      // TODO: send PUT to api

      if (isSucceeded) {
        console.log("successed", order);
        // const items = JSON.parse(order?.items as string) as CartItemDTO[];
        // await sendEmail(
        //   order.email,
        //   `Штаб / Заказ #${order?.id} оплачен!`
        //   // SuccessOrderEmailTemplate({
        //   //   orderId: order.id,
        //   //   totalAmount: order.totalAmount,
        //   //   items,
        //   // })
        // );
      }
    }

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error("Checkout callback error:", error);
    return NextResponse.json({ error: "Server error" });
  }
}
