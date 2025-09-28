import { Stories } from "@/features/stories/ui/index/stories";
import { StoriesList } from "@/features/stories/ui/index/stories-list";
import { routes } from "@/shared/constants/routes";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ResponsiveButton } from "@/shared/ui/responsive-button";
import { UserRole } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  return (
    <>
      {/* Предпросмотр */}
      <Card className="">
        <CardHeader>
          <CardTitle>Предпросмотр</CardTitle>
        </CardHeader>
        <CardContent>
          <Stories />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {/* <StoriesList /> */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between ">
            Все баннеры
            <Link href={routes.storiesCreate()}>
              <ResponsiveButton text="Добавить баннер" icon={<Plus />} />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StoriesList />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default Page;
