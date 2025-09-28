"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import {
  formProfileSchema,
  TFormProfileData,
} from "../modals/auth/forms/schemas";
import { Container } from "../container";
import { Title } from "../title";
import { FormInput } from "../form-components";
import { Button } from "../../ui/button";
import { updateUserInfo } from "@/actions/order_actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
    },
  });

  const onSubmit = async (data: TFormProfileData) => {
    try {
      await updateUserInfo(data.fullName);

      toast.error("Данные обновлены", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
    // Delete the "cartToken" cookie
    document.cookie =
      "cartToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <Container className="">
      <Title text="Личные данные" size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-full md:w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" readOnly />
          <FormInput name="fullName" label="Имя" required />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-6"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
