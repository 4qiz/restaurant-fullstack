import { getOrders } from "@/entities/order/services/get-orders";
import { OrdersHistoryContainer } from "@/features/orders/ui/history/orders-history-container";
import { MessageCard } from "@/shared/components/message-card";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { AlertTriangleIcon } from "lucide-react";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await currentUserAsync();
  if (!user?.token) {
    return unauthorized();
  }
  const { orders, error } = await getOrders(user.token, { history: true });

  if (error) {
    return <MessageCard icon={<AlertTriangleIcon />} message={error} />;
  }

  return <OrdersHistoryContainer ordersDb={orders} />;
};

export default Page;
