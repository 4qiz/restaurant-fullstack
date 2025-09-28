import { CartItemDTO } from "@/shared/services/dto/cart-dto";
import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const SuccessOrderEmailTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  items,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h1
      style={{
        fontSize: "28px",
        color: "#1f2937",
        marginBottom: "24px",
        textAlign: "center",
      }}
    >
      Спасибо за заказ!
    </h1>
    <p
      style={{
        fontSize: "18px",
        color: "#4b5563",
        marginBottom: "16px",
        textAlign: "center",
      }}
    >
      Ваш заказ <strong style={{ color: "#1d4ed8" }}>#{orderId}</strong>{" "}
      оплачен.
    </p>
    <p
      style={{
        fontSize: "18px",
        color: "#4b5563",
        marginBottom: "24px",
        textAlign: "center",
      }}
    >
      Общая сумма: <strong style={{ color: "#16a34a" }}>{totalAmount}₽</strong>
    </p>
    <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "12px" }}>
      Список товаров:
    </p>
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #e5e7eb",
        margin: "16px 0",
      }}
    />
    <ul style={{ padding: "0", listStyle: "none" }}>
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            fontSize: "16px",
            color: "#374151",
            padding: "12px 0",
            borderBottom: "1px solid #e5e7eb",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8px",
          }}
        >
          <span>{item.productItem.product.name}</span>
          <span>
            {item.productItem.price}₽ x {item.quantity} шт.
          </span>
        </li>
      ))}
    </ul>
    <p
      style={{
        fontSize: "14px",
        color: "#6b7280",
        marginTop: "24px",
        textAlign: "center",
      }}
    >
      Спасибо, что выбрали нас! Если у вас есть вопросы, свяжитесь с нашей
      службой поддержки.
    </p>
  </div>
);
