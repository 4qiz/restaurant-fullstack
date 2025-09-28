"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreateCategorySchema } from "../../schemas/create-category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryAction } from "../../actions/create-category-action";
import { toast } from "sonner";
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

export const CreateCategoryForm = ({
  closeModal,
  route,
}: {
  closeModal?: () => void;
  route?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof CreateCategorySchema>) => {
    startTransition(() => {
      createCategoryAction(values, route)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            closeModal?.();
          }
        })
        .catch(() => toast.error("Произошла ошибка"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название категории</FormLabel>
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

        {/* Save Button (Disabled unless form is dirty) */}
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          className="w-full md:w-auto"
        >
          Создать
        </Button>
      </form>
    </Form>
  );
};
