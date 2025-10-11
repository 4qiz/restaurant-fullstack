"use client";

import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Title } from "./title";
import { RangeSlider } from "../ui/range-slider";
import { useFilters } from "@/shared/hooks/use-filters";
import { useQueryFilters } from "@/shared/hooks/use-query-filters";
import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  maxPrice: number;
  categories: Category[];
  className?: string;
}

export const Filters: React.FC<Props> = ({
  className,
  categories,
  maxPrice,
}) => {
  // const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  // const ingredientsItems = ingredients.map((i) => ({
  //   value: String(i.id),
  //   text: i.name,
  // }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />

      {/*верхние чекбоксы*/}
      {/* <CheckboxFiltersGroup
        title="Тип теста"
        name="types"
        className="mb-5"
        onClickCheckbox={filters.setTypes}
        selectedValues={filters.types}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        selectedValues={filters.sizes}
      /> */}

      <div className="pb-7">
        <p className="font-bold mb-2">Категория</p>
        <Select onValueChange={filters.setCategoryId} defaultValue={"all"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem key={0} value={"all"}>
              Все
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/*Цена*/}
      <div className="mt-0 pb-7">
        <p className="font-bold mb-3">Цена</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={maxPrice}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={maxPrice}
            placeholder={String(maxPrice)}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={maxPrice}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || maxPrice,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      {/*Ингридиенты*/}
      {/* <CheckboxFiltersGroup
        title="Ингредиенты:"
        className="mt-5"
        limit={6}
        defaultItems={ingredientsItems.slice(0, 6)}
        items={ingredientsItems}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selectedValues={filters.selectedIngredients}
        name="ingredients"
        enableSearch={false}
      /> */}
    </div>
  );
};
