// app/page.tsx
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";

export default function Home() {
  const isAuthenticated = false; // exemplo

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
     <div className="background-login">
        <LoginForm />
     </div>
  );
}
