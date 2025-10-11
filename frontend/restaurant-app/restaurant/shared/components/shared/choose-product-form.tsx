"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Title } from "./title";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  onSubmit?: VoidFunction;
  price: number;
  loading?: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  onSubmit,
  className,
  price,
  loading,
}) => {
  return (
    <div className={cn(className, "flex flex-col lg:flex-row")}>
      {/* Изображение товара */}
      <div className="flex items-center justify-center relative w-full lg:w-auto lg:h-auto flex-1">
        <img
          src={imageUrl}
          alt={name}
          className="relative transition-all z-10 duration-300 max-w-full max-h-full object-contain lg:rounded-lg"
        />
      </div>

      {/* Информация о товаре */}
      <div className="w-full lg:w-[490px] bg-[#FCFCFC] p-7 flex flex-col justify-between">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1 text-center lg:text-left text-lg lg:text-xl"
        />
        {/* Описание товара (можно раскомментировать при необходимости) */}
        {/* <p className="text-gray-400 text-center lg:text-left text-sm lg:text-base">{textDetails}</p> */}

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 hover:bg-opacity-90 transition-colors duration-300"
        >
          В корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
