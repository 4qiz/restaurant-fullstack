import { prisma } from "@/prisma/prisma-client";

// получить корзину по токену или создать новую
export const findOrCreateCart = async (cartToken: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token: cartToken,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token: cartToken,
      },
    });
  }

  return userCart;
};
