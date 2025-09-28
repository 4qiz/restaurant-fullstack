import { OrderType, PaymentType } from "@prisma/client";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^(\+7|7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
);

export const checkoutFormSchema = z
  .object({
    firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
    email: z.string().email("Введите корректный email"),
    phone: z.string().regex(phoneRegex, "Формат: +79996001122"),
    address: z.string().optional(),
    comment: z.string().optional(),
    paymentType: z.nativeEnum(PaymentType),
    orderType: z.nativeEnum(OrderType),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === OrderType.DELIVERY) {
      if (!data.address || !data.address.startsWith("")) {
        ctx.addIssue({
          path: ["address"],
          code: z.ZodIssueCode.custom,
          message: "Адрес должен начинаться с для доставки",
        });
      }
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
