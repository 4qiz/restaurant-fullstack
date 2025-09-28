import { MouseEventHandler } from "react";
import { Button } from "./button";

export const ResponsiveButton = ({
  icon,
  text,
  disabled = false,
  onClick,
  variant = "default",
}: {
  text: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}) => {
  return (
    <>
      {/* large */}
      <Button
        onClick={onClick}
        disabled={disabled}
        className="hidden md:flex"
        variant={variant}
      >
        {icon}
        {text}
      </Button>

      {/* small */}
      <Button
        onClick={onClick}
        className=" md:hidden flex-shrink-0"
        disabled={disabled}
        size={"icon"}
        variant={variant}
      >
        {icon}
      </Button>
    </>
  );
};
