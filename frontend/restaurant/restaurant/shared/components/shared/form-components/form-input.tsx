"use client";

import React from "react";
import { RequiredSymbol } from "./required-symbol";
import { Input } from "../../ui/input";
import { ErrorText } from "./error-text";
import { ClearButton } from "./clear-button";
import { useFormContext } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  readOnly?: boolean;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  readOnly,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const errotText = errors?.[name]?.message as string;

  const text = watch(name);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          className={cn(
            "h-12 text-md ",
            readOnly && "bg-gray-100 cursor-not-allowed text-gray-500 "
          )}
          readOnly={readOnly}
          {...register(name)}
          {...props}
        />

        {Boolean(text) && !readOnly && <ClearButton onClick={onClickClear} />}
      </div>

      {errotText && <ErrorText className="pl-3 mt-1" text={errotText} />}
    </div>
  );
};
