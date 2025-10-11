"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRegisterData, formRegisterSchema } from "./schemas";
import toast from "react-hot-toast";
import { FormInput } from "../../../form-components";
import { Button } from "@/shared/components/ui/button";
import { registerUser } from "@/actions/order_actions";
import { Title } from "@/shared/components/shared/title";

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterData) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error(
        "Регистрация успешна. Настройте отправку емаил для подтверждения почты.",
        {
          icon: "✅",
        }
      );

      onClose?.();
    } catch (error) {
      return toast.error("Неверный E-Mail или пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold" />
          </div>
        </div>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
