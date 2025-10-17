// app/context/AuthContext.tsx
"use client";
const AuthContext = createContext();
import { createContext, useContext, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
