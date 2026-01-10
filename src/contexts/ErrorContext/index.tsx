"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ErrorContextType = {
  error: string | null;
  setNewError: (error: string) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  function clearError() {
    setError(null);
  }

  function setNewError(error: string) {
    setError(error);
  }

  return (
    <ErrorContext.Provider value={{ error, setNewError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError deve ser usado dentro do ErrorProvider");
  }

  return context;
}
