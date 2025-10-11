import Link from "next/link";

const menuItems = [
  { name: "Профиль", path: "/profile" },
  { name: "Заказы", path: "/orders" },
];

export const ProfileSidebar = () => {
  return (
    <nav className="bg-white shadow-md rounded-lg p-3 flex gap-3 justify-center md:justify-start md:flex-col md:w-56 flex-shrink-0">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition w-full text-center md:text-left"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
