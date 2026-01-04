"use server";

import { url, endpoints } from "@/constants/api";

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

    if (!response.ok) {
      const error = await response.json();
      console.log("Erro da API:", error);
      return;
    }

    if (response.status === 401) {
      console.log("Usuário ou senha inválidos");
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
