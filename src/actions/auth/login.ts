"use client";

import { endpoints, url } from "@/constants/api";

const statusErrorMap: Record<number, string> = {
  400: "Requisição inválida.",
  401: "Email ou senha incorretos.",
  403: "Você não tem permissão para acessar.",
  404: "Serviço de autenticação não encontrado.",
  429: "Muitas tentativas. Tente novamente mais tarde.",
  500: "Erro interno do servidor.",
};

type ActionResult = {
  success: boolean;
  message: string;
};

export async function loginAction(formData: FormData): Promise<ActionResult> {
  try {
    const response = await fetch(`${url}${endpoints.auth.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        success: false,
        message:
          statusErrorMap[response.status] ??
          "Erro inesperado. Tente novamente.",
      };
    }

    return {
      success: true,
      message: "Login realizado com sucesso!",
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível conectar ao servidor.",
    };
  }
}
