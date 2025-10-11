import { prisma } from "@/prisma/prisma-client";
import { OrdersContainer } from "@/shared/components/profile/orders/orders-container";
import { MessageCard } from "@/shared/components/shared/message-card";
import { getUserSession } from "@/shared/lib/get-user-session";
import { Api } from "@/shared/services/api-client";
import { AlertTriangleIcon } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.id,
    },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  const { orders, error } = await Api.order.getOrders(session.token);
  if (error) {
    return <MessageCard icon={<AlertTriangleIcon />} message={error} />;
  }

  return <OrdersContainer ordersDb={orders} />;
}
