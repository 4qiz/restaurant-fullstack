import { cn } from "@/shared/lib/utils";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <img
      className={cn("w-24 h-24 lg:w-[60px] lg:h-[60px] rounded-sm", className)}
      src={src}
      alt="img"
    />
  );
};
