"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useError } from "@/contexts/ErrorContext";
import { toast } from "react-toastify";
import { actionLogin } from "./action-login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (value: string): void => {
    setInputValue(value);
  };

  const styleInput =
    "bg-gray-300/50 p-2 rounded-md focus:outline-2 outline-blue-300";

  const { setNewError, clearError, error } = useError();
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const data = await actionLogin(formData);

    if (!data.success) return setNewError(data.message);

    clearError();
    toast.success("Logado com sucesso!");
    console.log(data);
    if (data.success) {
      router.replace("/cashregister");
      router.refresh();
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="p-5 shadow-2xl rounded-2xl w-1xl bg-white/50 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white border-b-2 border-b-gray-400 py-2 mb-5">
            Faça login
          </h2>
          <form action={handleLogin} className="text-md text-white">
            <div className="flex flex-col font-bold">
              <label htmlFor="name">E-mail</label>
              <input
                required
                className={`${styleInput}`}
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu nome..."
              />

              <div className="relative">
                <label className="block mt-2" htmlFor="password">
                  Senha:
                </label>
                <input
                  required
                  onChange={(e) => handleInputValue(e.target.value)}
                  className={`w-full ${styleInput}`}
                  id="password"
                  name="password"
                  value={inputValue}
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua Senha.."
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-11 right-2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button className="w-full text-xl font-bold mt-5 bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md">
              Logar
            </button>
            <p className="text-red-500 mt-2">
              {error !== null ? (
                <span className="font-bold">*{error}</span>
              ) : (
                ""
              )}
            </p>
            <div className="border-t-2 border-t-gray-400 mt-5">
              <p className="text-sm text-gray-800 font-bold mt-2">
                Esqueceu a senha? entre em contato com seu gestor!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
