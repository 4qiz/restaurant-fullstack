"use client";

import { FormError } from "@/shared/components/form-error";
import { FormSuccess } from "@/shared/components/form-success";
import { RegisterSchema } from "@/shared/schemas/schemas";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { register } from "../../actions/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    // сдесь можно с логином и паролем делать всё что захочешь
    // values: { email: string; password: string; }

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        //setSuccess(data.success);
      });
    });
  };

  return (
    <Card className="w-full md:w-[500px]">
      <CardHeader>
        <CardTitle>Регистрация нового сотрудника</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
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

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="email@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="*****"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* select role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                    </FormControl>
                    {/* content */}
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>
                        Администратор
                      </SelectItem>
                      <SelectItem value={UserRole.DELIVERY}>
                        Доставка
                      </SelectItem>
                      <SelectItem value={UserRole.MANAGER}>Менеджер</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error ?? ""} />
            <FormSuccess message={success ?? ""} />

            <Button type="submit" className="w-full" disabled={isPending}>
              Зарегистрировать
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
