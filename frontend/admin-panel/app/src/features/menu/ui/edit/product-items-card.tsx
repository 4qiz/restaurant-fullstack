import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ProductItem } from "@prisma/client";
import { ProductItemCard } from "./product-item-card";
import { CreateProductItemModal } from "../create/create-product-item-modal";
import { MessageCard } from "@/shared/components/message-card";

export const ProductItemsCard = ({
  productItems,
  productId,
}: {
  productItems: ProductItem[];
  productId: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Размеры</CardTitle>
        <CreateProductItemModal productId={productId} />
      </CardHeader>
      <CardContent className="space-y-3">
        {productItems.length > 0 ? (
          productItems.map((productItem) => (
            <ProductItemCard productItem={productItem} key={productItem.id} />
          ))
        ) : (
          <MessageCard message="Добавьте хотя бы один размер" />
        )}
      </CardContent>
    </Card>
  );
};
