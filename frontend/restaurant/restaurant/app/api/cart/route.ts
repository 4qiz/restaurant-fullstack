import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart-dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

// получение корзины по токену
export async function GET(req: NextRequest) {
  try {
    const cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token: cartToken,
          },
        ],
      },
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

    return NextResponse.json(userCart);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "[CART_GET] Server error" },
      { status: 500 }
    );
  }
}

// add cartItem / добавляет товар в корзину
export async function POST(req: NextRequest) {
  try {
    let cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(cartToken);

    if (userCart.totalAmount > 30000) {
      return NextResponse.json(
        { message: "Максимальная сумма заказа 30000 рублей" },
        { status: 400 }
      );
    }

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    //сверх костыль для коректного добавления товаров с игредиентами
    const findCartItem = findMatchingCartItem(
      findCartItems,
      data.ingredients ?? []
    );

    //если товара нет в корзине создаем CartItem
    if (!findCartItem) {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });

      //если товар есть в корзине, прибавляем количество
      // максимальное колиество единиц одного товара 10
    } else if (findCartItem.quantity < 10) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Максимальное количество единиц одного товара 10" },
        { status: 400 }
      );
    }

    const updatedUserCart = await updateCartTotalAmount(cartToken);
    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", cartToken);
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "[CART_POST] Server error" },
      { status: 500 }
    );
  }
}

const findMatchingCartItem = (
  findCartItems: ({
    ingredients: {
      id: number;
      name: string;
      price: number;
      imageUrl: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  } & {
    id: number;
    productItemId: number;
    cartId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    userId?: number | null;
  })[],
  dataIngredients: number[]
) => {
  return findCartItems.find((cartItem) => {
    if (cartItem.ingredients.length !== dataIngredients.length) {
      return false;
    }
    const cartItemIngredientIds = cartItem.ingredients.map(
      (ingredient) => ingredient.id
    );
    return dataIngredients.every((ingredientId) =>
      cartItemIngredientIds.includes(ingredientId)
    );
  });
};
