"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { AuthHeader } from "./auth-header";
import { BackButton } from "./back-button";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}) => {
  return (
    <Card className="w-full md:w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent className="pb-3">{children}</CardContent>

      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
