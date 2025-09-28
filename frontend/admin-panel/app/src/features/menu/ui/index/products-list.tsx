import { ProductsSearchParams } from "@/entities/product/services/get-filtered-products";
import { ProductsGroupList } from "./products-group-list";
import { CategoryWithProducts } from "@/entities/product/domain";

export const ProductsList = async ({
  categories,
  params,
}: {
  categories: CategoryWithProducts[];
  params: ProductsSearchParams;
}) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {categories.map(
        (category) =>
          category.products.length > 0 && (
            <ProductsGroupList
              params={params}
              key={category.id}
              title={category.name}
              categoryId={category.id}
              items={category.products}
            />
          )
      )}
    </div>
  );
};
