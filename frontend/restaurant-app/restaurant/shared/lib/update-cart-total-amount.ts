import { prisma } from "@/prisma/prisma-client";
import { calculateCartPrice } from "./calculate-cart-price";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
  if (!userCart) {
    return;
  }

  // подсчитаем стоимость всех товаров в корзине
  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calculateCartPrice(item);
  }, 0);

  return await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },

    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
