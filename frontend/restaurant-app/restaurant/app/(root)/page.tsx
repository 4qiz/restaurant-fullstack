import { Container } from "@/shared/components/shared/container";
import { Filters } from "@/shared/components/shared/filters";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { TopBar } from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findProducts, GetSearchParams } from "@/shared/lib/find-products";
import { Stories } from "@/shared/components/shared/stories";
import { Footer } from "@/shared/components/shared/footer";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const { categories, maxPrice } = await findProducts(searchParams);
  return (
    <div className="p-3 xl:p-0">
      {/* <Container className="mt-0">
        <Title text="Все блюда" size="lg" className="font-extrabold" />
      </Container> */}

      {/* TopBar */}
      <TopBar categories={categories.filter((c) => c.products.length > 0)} />

      {/* Stories */}
      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
          {/* Filters */}
          <div className="hidden lg:block">
            <Suspense>
              <Filters
                className="w-[250px]"
                maxPrice={maxPrice || 10000}
                categories={categories}
              />
            </Suspense>
          </div>

          {/* Products */}
          <div id="pdf-element" className="flex-1 flex flex-col gap-16">
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
