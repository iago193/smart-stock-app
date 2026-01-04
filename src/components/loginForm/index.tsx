"use client";

import { loginAction } from "@/app/actions/loginAction";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (value: string): void => {
    setInputValue(value);
  }

  const styleInput =
    "bg-gray-300/50 p-2 rounded-md focus:outline-2 outline-blue-300";
  return (
    <div className="w-full h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="p-5 shadow-2xl rounded-2xl w-1xl bg-white/50 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white border-b-2 border-b-gray-300 py-2 mb-5">
            Faça login
          </h2>
          <form action={loginAction} className="text-md text-white">
            <div className="flex flex-col font-bold">
              <label htmlFor="name">E-mail</label>
              <input
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
                 className="absolute top-11 right-2">{showPassword? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
            <button className="w-full text-xl font-bold mt-5 bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md">
              Logar
            </button>
            <p className="text-sm mt-5 text-gray-800 font-bold">
              Esqueceu a senha? entre em contato com seu gestor!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
