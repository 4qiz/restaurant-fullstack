import { ProductRelations } from "@/entities/product/domain";
import { cn } from "@/shared/lib/css";
import { ProductCard } from "./product-card";
import { Title } from "@/shared/ui/title";
import { routes } from "@/shared/constants/routes";
import { stringify } from "qs";
import { ProductsSearchParams } from "@/entities/product/services/get-filtered-products";

interface Props {
  title: string;
  items: ProductRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
  params: ProductsSearchParams;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  className,
  params,
}) => {
  return (
    <div className={className} id={title}>
      <Title size="md" text={title} className="font-thin mb-3" />

      <div className={cn("flex flex-col gap-5 md:gap-3 ", listClassName)}>
        {items.map((product) => (
          <ProductCard
            href={`${routes.menuId(product.id)}?${stringify(params)}`}
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0]?.price}
            ingredients={product.ingredients}
            description={product.description ?? undefined}
          />
        ))}
      </div>
    </div>
  );
};
