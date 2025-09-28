"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

export const WeightFormItem = ({
  field,
  isPending,
}: {
  field: {
    value: number | undefined;
    onChange: (value: number | undefined) => void;
  };
  isPending: boolean;
}) => {
  return (
    <FormItem className="flex-grow">
      <FormLabel>Вес</FormLabel>
      <FormControl>
        <Input
          disabled={isPending}
          {...field}
          placeholder=""
          type="number"
          className="w-full "
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              field.onChange(1);
              return;
            }

            const numberValue = Number(value);
            if (numberValue < 0 || numberValue > 100000) {
              return;
            }

            field.onChange(numberValue);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
