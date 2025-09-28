"use client";

import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Button variant="link" className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
