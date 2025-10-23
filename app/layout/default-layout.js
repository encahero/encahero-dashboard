"use client";
import { useState } from "react";
import LoginForm from "@/components/login-form";
import Header from "./header";
import SideBar from "./sidebar";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useBreakpoint from "@/hooks/use-breakpoint";

export default function DefaultLayout({ children }) {
  const { loggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobile = ["xs", "sm", "md"].includes(breakpoint);

  if (loggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-t-[var(--primary)] border-gray-300 rounded-full animate-spin"></div>
          {/* Text */}
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }
  if (!loggedIn) return <LoginForm />;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="z-10">
        <Header />
      </div>

      <div className="flex z-1 flex-1 h-full relative">
        {/* Sidebar */}
        <aside
          className={`
          bg-gray-100 dark:bg-gray-800   overflow-hidden
          ${
            isMobile
              ? `fixed inset-y-0 left-0 w-64 transition-all  duration-300 transform z-5 border-r pt-20 ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : `transition-width duration-300 ${
                  isSidebarOpen ? "w-64 border-r p-4" : "w-0"
                }`
          }
        `}
        >
          <SideBar onItemClick={() => setIsSidebarOpen(false)} />
        </aside>
        <Button
          size="sm"
          variant="outline"
          className={`absolute z-50 top-4 ${
            isSidebarOpen ? "left-52" : "left-4"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
        {/* Main content */}
        <main className="flex-1 h-full relative overflow-auto">
          {/* Toggle button */}

          {children}
        </main>
      </div>
    </div>
  );
}
