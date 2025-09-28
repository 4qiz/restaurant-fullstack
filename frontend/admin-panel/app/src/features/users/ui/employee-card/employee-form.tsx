"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EmployeeCardSchema } from "../../schemas/employee-card-schema";
import { EmployeeUser, UserRole } from "@prisma/client";
import { updateEmployee } from "../../actions/update-employee";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { FormError } from "@/shared/components/form-error";
import { FormSuccess } from "@/shared/components/form-success";
import { Button } from "@/shared/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { RoleGate } from "@/shared/components/auth/role-gate";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";

export const EmployeeForm = ({
  employeeUser,
}: {
  employeeUser: EmployeeUser;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const currentUser = useCurrentUser();

  const form = useForm<z.infer<typeof EmployeeCardSchema>>({
    resolver: zodResolver(EmployeeCardSchema),
    defaultValues: {
      name: employeeUser?.name || undefined, // not ""
      email: employeeUser?.email || undefined,
      role: employeeUser?.role || undefined,
      lastEnterDate: employeeUser?.updatedAt || undefined,
      password: "",
      newPassword: "",
      isActive: employeeUser?.isActive || undefined,
    },
    mode: "onChange", // Ensure form updates on change
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof EmployeeCardSchema>) => {
    startTransition(() => {
      updateEmployee(employeeUser.id, values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setSuccess(undefined);
          }
          if (data.success) {
            setSuccess(data.success);
            setError(undefined);
            //reset();
          }
        })
        .catch(() => setError("Произошла ошибка"));
    });
  };

  return (
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

          {/* select role */}
          <RoleGate allowedRole="ADMIN">
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
          </RoleGate>

          {/* isActive switch*/}
          {currentUser?.id !== employeeUser.id && (
            <RoleGate allowedRole="ADMIN">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Активен</FormLabel>
                      <FormDescription>
                        Если учётная запись не активирована, пользователь не
                        сможет войти в аккаунт
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </RoleGate>
          )}

          {/* password accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="rounded-lg border px-3 shadow-sm"
            >
              <AccordionTrigger>Сменить пароль</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 pl-3">
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Старый пароль</FormLabel>
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
                {/* new password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Новый пароль</FormLabel>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Save Button (Disabled unless form is dirty) */}
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          className="w-full md:w-auto"
        >
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
