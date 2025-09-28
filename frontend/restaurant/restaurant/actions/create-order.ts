/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout-components/schemas/checkout-form-schema";
import { getUserSession } from "@/shared/lib/get-user-session";
import { Api } from "@/shared/services/api-client";
import { mapOrderToDto } from "@/shared/services/mappers/order-mappers";
import { OrderStatus, OrderType, PaymentType } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createOrder = async (data: CheckoutFormValues) => {
  /// test env
  if (data.paymentType != PaymentType.OFFLINE) {
    return;
  }

  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("[create-order] Cart token not found");
    }

    const user = await getUserSession();

    if (!user) {
      throw new Error("[create-order] User not Authorized");
    }

    const userId = user.id;

    // получаем корзину пользователя
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          {
            token: cartToken,
          },
        ],
      },
    });

    if (!userCart) {
      throw new Error("[create-order] Cart not found");
    }
    if (!userCart.totalAmount) {
      throw new Error("[create-order] Cart is empty");
    }

    const deliveryCost = await prisma.deliveryPrice.findFirst();

    if (deliveryCost === null) {
      throw new Error("[create-order] Delivery cost not found");
    }

    const deliveryPrice =
      data.orderType === OrderType.DELIVERY ? deliveryCost.price : 0;

    const totalOrderCost = userCart.totalAmount + deliveryPrice;

    const orderStatus =
      data.paymentType === PaymentType.ONLINE
        ? OrderStatus.PENDING
        : OrderStatus.CREATED;

    const address = data.orderType === OrderType.DELIVERY ? data.address : "";

    // создаём заказ в базе данных
    // const order = await prisma.order.create({
    //   data: {
    //     userId: userId,
    //     token: cartToken,
    //     fullName: data.firstName,
    //     email: data.email,
    //     phone: data.phone,
    //     address: address || "",
    //     comment: data.comment,
    //     totalAmount: totalOrderCost,
    //     deliveryPrice: deliveryPrice,
    //     status: orderStatus,
    //     items: JSON.stringify(userCart.items),
    //     type: data.orderType,
    //     paymentType: data.paymentType,
    //   },
    // });

    // <send order to API>

    const createdOrder = {
      orderId: 0,
      userId: userId,

      fullName: data.firstName,
      email: data.email,
      phone: data.phone,
      address: address,
      comment: data.comment,
      totalAmount: totalOrderCost,
      deliveryPrice: deliveryPrice,

      status: orderStatus,
      type: data.orderType,
      paymentType: data.paymentType,
      hasPaid: false,

      items: userCart.items,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orderDto = mapOrderToDto(createdOrder);
    const token = user.token;
    const orderResult = await Api.order.sendOrder(orderDto, token);

    if (!orderResult.isSuccess && orderResult.error) {
      return { paymentUrl: "", error: orderResult.error };
    }
    // </send order to API>

    // очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // обновляем данные пользователя
    await prisma.user.update({
      where: { id: userId },
      data: { address: data.address, phoneNumber: data.phone },
    });

    // создаём платеж если оплата онлайн
    // if (data.paymentType === PaymentType.ONLINE) {
    //   // отправка платежа в youkassa
    //   const paymentData = await createPayment({
    //     amount: totalOrderCost,
    //     orderId: order.id,
    //     description: "Оплата заказа: " + order.id,
    //   });

    //   if (!paymentData) {
    //     throw new Error("[create-order] Ошибка при создании платежа");
    //   }

    //   // ссылка а оплату
    //   const paymentUrl = paymentData.confirmation.confirmation_url;

    //   await prisma.order.update({
    //     where: {
    //       id: order.id,
    //     },
    //     data: {
    //       paymentId: paymentData.id,
    //       paymentUrl: paymentUrl,
    //     },
    //   });

    // отправка email с ссылкой на оплату
    // await sendEmail(
    //   data.email,
    //   "Штаб | Заказ создан",
    //   PayOrderEmailTemplate({
    //     orderId: order.id,
    //     orderCost: order.totalAmount,
    //     paymentUrl: paymentUrl,
    //   })
    // );

    //return { paymentUrl };
    //}
    redirect("/orders");
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("NEXT_REDIRECT")) {
      console.dir("[create-order] - " + error, { depth: 10 });
    }
    throw error;
  }
};
