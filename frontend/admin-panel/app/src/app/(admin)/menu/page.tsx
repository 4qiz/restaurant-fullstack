import { ProductsSearchParams } from "@/entities/product/services/get-filtered-products";
import { MenuPage } from "@/features/menu/ui/index/menu-page";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<ProductsSearchParams>;
}) => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  const params = await searchParams;

  return (
    <div className="xl:w-1/2">
      <MenuPage params={params} />
    </div>
  );
};

export default Page;
