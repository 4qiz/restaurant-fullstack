"use client";
import { InfoBlock } from "@/shared/components/shared/info-block";
import { signOut } from "next-auth/react";

export default function UnauthorizedPage() {
  signOut({
    redirect: true,
    callbackUrl: "/",
  });
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
