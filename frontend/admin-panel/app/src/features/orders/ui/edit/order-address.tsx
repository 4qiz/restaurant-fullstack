"use client";

import { ResponsiveButton } from "@/shared/ui/responsive-button";
import Image from "next/image";

export const OrderAddress = ({ address }: { address: string }) => {
  const openMap = () => {
    window.open(
      `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`,
      "_blank"
    );
  };
  return (
    <div className="p-3 border  rounded-lg  space-y-1">
      <p className=" font-semibold">Доставка</p>
      <div className="flex justify-between items-center gap-3">
        <p
          onClick={openMap}
          className="text-wrap p-0 m-0 font-normal hover:cursor-pointer"
        >
          {address}
        </p>
        <ResponsiveButton
          icon={
            <div className="relative size-5">
              <Image
                src={"/icons/route.svg"}
                alt="icon"
                fill
                className="object-contain brightness-200"
              />
            </div>
          }
          text="Маршрут"
          onClick={openMap}
        />
      </div>
    </div>
  );
};
