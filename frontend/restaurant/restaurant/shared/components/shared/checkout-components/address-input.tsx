"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { cn } from "@/shared/lib/utils";
import { Input } from "../../ui/input";
import { motion, AnimatePresence } from "framer-motion"; // <<< добавили

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  token: string;
}

export const AddressInput = ({ value, onChange, token }: AddressInputProps) => {
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!query) return;
      try {
        const response = await axios.post(
          "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
          { query, count: 3 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setSuggestions(response.data.suggestions || []);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
      }
    },
    [token]
  );

  const debouncedFetch = useMemo(
    () => debounce((query: string) => fetchSuggestions(query), 300),
    [fetchSuggestions]
  );

  useEffect(() => {
    if (value.length > 3 && isFocused) {
      debouncedFetch(value);
    } else if (!value.length) {
      setSuggestions([]);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [value, debouncedFetch, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        onChange(suggestions[activeIndex].value);
        setSuggestions([]);
      }
    }

    if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder="Введите адрес"
        className="w-full h-12 text-md"
      />
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
          >
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onChange(suggestion.value);
                  setSuggestions([]);
                  setIsFocused(false);
                }}
                className={cn(
                  "p-3 text-md cursor-pointer transition-colors",
                  idx === activeIndex ? "bg-muted" : "hover:bg-muted"
                )}
              >
                {suggestion.value}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
