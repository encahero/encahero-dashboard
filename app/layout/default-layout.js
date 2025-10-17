"use client";
import { useState } from "react";
import LoginForm from "@/components/login-form";
import Header from "./header";
import SideBar from "./sidebar";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function DefaultLayout({ children }) {
  const { loggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!loggedIn) return <LoginForm />;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <aside
          className={` bg-gray-100 dark:bg-gray-800 transition-all duration-300 overflow-hidden ${
            isSidebarOpen ? "w-64 p-4 border-r min-w-64" : "w-0 min-w-0"
          }`}
        >
          <SideBar />
        </aside>

        {/* Main content */}
        <main className="flex-1 relative">
          {/* Toggle button */}
          <Button
            size="sm"
            variant="outline"
            className={`absolute z-10 ${
              isSidebarOpen ? "top-4 -left-12" : "top-4 left-4"
            }`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>

          {children}
        </main>
      </div>
    </div>
  );
}
