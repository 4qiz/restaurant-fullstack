import React from "react";

interface Props {
  orderId: number;
  orderCost: number;
  paymentUrl: string;
}

export const PayOrderEmailTemplate: React.FC<Props> = ({
  orderId,
  orderCost,
  paymentUrl,
}) => (
  <div>
    <p>
      Заказ №{orderId} на сумму {orderCost} рублей создан. Вы можете оплатить
      заказ по <a href={paymentUrl}>ссылке</a>
    </p>
  </div>
);
