"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  value?: string;
  token: string;
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ token, value, onChange }) => {
  return (
    <AddressSuggestions
      token={token}
      onChange={(data) => onChange?.(data?.value)}
      defaultQuery={value}
      count={4}
      minChars={4}
      inputProps={{ placeholder: "Адрес доставки" }}
    />
  );
};
