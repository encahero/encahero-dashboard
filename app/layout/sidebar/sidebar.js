"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại để highlight active menu

  const menuItems = [
    { name: "Category", href: "/category" },
    { name: "Collection", href: "/collection" },
    { name: "Card", href: "/card" },
    { name: "User", href: "/user" },
    { name: "Feedback", href: "/feedback" },
  ];

  return (
    <nav className="flex flex-col space-y-2 h-screen p-2 mt-12">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost" // luôn dùng ghost, còn màu chỉnh bằng class
              className={`w-full text-left rounded-md ${
                isActive
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
