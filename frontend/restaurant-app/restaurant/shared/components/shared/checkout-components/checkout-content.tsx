"use client";

import { CheckoutPriceBar } from "@/shared/components/shared/checkout-price-bar";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks/use-cart";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutCart } from "@/shared/components/shared/checkout-components/checkout-cart";
import { CheckoutPersonalData } from "@/shared/components/shared/checkout-components/checkout-personal-data";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/components/shared/checkout-components/schemas/checkout-form-schema";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { OrderType, PaymentType } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/actions/create-order";
import { SelectOrderType } from "./select-order-type";

export const CheckoutContent = () => {
  const [submitting, setSubmitting] = React.useState(false);

  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart(true);
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };
  const [priceWithDelivery, setPriceWithDelivery] = useState<number>(0);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      phone: "",
      address: "",
      comment: "",
      paymentType: PaymentType.OFFLINE,
      orderType: OrderType.DELIVERY,
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      form.setValue("firstName", data.fullName);
      form.setValue("email", data.email);
      form.setValue("phone", data.phoneNumber ?? "");
      form.setValue("address", data.address ?? "");
    }

    fetchUserInfo();
  }, [loading]);

  const [deliveryPrice, setDeliveryPrice] = useState<number>(0); // Use number instead of string

  useEffect(() => {
    async function fetchDeliveryPrice() {
      try {
        const response = await fetch("/api/checkout/delivery-price");
        if (!response.ok) throw new Error("Failed to fetch delivery price");

        const data = await response.json(); // Parse JSON response

        setDeliveryPrice(Number(data.price)); // Convert price to number
      } catch (error) {
        console.error("Error fetching delivery price:", error);
      }
    }

    fetchDeliveryPrice();
  }, []);

  useEffect(() => {
    if (deliveryPrice !== null) {
      setPriceWithDelivery(deliveryPrice + totalAmount);
    }
  }, [deliveryPrice, totalAmount]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const result = await createOrder(data);
      if (result && result.error) {
        toast.error(result.error, {
          icon: "❌",
        });
      } else if (result) {
        toast.success("Заказ успешно оформлен!", {
          icon: "✅",
        });

        if (result.paymentUrl) {
          location.href = result.paymentUrl;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при создании заказа", {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const orderType = form.watch("orderType");

  return (
    <Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      {items.length == 0 ? (
        <div className="flex flex-col items-center justify-center w-72 mx-auto">
          <Image
            src="/assets/images/empty-box.png"
            alt="Empty cart"
            width={120}
            height={120}
          />
          <Title
            size="sm"
            text="Корзина пустая"
            className="text-center font-bold my-2"
          />
          <p className="text-center text-neutral-500 mb-5">
            Добавьте хотя бы одно блюдо, чтобы совершить заказ
          </p>

          <a href="/">
            <Button className="w-56 h-12 text-base" size="lg">
              <ArrowLeft className="w-5 mr-2" />
              Вернуться назад
            </Button>
          </a>
        </div>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-x-10">
              {/* левая часть */}
              <div className="flex flex-col gap-10 flex-1 mb-10">
                <CheckoutCart
                  items={items}
                  onClickCountButton={onClickCountButton}
                  removeCartItem={removeCartItem}
                  loading={loading}
                />
                <CheckoutPersonalData totalAmount={totalAmount} />

                <SelectOrderType />
              </div>

              {/* правая часть */}
              <div className="w-full lg:max-w-[450px] pb-10">
                <CheckoutPriceBar
                  deliveryPrice={deliveryPrice}
                  priceWithDelivery={priceWithDelivery}
                  productsPrice={totalAmount}
                  loading={loading || submitting}
                  orderType={orderType}
                  paymentSelect={
                    <>
                      <span className="flex flex-1 text-lg text-neutral-600">
                        <Wallet className="mr-2 text-gray-400" />
                        Способ оплаты
                      </span>

                      <Controller
                        name="paymentType"
                        control={form.control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-row justify-evenly gap-2 mt-4"
                          >
                            <div className="flex-1">
                              <RadioGroupItem
                                value="offline"
                                id="offline"
                                className="hidden"
                              />
                              <button
                                type="button"
                                className={cn(
                                  "w-full px-4 py-2 rounded-lg border text-lg transition-all text-center",
                                  field.value === PaymentType.OFFLINE
                                    ? "ring-2 ring-ring  font-semibold  text-neutral-600"
                                    : "border-transparent bg-gray-200 text-neutral-600"
                                )}
                                onClick={() =>
                                  field.onChange(PaymentType.OFFLINE)
                                }
                              >
                                При получении
                              </button>
                            </div>
                            {/* <div className="flex-1">
                              <RadioGroupItem
                                value="online"
                                id="online"
                                className="hidden"
                              />
                              <button
                                type="button"
                                className={cn(
                                  "w-full px-4 py-2 rounded-lg border text-lg transition-all text-center",
                                  field.value === PaymentType.ONLINE
                                    ? "ring-2 ring-ring  font-semibold text-neutral-600"
                                    : "border-transparent bg-gray-200 text-neutral-600"
                                )}
                                onClick={() =>
                                  field.onChange(PaymentType.ONLINE)
                                }
                              >
                                Онлайн
                              </button>
                            </div> */}
                          </RadioGroup>
                        )}
                      />
                    </>
                  }
                />
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </Container>
  );
};
