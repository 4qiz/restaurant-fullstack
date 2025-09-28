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
import { MeasureUnit } from "@prisma/client";
import { unitTranslations } from "../helpers/unit-mapping";

export const SelectUnitFormItem = ({
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
      <FormLabel className="text-xs text-nowrap">Единицы измерения</FormLabel>
      <FormControl>
        <Select
          disabled={isPending}
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Выберите единицы измерения" />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            <SelectItem value={MeasureUnit.GRAM}>
              {unitTranslations.GRAM}
            </SelectItem>
            <SelectItem value={MeasureUnit.MILLILITERS}>
              {unitTranslations.MILLILITERS}
            </SelectItem>
            <SelectItem value={MeasureUnit.PIECES}>
              {unitTranslations.PIECES}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
