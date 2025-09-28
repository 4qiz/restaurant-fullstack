import { getOrder } from "@/entities/order/services/get-order";
import { OrderContainer } from "@/features/orders/ui/edit/order-container";
import { MessageCard } from "@/shared/components/message-card";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { AlertTriangleIcon } from "lucide-react";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUserAsync();
  if (!user?.token) {
    return unauthorized();
  }
  const { order, error } = await getOrder(Number(id), user.token);
  if (error) {
    return <MessageCard icon={<AlertTriangleIcon />} message={error} />;
  }

  if (order === null) {
    return <MessageCard icon={<AlertTriangleIcon />} message={error || ""} />;
  }

  return <OrderContainer orderDb={order} />;
};

export default Page;
