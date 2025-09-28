import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { Toaster } from "@/shared/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/shared/lib/auth-js/auth";

const inter = localFont({
  src: [
    {
      path: "/fonts/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Админ панель",
  description: "Панель управления",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={` ${inter.variable} antialiased min-h-screen `}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
