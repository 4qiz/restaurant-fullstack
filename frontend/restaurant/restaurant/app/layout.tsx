import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ресто",
  description: "Доставка еды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" data-rh="true" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
