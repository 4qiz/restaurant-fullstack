"use client";

import { Button } from "@/shared/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "../../actions/update-order-status";
import { OrderStatus, OrderType, UserRole } from "@prisma/client";
import { useCurrentRole } from "@/shared/lib/auth-js/use-current-role";
import { DeleteConfirmationButton } from "@/shared/components/dialogs/delete-confirmation-button";

export const disableOrderAcceptButton = (
  status: OrderStatus,
  role: UserRole | undefined,
  type: OrderType
) => {
  if (!role) return true;
  return (
    status === OrderStatus.CANCELLED ||
    status === OrderStatus.REFUND ||
    status === OrderStatus.RECEIVED ||
    (role === UserRole.MANAGER &&
      !(
        status === OrderStatus.CREATED ||
        status === OrderStatus.COOKING ||
        (status === OrderStatus.READYFORPICK && type === OrderType.SELFPICK)
      )) ||
    (role === UserRole.DELIVERY &&
      !(
        status === OrderStatus.WAITINGDELIVERY ||
        status === OrderStatus.INDELIVERY ||
        (status === OrderStatus.READYFORPICK && type === OrderType.DELIVERY)
      ))
  );
};

export const disableOrderCancelButton = (
  status: OrderStatus,
  role: UserRole | undefined
) => {
  if (!role) return true;
  return (
    status === OrderStatus.CANCELLED || /// выключена если
    status === OrderStatus.REFUND || /// конечные статусы
    status === OrderStatus.RECEIVED || ///
    (role === UserRole.MANAGER && // включена для менеджера при CREATED или COOKING
      !(status === OrderStatus.CREATED || status === OrderStatus.COOKING)) ||
    role === UserRole.DELIVERY // выключена для доставки
    //   && // включена для доставки при CREATED или COOKING
    // !(
    //   status === OrderStatus.WAITINGDELIVERY ||
    //   status === OrderStatus.INDELIVERY ||
    //   status === OrderStatus.READYFORPICK
    // )
  );
};

export const getSuccessButtonText = (
  status: OrderStatus,
  role: UserRole | undefined,
  type: OrderType
): string => {
  if (!role) return "";
  return status === OrderStatus.COOKING && type === OrderType.DELIVERY
    ? "Передать в доставку"
    : (status === OrderStatus.COOKING && type === OrderType.SELFPICK) ||
      status === OrderStatus.INDELIVERY
    ? "Заказ ожидает получения"
    : status === OrderStatus.READYFORPICK
    ? "Выдать заказ"
    : "Принять заказ";
};

export const OrderActions = ({
  orderId,
  status,
  type,
}: {
  orderId: number;
  status: OrderStatus;
  type: OrderType;
}) => {
  const [loading, setLoading] = useState(false);
  const role = useCurrentRole();

  const handleUpdateStatus = async (isCanceled: boolean) => {
    setLoading(true);
    const result = await updateOrderStatus(orderId, isCanceled);
    setLoading(false);

    if (result.error) {
      toast.error(result.error); // Handle error properly in your UI
    } else {
      toast.success("Статус успешно обновлен!");
    }
  };

  return (
    <div className="flex justify-between items-center gap-3 mt-auto p-3">
      <Button
        className="w-full flex items-center gap-2"
        disabled={loading || disableOrderAcceptButton(status, role, type)}
        onClick={() => handleUpdateStatus(false)}
      >
        <Check size={16} />
        {getSuccessButtonText(status, role, type)}
      </Button>

      <DeleteConfirmationButton
        disabled={loading || disableOrderCancelButton(status, role)}
        onDelete={() => handleUpdateStatus(true)}
        btnText="Отменить заказ"
        modalTitle="Отменить заказ?"
        modalText="Это действие невозможно отменить"
      />
    </div>
  );
};
