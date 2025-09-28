"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/shared/schemas/schemas";
import { login } from "../actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { AuthCardWrapper } from "../ui/auth-card-wrapper";
import { FormError } from "../../../shared/components/form-error";
import { FormSuccess } from "../../../shared/components/form-success";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    // сдесь можно с логином и паролем делать всё что захочешь
    // values: { email: string; password: string; }

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error);
          if (data?.success) {
            window.location.reload(); //cringe reload to update session data
          }
        })
        .catch((error: Error) => {
          if (!error.message.includes("NEXT_REDIRECT"))
            setError("Не удалось войти");
        });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Вход"
      headerDescription="Данные для входа получите у администратора"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>
            Войти
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};
