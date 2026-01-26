"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { url, endpoints } from "@/constants/api";
import { error } from "console";

type User = {
  id: number;
  name: string;
  email: string;
  role: string | null;
  avatar: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isCashRegisterOpen: boolean;
  handleCashRegisterOpen: () => void;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCashRegisterOpen, setIsCashRegisterOpen] = useState(false);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`${url}${endpoints.auth.me}`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        throw new Error("API respondeu com erro");
      }

      const data = await res.json();
      const user = data.user;
      setUser(user);
    } catch {
      setUser(null);
      throw new Error("Falha ao conectar com a API");
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [loadUser]);

  function handleCashRegisterOpen() {
    setIsCashRegisterOpen((prev) => !prev);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isCashRegisterOpen,
        logout,
        handleCashRegisterOpen,
        reloadUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return ctx;
}
