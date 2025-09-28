"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Switch } from "@/shared/ui/switch";

export const InStockSwitch = ({
  field,
  isPending,
}: {
  field: {
    value: boolean;
    onChange: (value: boolean) => void;
  };
  isPending: boolean;
}) => {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border py-1 px-3 shadow-sm">
      <div className="flex gap-3 items-center">
        <FormLabel>{field.value ? "В наличии" : "Нет в наличии"}</FormLabel>
        <FormDescription className="text-xs md:text-sm">
          Только товары в наличии доступны для заказа
        </FormDescription>
      </div>
      <div>
        <FormControl>
          <Switch
            disabled={isPending}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-destructive"
          />
        </FormControl>
      </div>
    </FormItem>
  );
};
