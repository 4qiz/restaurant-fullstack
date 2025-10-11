"use client";

import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
  classname?: string;
}

export const SearchInput: React.FC<Props> = ({ classname }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const products = await Api.products.search(searchQuery);
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    },
    200,
    [searchQuery]
  );

  const onClickItem = () => {
    //setProducts([]);
    setSearchQuery("");
    setFocused(false);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/30 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          classname
        )}
      >
        <Search
          onClick={() => setFocused(true)}
          className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
        />

        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти блюда..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer"
                href={`/product/${product.id}`}
                key={product.id}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt=""
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
