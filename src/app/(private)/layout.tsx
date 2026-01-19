"use client";

import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /** 👉 CONTROLE ÚNICO DO DESKTOP */
  const [desktopOpen, setDesktopOpen] = useState(true);

  /* ================== DETECTA TAMANHO ================== */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setMobileOpen(false);
      } else {
        setDesktopOpen(true); // reset limpo
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================== LARGURA DERIVADA ================== */
  const sidebarWidth = isMobile ? 0 : desktopOpen ? 350 : 100;

  return (
    <>
      {/* BOTÃO HAMBÚRGUER (NÃO ALTERADO) */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-md shadow-lg text-xl"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      )}

      <main
        className="h-screen overflow-hidden transition-all duration-300"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : `${sidebarWidth}px 1fr`,
        }}
      >
        {/* SIDEBAR */}
        <aside
          className={`
            bg-contentTheme transition-all duration-300
            ${
              isMobile
                ? `fixed top-0 left-0 h-full z-40 ${
                    mobileOpen ? "w-64" : "w-0 overflow-hidden"
                  }`
                : ""
            }
          `}
        >
          <SideBar
            isMobile={isMobile}
            isMobileOpen={mobileOpen}
            desktopOpen={desktopOpen}
            setDesktopOpen={setDesktopOpen}
          />
        </aside>

        {/* CONTEÚDO */}
        <div className="overflow-y-auto custom-scroll">{children}</div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
