import { prisma } from "@/prisma/prisma-client";
import { CheckoutContent } from "@/shared/components/shared/checkout-components/checkout-content";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
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

  return <CheckoutContent />;
}
