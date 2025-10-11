import { ArrowRight, Package, Truck } from "lucide-react";
import { CheckoutPriceItem } from "./checkout-price-item";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { OrderType } from "@prisma/client";

type Props = {
  productsPrice: number;
  deliveryPrice: number;
  priceWithDelivery: number;
  paymentSelect: React.ReactNode;
  orderType: OrderType;
  className?: string;
  loading?: boolean;
};

export const CheckoutPriceBar: React.FC<Props> = ({
  priceWithDelivery,
  productsPrice,
  deliveryPrice,
  loading,
  paymentSelect,
  orderType,
}) => {
  const showDelivery = orderType === OrderType.DELIVERY;
  const totalPrice = showDelivery ? priceWithDelivery : productsPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>

        {loading ? (
          <Skeleton className="w-36 h-10" />
        ) : (
          <span className="text-4xl font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutPriceItem
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-400" />
            Стоимость товаров:
          </div>
        }
        value={productsPrice.toString()}
      />

      {showDelivery && (
        <CheckoutPriceItem
          title={
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-400" />
              Доставка:
            </div>
          }
          value={deliveryPrice.toString()}
        />
      )}

      {paymentSelect}

      <Button
        loading={loading}
        type="submit"
        //disabled={!totalAmount || submitting}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
