import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface Props {
  productId?: number;
  name: string;
  className?: string;
  details?: string;
}

export const CartItemInfo: React.FC<Props> = ({
  productId,
  name,
  details,
  className,
}) => {
  return (
    <div className="w-10/12">
      <div
        className={cn(
          className,
          "flex items-center justify-between",
          className
        )}
      >
        {productId ? (
          <Link
            href={`/product/${productId}`}
            className="text-lg font-bold flex-1 leading-6 line-clamp-2"
          >
            {name}
          </Link>
        ) : (
          <h2 className="text-lg font-bold flex-1 leading-6 line-clamp-2">
            {name}
          </h2>
        )}
      </div>
      {details && <p className=" text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
