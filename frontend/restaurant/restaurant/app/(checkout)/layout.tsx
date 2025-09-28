import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import { Container } from "@/shared/components/shared/container";
import { Cookie } from "@/shared/components/shared/cookie";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-background-secondary">
      <Container className="p-3">
        <Header
          hasSearch={false}
          hasCartButton={false}
          className="border-gray-200"
        />
        {children}
      </Container>
      <Cookie />
    </main>
  );
}
