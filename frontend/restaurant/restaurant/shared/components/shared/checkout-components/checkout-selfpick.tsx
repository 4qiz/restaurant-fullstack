"use client";

import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";

export const CheckoutSelfPick = () => {
  const restaurantAddress = "ул. Неизвестной геолокации д. 1";

  return (
    <WhiteBlock title="3. Самовывоз" contentClassName="lg:p-8">
      <div className="flex flex-col gap-6">
        <FormInput
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />

        <div className="flex flex-col  justify-between items-start border rounded-lg p-3">
          <div className="flex flex-col mb-1">
            <span className="flex text-neutral-600 text-sm">Из ресторана</span>
          </div>
          <div className="flex items-center text-neutral-600  mt-1">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span>{restaurantAddress}</span>
            {/* Скрытое поле для формы */}
            <input type="hidden" name="address" value={restaurantAddress} />
          </div>

          <div className="flex items-center text-neutral-600 text-sm mt-1">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            <span>Вс–Чт: 11:00–23:00, Пт–Сб: 11:00–01:00</span>
          </div>
        </div>
        {/* Yandex Map embed */}
        <div className="rounded-lg overflow-hidden border ">
          {/* place map here */}
        </div>
      </div>
    </WhiteBlock>
  );
};
