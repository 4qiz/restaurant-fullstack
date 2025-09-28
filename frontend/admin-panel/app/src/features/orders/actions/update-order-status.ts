"use server";

import { putOrderStatus } from "@/entities/order/services/put-order-status";
import { routes } from "@/shared/constants/routes";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async (
  orderId: number,
  isCanceled: boolean
) => {
  const user = await currentUserAsync();
  if (!user) {
    return { error: "Войдите в аккаунт" };
  }
  await putOrderStatus(orderId, isCanceled, user?.token);
  revalidatePath(routes.orderId(orderId));
  return { success: "Статус обновлен" };
};
