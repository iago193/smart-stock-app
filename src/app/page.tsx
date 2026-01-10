// app/page.tsx
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";

export default function Login() {
  const isAuthenticated = false; // exemplo

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="video-container">
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <div className="card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
