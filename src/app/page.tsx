// app/page.tsx
import images from "@/assets";
import LoginForm from "@/components/loginForm";
import Image from "next/image";
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

      <Image
        src={images.logo}
        className="absolute -top-15 -left-5"
        alt="Logo"
        width={400}
        height={400}
      />

      <div className="content">
        <div className="card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
