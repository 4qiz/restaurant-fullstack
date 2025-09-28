import { getCategories } from "@/entities/category/services/get-categories";
import {
  getFilteredProducts,
  ProductsSearchParams,
} from "@/entities/product/services/get-filtered-products";
import { routes } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { MenuFilters } from "./filters/menu-filters";
import { ProductsList } from "./products-list";
import Link from "next/link";

export const MenuPage = async ({
  params,
}: {
  params: ProductsSearchParams;
}) => {
  const { categoriesWithProducts, maxPrice } = await getFilteredProducts(
    params
  );

  const categories = await getCategories();
  return (
    <div className="space-y-3">
      <Card>
        <CardContent className=" flex flex-row items-center justify-between p-6">
          <CardTitle>Меню</CardTitle>
          <Link href={routes.menuCreate()}>
            <Button>
              <Plus />
              Добавить блюдо
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Suspense>
            <MenuFilters maxPrice={maxPrice || 10000} categories={categories} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <ProductsList params={params} categories={categoriesWithProducts} />
        </CardContent>
      </Card>
    </div>
  );
};
