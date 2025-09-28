"use client";

import { Button } from "@/shared/ui/button";
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
import { Category } from "@prisma/client";

export const SelectCategoryFormItem = ({
  isPending,
  field,
  categories,
  setIsCategoryOpen,
}: {
  isPending: boolean;
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  categories: Category[];
  setIsCategoryOpen: (open: boolean) => void;
}) => {
  return (
    <FormItem>
      <FormLabel>
        Категория<span className="text-destructive">* </span>
        <Button
          onClick={() => {
            setIsCategoryOpen(true);
          }}
          className="p-0  h-fit text-sm text-muted-foreground cursor-pointer"
          variant={"link"}
          type="button"
        >
          Нет нужной категории? Создать
        </Button>
      </FormLabel>
      <Select
        disabled={isPending}
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
        </FormControl>
        {/* content */}
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
