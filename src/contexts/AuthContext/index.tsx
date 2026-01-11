"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { url, endpoints } from "@/constants/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isCashRegisterOpen: boolean,
  handleCashRegisterOpen: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCashRegisterOpen, setIsCashRegisterOpen] = useState(false);
  const router = useRouter();

  async function loadUser() {
    try {
      const res = await fetch(`${url}${endpoints.auth.me}`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
      console.log("User loaded:", data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch(`${url}${endpoints.auth.logout}`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    loadUser();
  }, []);

  function handleCashRegisterOpen() {
    setIsCashRegisterOpen(!isCashRegisterOpen);
  }

  return (
    <AuthContext.Provider value={{ user, isCashRegisterOpen, loading, logout, handleCashRegisterOpen}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return ctx;
}
