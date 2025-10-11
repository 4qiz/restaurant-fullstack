import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";
import { Cookie } from "@/shared/components/shared/cookie";

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Cookie />
      <Suspense>
        <div className="p-3 xl:p-0">
          <Header />
        </div>
      </Suspense>

      {children}
      {modal}
    </main>
  );
}
