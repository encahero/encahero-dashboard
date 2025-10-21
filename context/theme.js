// app/context/ThemeContext.tsx
"use client";

import { ThemeProvider } from "next-themes";

export const CustomThemeProvider = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};
