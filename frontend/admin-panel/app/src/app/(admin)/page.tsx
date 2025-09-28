import { HomeStatistics } from "@/features/statistics/ui/home-statistics";
import { routes } from "@/shared/constants/routes";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { redirect, unauthorized } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const role = await currentRoleAsync();

  if (role === UserRole.DELIVERY) {
    redirect(routes.orders());
  }

  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  return <HomeStatistics />;
};

export default Page;
