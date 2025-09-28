import { getOrders } from "@/entities/order/services/get-orders";
import { OrdersContainer } from "@/features/orders/ui/index/orders-container";
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
  const { orders, error } = await getOrders(user.token);

  if (error) {
    return <MessageCard icon={<AlertTriangleIcon />} message={error} />;
  }

  return <OrdersContainer ordersDb={orders} />;
};

export default Page;
