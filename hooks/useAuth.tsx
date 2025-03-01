import React, { createContext, useState, useContext, useEffect } from "react";
import { login, logout } from "@/services/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  userName: string | null;
  loginUser: (name: string, email: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const checkAuthentication = () => {
      if (userName) {
        setIsAuthenticated(true);
        setUserName(userName);
      } else {
        setIsAuthenticated(false);
        setUserName(null);
      }
    };
    checkAuthentication();
  }, []);

  const loginUser = async (name: string, email: string) => {
    try {
      const response = await login({ name, email });
      if (response?.success) {
        setIsAuthenticated(true);
        setUserName(name);
        localStorage.setItem("userName", name);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUserName(null);
      localStorage.removeItem("userName");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userName, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
