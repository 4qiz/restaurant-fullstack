"use client";

import { ProductRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import toast from "react-hot-toast";
import { ExtendedProductForm } from "./extended-product-form";
import { sortProductItems } from "@/shared/lib/get-available-pizza-sizes";

interface Props {
  product: ProductRelations;
  onSubmit?: VoidFunction;
}

export const ProductFormTemplate: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading, totalAmount] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
    state.totalAmount,
    state.items,
  ]);

  const firstItem = product.items[0];

  const sortedProductItems =
    product.items.length > 0 ? sortProductItems(product.items) : [];

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      if (totalAmount > 30000) {
        toast.error(`Максимальная сумма заказа 30000 рублей`, {
          icon: "❌",
          style: {
            borderRadius: "50px",
            background: "#fff",
            color: "#333",
            fontSize: "20px",
          },
        });
      } else {
        await addCartItem({
          productItemId: itemId,
          ingredients,
        });

        toast.success(`${product.name} в корзинe`, {
          icon: "👍",
          style: {
            borderRadius: "50px",
            background: "#fff",
            color: "#333",
            fontSize: "20px",
          },
        });
        _onSubmit?.();
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  return (
    <ExtendedProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      description={product.description}
      onSubmit={onSubmit}
      ingredients={product.ingredients}
      items={sortedProductItems}
      loading={loading}
    />
  );
};
