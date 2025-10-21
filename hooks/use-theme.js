// app/hooks/useTheme.ts
"use client";

import { useTheme as nextUseTheme } from "next-themes";
import { useCallback } from "react";

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = nextUseTheme();

  const toggleTheme = useCallback(() => {
    if (!theme) return;

    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else if (theme === "system") {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    }
  }, [theme, setTheme, resolvedTheme]);

  return { theme, resolvedTheme, toggleTheme };
};
