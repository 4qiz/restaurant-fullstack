"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { ProductItemSize } from "@prisma/client";
import { sizeTranslations } from "../helpers/size-mapping";

export const SelectSizeFormItem = ({
  field,
  isPending,
}: {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  isPending: boolean;
}) => {
  return (
    <FormItem>
      <FormLabel>Размер порции</FormLabel>
      <FormControl>
        <Select
          disabled={isPending}
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Выберите размер" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value={ProductItemSize.SMALL}>
              {sizeTranslations.SMALL}
            </SelectItem>
            <SelectItem value={ProductItemSize.MEDIUM}>
              {sizeTranslations.MEDIUM}
            </SelectItem>
            <SelectItem value={ProductItemSize.BIG}>
              {sizeTranslations.BIG}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
