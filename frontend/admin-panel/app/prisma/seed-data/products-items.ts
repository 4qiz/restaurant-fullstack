import { MeasureUnit, Prisma, ProductItemSize } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  productType,
  size,
  price,
  weight,
  measureUnit,
  productItemSize,
}: {
  productId: number;
  productType?: number;
  size?: number;
  price?: number;
  weight?: number;
  measureUnit?: MeasureUnit;
  productItemSize?: ProductItemSize;
}) => {
  return {
    productId,
    price: price ?? randomDecimalNumber(100, 500),
    productType,
    size,
    productItemSize: productItemSize ?? ProductItemSize.MEDIUM,
    weight: weight,
    measureUnit: measureUnit ?? MeasureUnit.GRAM,
  } as Prisma.ProductItemUncheckedCreateInput;
};

export const productsItemsSeed = [
  // Горячее
  generateProductItem({ productId: 1, price: 630, weight: 350 }), //Строганов с пюре и хруст.огурчик
  generateProductItem({ productId: 2, price: 580, weight: 220 }), //Мясная котлета со сливочным пюре
  generateProductItem({ productId: 3, price: 650, weight: 250 }), //Стейк из свинины
  generateProductItem({ productId: 4, price: 490, weight: 300 }), //Куринные котлетки с картофельным пюре
  generateProductItem({ productId: 5, price: 650, weight: 240 }), //Атлантический палтус с тыквенным ризотто
  generateProductItem({ productId: 6, price: 690, weight: 260 }), //Котлета рыбная со сливочным пюре

  // Супы
  generateProductItem({ productId: 7, price: 450, weight: 300 }), //Борщ
  generateProductItem({ productId: 8, price: 290, weight: 300 }), //Куриный суп с лапшой
  generateProductItem({ productId: 9, price: 590, weight: 350 }), //Суп с морепродуктами

  // Гарниры
  // Салаты
  generateProductItem({ productId: 10, price: 530, weight: 230 }), //Салат с ростбифом
  generateProductItem({ productId: 11, price: 580, weight: 210 }), //Салат с тигровыми креветками
  generateProductItem({ productId: 12, price: 470, weight: 220 }), //Салат с курицей су-вид и беконом

  // Закуски

  // Напитки

  generateProductItem({
    productId: 13,
    price: 190,
    weight: 200,
    measureUnit: "MILLILITERS",
    productItemSize: "SMALL",
  }), //Айс Кофе
  generateProductItem({
    productId: 13,
    price: 290,
    weight: 300,
    measureUnit: "MILLILITERS",
    productItemSize: "MEDIUM",
  }), //Айс Кофе
  generateProductItem({
    productId: 13,
    price: 390,
    weight: 400,
    measureUnit: "MILLILITERS",
    productItemSize: "BIG",
  }), //Айс Кофе

  generateProductItem({
    productId: 14,
    price: 190,
    weight: 200,
    measureUnit: "MILLILITERS",
    productItemSize: "SMALL",
  }), //Капучино
  generateProductItem({
    productId: 14,
    price: 290,
    weight: 300,
    measureUnit: "MILLILITERS",
    productItemSize: "MEDIUM",
  }), //Капучино

  generateProductItem({
    productId: 15,
    price: 120,
    weight: 200,
    measureUnit: "MILLILITERS",
    productItemSize: "SMALL",
  }), //Какао
  generateProductItem({
    productId: 15,
    price: 190,
    weight: 300,
    measureUnit: "MILLILITERS",
    productItemSize: "MEDIUM",
  }), //Какао
  generateProductItem({
    productId: 15,
    price: 290,
    weight: 400,

    measureUnit: "MILLILITERS",
    productItemSize: "BIG",
  }), //Какао

  // Десерты
  generateProductItem({ productId: 16, price: 280, weight: 100 }), //Чизкейк классический
  generateProductItem({ productId: 17, price: 280, weight: 160 }), //Медовик
  generateProductItem({ productId: 18, price: 150, weight: 210 }), //Блины с маслом
];
