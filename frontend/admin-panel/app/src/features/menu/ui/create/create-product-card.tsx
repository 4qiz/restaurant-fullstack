"use client";

import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useEffect, useState, useTransition } from "react";
import { Category, MeasureUnit, ProductItemSize } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductSchema } from "../../schemas/create-product-schema";
import { addProductAction } from "../../actions/add-product-action";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { ResponsiveModal } from "@/shared/components/responsive-modal";
import { UploadImageForm } from "@/shared/components/images/upload-image-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { CreateCategoryForm } from "@/features/categories/ui/create/create-category-form";
import { routes } from "@/shared/constants/routes";
import { InStockSwitch } from "../in-stock-switch";
import { SelectSizeFormItem } from "../select-size-form-item";
import { SelectUnitFormItem } from "../select-unit-form-item";
import { SelectCategoryFormItem } from "../select-category-form-item";
import { WeightFormItem } from "../weight-form-item";

export const CreateProductCard = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "", // not ""
      description: undefined,
      categoryId: undefined,
      imageUrl: undefined,
      productItemSize: ProductItemSize.MEDIUM,
      measureUnit: MeasureUnit.GRAM,
      isActive: true,
      price: 0,
      weight: 0,
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof CreateProductSchema>) => {
    startTransition(() => {
      addProductAction(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
        })
        .catch((error) => {
          if (
            !(error instanceof Error) ||
            !error.message.includes("NEXT_REDIRECT")
          ) {
            toast.error("Произошла ошибка");
          }
        });
    });
  };

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    form.setValue("imageUrl", imageUrl); // Обновляем поле imageUrl в форме при изменении состояния
  }, [imageUrl, form]);

  const onSave = async (publicUrl: string) => {
    setImageUrl(publicUrl);
    setIsImageOpen(false);
  };

  return (
    <Form {...form}>
      {/* form */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* cards wrapper */}
        <div className="grid flex-col gap-3">
          <Card>
            <CardHeader className="">
              <CardTitle>Добавление блюда</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-center items-center gap-6 ">
              {/* image */}
              <div className=" h-fit flex flex-col">
                <div className="rounded-lg overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="product"
                      width={300}
                      height={300}
                      className="object-contain w-full"
                    />
                  ) : (
                    <div className="w-[300px] h-[300px] flex items-center justify-center bg-muted text-muted-foreground text-sm">
                      Загрузите изображение
                    </div>
                  )}
                </div>
                <Button variant={"link"} onClick={() => setIsImageOpen(true)}>
                  Загрузить
                </Button>
                <ResponsiveModal
                  title="Выберите изображение"
                  isOpen={isImageOpen}
                  onOpenChange={() => {
                    setIsImageOpen(false);
                  }}
                  className="touch-none max-w-screen-lg  flex flex-col justify-center p-3 md:p-6"
                >
                  <div className="w-full " data-vaul-no-drag>
                    <UploadImageForm
                      width={1000}
                      height={1000}
                      onSave={onSave}
                    />
                  </div>
                </ResponsiveModal>
              </div>
              <div className="flex flex-col gap-6 md:gap-3 w-full ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Наименование<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder=""
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          {...field}
                          placeholder=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* select category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <SelectCategoryFormItem
                      categories={categories}
                      field={field}
                      isPending={isPending}
                      setIsCategoryOpen={setIsCategoryOpen}
                    />
                  )}
                />
              </div>
            </CardContent>
            <ResponsiveModal
              title="Добавить категорию"
              isOpen={isCategoryOpen}
              onOpenChange={() => {
                setIsCategoryOpen(false);
              }}
            >
              <div className="p-3">
                <CreateCategoryForm
                  route={routes.menuCreate()}
                  closeModal={() => setIsCategoryOpen(false)}
                />
              </div>
            </ResponsiveModal>
          </Card>
          <Card>
            <CardHeader className="pb-0"></CardHeader>
            <CardContent className="space-y-3">
              {/* product item */}
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
                className="w-full"
                type="submit"
                disabled={!isDirty || isPending}
              >
                Cохранить
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
