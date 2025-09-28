import { ProfileSidebar } from "@/shared/components/profile/layout/profile-sidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="mx-auto max-w-[1280px] w-full flex flex-col md:flex-row gap-6 py-4">
        {/* Меню: сверху на мобилках, слева на ПК */}
        <ProfileSidebar />
        {/* Основной контент */}
        <main className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
