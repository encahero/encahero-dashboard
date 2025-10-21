"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookText, Users, Layers, Folder, MessageSquare } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Card", href: "/card", icon: BookText },
    { name: "User", href: "/user", icon: Users },
    { name: "Category", href: "/category", icon: Layers },
    { name: "Collection", href: "/collection", icon: Folder },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
  ];

  return (
    <nav className="flex flex-col space-y-2 h-screen p-2 mt-12">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={`w-full text-left justify-start gap-2 rounded-md ${
                isActive
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
