"use client";

import { Api } from "@/shared/services/api-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";

export const CancelOrderButton = ({ orderId }: { orderId: number }) => {
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const token = session.data?.user.token;
  if (!token) {
    return;
  }

  const handleUpdateStatus = async () => {
    setLoading(true);
    const result = await Api.order.cancelOrder(orderId, token);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Заказ отменён");
    }
  };

  return (
    <Button
      variant="destructive"
      disabled={loading}
      onClick={() => handleUpdateStatus()}
    >
      Отменить заказ
    </Button>
  );
};
