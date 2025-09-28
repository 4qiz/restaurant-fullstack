import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const apiKey = process.env.YOOKASSA_API_KEY;
  if (!apiKey) {
    throw new Error("Укажите ключ YOOKASSA_API_KEY");
  }

  const storeId = process.env.YOOKASSA_STORE_ID;
  if (!storeId) {
    throw new Error("Укажите ключ YOOKASSA_STORE_ID");
  }

  const callbackUrl = process.env.YOOKASSA_CALLBACK_URL;
  if (!callbackUrl) {
    throw new Error("Укажите YOOKASSA_CALLBACK_URL");
  }

  const paymentUrl = process.env.YOOKASSA_PAYMENT_URL;
  if (!paymentUrl) {
    throw new Error("Укажите YOOKASSA_PAYMENT_URL");
  }

  const { data } = await axios.post<PaymentData>(
    paymentUrl,
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: callbackUrl,
      },
    },
    {
      auth: {
        username: storeId,
        password: apiKey,
      },
      headers: {
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
