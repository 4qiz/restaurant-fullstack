import { routes } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 gap-3">
        <div className="max-w-lg">
          <Image
            src="/illustrations/sad-cat-no-bg.png"
            alt="not found"
            width={500}
            height={500}
          />
        </div>
        <div className="max-w-md ">
          <div className="text-5xl font-dark font-bold pb-3">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal pb-6">
            Страница не найдена
          </p>

          <Link href={routes.menu()}>
            <Button>Назад</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
