"use client";

import { useMenuFilters } from "@/features/menu/hooks/use-menu-filters";
import { useQueryFilters } from "@/features/menu/hooks/use-query-filters";
import { debounce } from "lodash";
import { Input } from "@/shared/ui/input";
import { RangeSlider } from "@/shared/ui/range-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Category } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Filter, X } from "lucide-react";
import { cn } from "@/shared/lib/css";

export const MenuFilters = ({
  maxPrice,
  categories,
}: {
  maxPrice: number;
  categories: Category[];
}) => {
  const filters = useMenuFilters();
  useQueryFilters(filters);
  const updatePrices = useCallback(
    (prices: number[]) => {
      filters.setPrices("priceFrom", prices[0]);
      filters.setPrices("priceTo", prices[1]);
    },
    [filters]
  );

  const debouncedUpdatePrices = useMemo(
    () => debounce(updatePrices, 300),
    [updatePrices]
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Input
        placeholder="Поиск..."
        value={filters.name}
        onChange={(e) => filters.setName(e.target.value)}
        className="w-full mb-3"
      />

      <div className="md:w-96 rounded-lg border p-3 ">
        {/* заголовок ФИЛЬТРЫ */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className=" font-semibold">Фильтры</p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-100",
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className=" px-3 mt-3 ">
            <div className="mb-3">
              <p className=" mb-2">Категория</p>
              <Select
                onValueChange={filters.setCategoryId}
                defaultValue={"all"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem key={0} value={"all"}>
                    Все
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pb-3">
              <p className="mb-2">Цена от и до:</p>
              <div className="flex gap-3 mb-6 ">
                <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={maxPrice}
                  value={String(filters.prices.priceFrom)}
                  onChange={(e) =>
                    filters.setPrices("priceFrom", Number(e.target.value))
                  }
                  className="w-1/2"
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
                  className="w-1/2"
                />
              </div>
              <div className="px-5">
                <RangeSlider
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={[
                    filters.prices.priceFrom || 0,
                    filters.prices.priceTo || maxPrice,
                  ]}
                  onValueChange={debouncedUpdatePrices}
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full "
              onClick={() => filters.reset()}
            >
              <X />
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
