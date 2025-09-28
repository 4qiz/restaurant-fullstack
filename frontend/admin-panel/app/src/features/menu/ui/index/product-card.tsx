import { cn } from "@/shared/lib/css";
import { CardDescription } from "@/shared/ui/card";
import { Title } from "@/shared/ui/title";
import { Ingredient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  price: number;
  href: string;
  imageUrl?: string;
  className?: string;
  description?: string;
  ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  name,
  href,
  price,
  imageUrl,
  className,
  description,
}) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          " flex flex-col justify-between border rounded-lg ",
          className
        )}
      >
        <div className="flex flex-row gap-3 w-full">
          {/* Image container */}
          <div className=" self-center w-20 h-20  min-w-20 min-h-20 md:min-w-40 md:min-h-40">
            {imageUrl ? (
              <Image
                className="rounded-lg "
                src={imageUrl}
                alt={name}
                width={160}
                height={160}
              />
            ) : (
              <div
                className="flex items-center justify-center 
                w-full h-full
                text-muted-foreground bg-muted 
                rounded-lg"
              >
                <p className="text-center text-xs md:text-sm">
                  Нет изображения
                </p>
              </div>
            )}
          </div>

          <div className="w-full overflow-hidden">
            {/* Product name */}
            <Title
              text={name}
              className="line-clamp-2 font-semibold text-base md:text-lg hover:cursor-pointer"
            />
            <CardDescription className=" line-clamp-1 md:line-clamp-2">
              {description}
            </CardDescription>
            <p className="font-light text-lg text-nowrap ">
              {price && `${price} ₽`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
