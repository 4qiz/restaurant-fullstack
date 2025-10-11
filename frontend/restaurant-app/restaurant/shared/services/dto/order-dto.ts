import {
  MeasureUnit,
  OrderStatus,
  OrderType,
  PaymentType,
  ProductItemSize,
} from "@prisma/client";

// without payment id (maybe add?)
export type OrderDto = {
  orderId: number;
  userId: string;
  deliveryId?: string;

  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
  totalAmount: number;
  deliveryPrice: number;

  status: OrderStatus;
  type: OrderType;
  paymentType: PaymentType;
  hasPaid: boolean;

  items: OrderItemDto[];

  createdAt: string;
  updatedAt: string;
};

export type OrderItemDto = {
  productId: number;
  name: string;
  imageUrl?: string;

  productItemId: number;
  price: number;
  weight: number;
  productItemSize: ProductItemSize;
  measureUnit: MeasureUnit;

  quantity: number;

  ingredients: OrderItemIngredientDto[];
};

export type OrderItemIngredientDto = {
  ingredientId: number;
  name: string;
  price: number;
};
