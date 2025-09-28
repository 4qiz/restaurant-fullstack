"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductItem } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EditProductItemSchema } from "../../schemas/edit-product-item-schema";
import { toast } from "sonner";
import { editProductItem } from "../../actions/edit-product-item";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { removeProductItem } from "../../actions/remove-product-item";
import { InStockSwitch } from "../in-stock-switch";
import { SelectSizeFormItem } from "../select-size-form-item";
import { SelectUnitFormItem } from "../select-unit-form-item";
import { WeightFormItem } from "../weight-form-item";
import { DeleteConfirmationButton } from "@/shared/components/dialogs/delete-confirmation-button";

export const ProductItemCard = ({
  productItem,
}: {
  productItem: ProductItem;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditProductItemSchema>>({
    resolver: zodResolver(EditProductItemSchema),
    defaultValues: {
      productItemSize: productItem.productItemSize,
      measureUnit: productItem.measureUnit,
      isActive: productItem.isActive,
      price: productItem.price,
      weight: productItem.weight || undefined,
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof EditProductItemSchema>) => {
    startTransition(() => {
      editProductItem(productItem.id, values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
        })
        .catch(() => toast.error("Произошла ошибка"));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      removeProductItem(productItem.id)
        .then((data) => {
          if (data.success) {
            toast.success("Удалено");
          } else if (data.error) {
            toast.error(data.error);
          }
        })
        .catch(() => toast.error("Невозможно удалить размер"));
    });
  };

  return (
    <Card>
      <CardContent className="pt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

            <div className="flex flex-row gap-3 items-center justify-between">
              <Button
                disabled={!isDirty || isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
              >
                Сохранить
              </Button>
              <DeleteConfirmationButton disabled={false} onDelete={onDelete} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
