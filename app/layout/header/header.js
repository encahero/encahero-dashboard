"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import Link from "next/link";

export default function Header() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleAuth = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow border-b">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600/75 dark:text-blue-400">
          Encahero
        </h1>
      </Link>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Button size="sm" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-gray-900 dark:text-white"
          onClick={handleAuth}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
