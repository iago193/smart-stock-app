import { redirect } from "next/navigation";

export async function logout() {
  const res = await fetch("/api/logout", { method: "POST" });

  if (res.ok) {
    redirect('/');
  }
}
