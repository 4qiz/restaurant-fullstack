import { getCategories } from "@/entities/category/services/get-categories";
import { sortProductItems } from "@/entities/product-item/domain";
import { getProductItemsByProductId } from "@/entities/product-item/services/get-product-items-by-id";
import { ProductsSearchParams } from "@/entities/product/services/get-filtered-products";
import { getProductById } from "@/entities/product/services/get-product-by-id";
import { EditProductCard } from "@/features/menu/ui/edit/edit-product-card";
import { ProductItemsCard } from "@/features/menu/ui/edit/product-items-card";
import { MenuPage } from "@/features/menu/ui/index/menu-page";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { notFound, unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ProductsSearchParams>;
}) => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  const { id } = await params;
  const filterParams = await searchParams;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    notFound();
  }
  const product = await getProductById(idNumber);
  if (!product) {
    notFound();
  }
  const categories = await getCategories();

  const productItems = await getProductItemsByProductId(product.id);
  const sortedProductItems =
    productItems.length > 0 ? sortProductItems(productItems) : [];

  return (
    <div className="flex flex-shrink-0 gap-3">
      <div className="hidden xl:block w-full">
        <MenuPage params={filterParams} />
      </div>
      <div className="space-y-3 w-full">
        <EditProductCard product={product} categories={categories} />
        <ProductItemsCard
          productId={product.id}
          productItems={sortedProductItems}
        />
      </div>
    </div>
  );
};

export default Page;
