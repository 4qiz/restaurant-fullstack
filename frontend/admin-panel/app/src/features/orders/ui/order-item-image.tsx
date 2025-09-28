import { cn } from "@/shared/lib/css";

interface Props {
  src: string;
  className?: string;
}

export const OrderItemImage: React.FC<Props> = ({ src, className }) => {
  return (
    <img
      className={cn("w-24 h-24 lg:w-[60px] lg:h-[60px] rounded-sm", className)}
      src={src}
      alt="img"
    />
  );
};
