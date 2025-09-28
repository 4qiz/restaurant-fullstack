"use client";

import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/shared/schemas/schemas";
import { newPassword } from "@/actions/new-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Eye, EyeOff } from "lucide-react";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isSaved, setIsSaved] = useState(false);

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    // сдесь можно с логином и паролем делать всё что захочешь
    // values: { email: string; }

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        if (data?.success) {
          setSuccess(data?.success);
          setIsSaved(true);
        }
      });
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <CardWrapper
      headerLabel="Восстановление пароля"
      backButtonLabel="На главную"
      backButtonHref={"/"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* новый пароль */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="*****"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* повтор новый пароль */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="*****"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error ?? ""} />
          <FormSuccess message={success ?? ""} />

          {!isSaved && (
            <Button type="submit" className="w-full" disabled={isPending}>
              Изменить пароль
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
