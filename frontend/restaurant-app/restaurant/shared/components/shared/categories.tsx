"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn(
        "hidden lg:inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
        className
      )}
    >
      {items.map(({ name, id }, i) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-2",
            activeCategoryId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
          key={i}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
