import { CheckoutCartItem } from "../checkout-cart-item";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { sizeTranslations } from "@/shared/lib/get-available-pizza-sizes";

type Props = {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
};

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {items.length === 0
          ? [...Array(3)].map((_, i) => <CheckoutItemSkeleton key={i} />)
          : items.map((item) => (
              <CheckoutCartItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={sizeTranslations[item.productItemSize]}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
