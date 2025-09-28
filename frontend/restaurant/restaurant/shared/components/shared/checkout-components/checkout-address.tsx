"use client";

import { Controller, useFormContext } from "react-hook-form";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../form-components/error-text";
import { FormInput } from "../form-components";
import { AddressInput } from "./address-input";

export const CheckoutAddress = () => {
  const token = process.env.NEXT_PUBLIC_DADATA_TOKEN;
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" contentClassName="lg:p-8">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <AddressInput
                token={token || ""}
                onChange={field.onChange}
                value={field.value}
              />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </div>
          )}
        />
        <FormInput
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
