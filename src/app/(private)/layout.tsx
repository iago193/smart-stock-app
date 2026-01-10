import type { Metadata } from "next";
import SideBar from "@/components/sideBar";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Smart Stock",
  description: "Sistema de controle de estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid lg:grid-cols-[1fr_4fr] grid-cols-1 h-screen overflow-hidden">
        <SideBar />
        {/*children*/}
        <div className="overflow-y-auto custom-scroll">{children}</div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
