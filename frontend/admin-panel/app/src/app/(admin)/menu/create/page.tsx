import { getCategories } from "@/entities/category/services/get-categories";
import { CreateProductCard } from "@/features/menu/ui/create/create-product-card";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  const categories = await getCategories();
  return <CreateProductCard categories={categories} />;
};

export default Page;
