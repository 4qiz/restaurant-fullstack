"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { CreateProductItemSchema } from "../../schemas/create-product-item-schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasureUnit, ProductItemSize } from "@prisma/client";
import { toast } from "sonner";
import { addProductItem } from "../../actions/add-product-item";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { InStockSwitch } from "../in-stock-switch";
import { SelectSizeFormItem } from "../select-size-form-item";
import { SelectUnitFormItem } from "../select-unit-form-item";
import { WeightFormItem } from "../weight-form-item";

export const CreateProductItemForm = ({ productId }: { productId: number }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateProductItemSchema>>({
    resolver: zodResolver(CreateProductItemSchema),
    defaultValues: {
      productItemSize: ProductItemSize.MEDIUM,
      measureUnit: MeasureUnit.GRAM,
      isActive: true,
      price: 0,
      weight: 0,
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof CreateProductItemSchema>) => {
    startTransition(() => {
      addProductItem(productId, values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Произошла ошибка"));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 md:gap-3 w-full p-3"
      >
        {/* select size */}
        <FormField
          control={form.control}
          name="productItemSize"
          render={({ field }) => (
            <SelectSizeFormItem field={field} isPending={isPending} />
          )}
        />

        <div className="flex flex-row w-full gap-3">
          {/* Вес */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <WeightFormItem field={field} isPending={isPending} />
            )}
          />

          {/* select unit */}
          <FormField
            control={form.control}
            name="measureUnit"
            render={({ field }) => (
              <SelectUnitFormItem field={field} isPending={isPending} />
            )}
          />
        </div>

        {/* Стоимость */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder=""
                  type="number"
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                      field.onChange(value ? Number(value) : undefined);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Активен */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <InStockSwitch field={field} isPending={isPending} />
          )}
        />

        <Button
          disabled={!isDirty || isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
