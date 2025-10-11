"use client";

import React from "react";

import { FilterCheckbox, FilterChecboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selectedValues?: Set<string>;
  loading?: boolean;
  name?: string;
  onClickCheckbox?: (id: string) => void;
  enableSearch?: boolean;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  selectedValues,
  onClickCheckbox,
  loading,
  name,
  enableSearch = false,
}) => {
  const [showAll, setShowAll] = React.useState(enableSearch);

  const [searchValue, setSearchValue] = React.useState("");
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        <Skeleton className=" h-10 mb-4 rounded-sm" />
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  // const list = showAll
  //   ? items.filter((item) =>
  //       item.text.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   : defaultItems.slice(0, limit);

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : items
        .filter((item) =>
          item.text.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-72 pr-2 mb-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            endAdornment={item.endAdornment}
            value={item.value}
            text={item.text}
            key={String(item.value)}
            checked={selectedValues?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-2"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
