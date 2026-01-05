"use server";

import { url, endpoints } from "@/constants/api";
import { cookies } from "next/headers";

const statusErrorMap: Record<number, string> = {
  400: "Requisição inválida.",
  401: "Usuário ou senha inválidos.",
  404: "Recurso não encontrado.",
  429: "Muitas requisições. Tente novamente mais tarde.",
  500: "Erro interno do servidor.",
};

export async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  try {
    const response = await fetch(`${url}${endpoints.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      const message = statusErrorMap[response.status] ?? "Erro inesperado";

      return {
        success: false,
        message,
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/cashregister",
    });

    return {
      success: true,
      message: "Logado com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro interno no servidor",
    };
  }
}
