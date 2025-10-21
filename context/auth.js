"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      const storedUser = await storage.getUser();
      const accessToken = await storage.getAccessToken();
      if (storedUser && accessToken) {
        setUser(storedUser);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    };
    loadAuth();
  }, []);

  const login = async (accessToken, refreshToken, userData) => {
    await storage.setAccessToken(accessToken);
    await storage.setRefreshToken(refreshToken);
    await storage.setUser(userData);

    setUser(userData);
    setLoggedIn(true);
  };

  const logout = async () => {
    await storage.clearAllTokens();
    await storage.clearUser();

    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
