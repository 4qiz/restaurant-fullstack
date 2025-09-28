"use client";

import { UploadImageForm } from "@/shared/components/images/upload-image-form";
import { ResponsiveModal } from "@/shared/components/responsive-modal";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Category, Product } from "@prisma/client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EditProductSchema } from "../../schemas/edit-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProduct } from "../../actions/edit-product";
import { toast } from "sonner";
import { editProductImage } from "../../actions/edit-product-image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { CreateCategoryForm } from "@/features/categories/ui/create/create-category-form";
import { routes } from "@/shared/constants/routes";
import { SelectCategoryFormItem } from "../select-category-form-item";

export const EditProductCard = ({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditProductSchema>>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      name: product.name, // not ""
      description: product?.description || undefined,
      categoryId: product.categoryId.toString(),
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof EditProductSchema>) => {
    startTransition(() => {
      editProduct(product.id, values)
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

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onSave = async (publicUrl: string) => {
    editProductImage(product.id, publicUrl)
      .then((data) => {
        if (data.error) {
          toast.error("Ошибка при загрузке изображения");
        }
        setIsImageOpen(false);
      })
      .catch(() => toast.error("Произошла ошибка"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Блюдо</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-center items-center  gap-6 ">
        {/* image */}
        <div className=" h-fit  flex flex-col  ">
          <div className="rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
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
              <UploadImageForm width={1000} height={1000} onSave={onSave} />
            </div>
          </ResponsiveModal>
        </div>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:gap-3 w-full "
          >
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
                    <Textarea disabled={isPending} {...field} placeholder="" />
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

            <Button
              className="w-full"
              type="submit"
              disabled={!isDirty || isPending}
            >
              Cохранить
            </Button>
          </form>
        </Form>
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
            route={routes.menuId(product.id)}
            closeModal={() => setIsCategoryOpen(false)}
          />
        </div>
      </ResponsiveModal>
    </Card>
  );
};
