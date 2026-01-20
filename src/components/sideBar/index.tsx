"use client";

import Image from "next/image";
import images from "../../assets";
import {
  FaGear,
  FaChartLine,
  FaCashRegister,
  FaBoxesStacked,
  FaCalculator,
  FaUsers,
} from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Dispatch, SetStateAction } from "react";

type SidebarProps = {
  isMobile: boolean;
  isMobileOpen: boolean;
  desktopOpen: boolean;
  setDesktopOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SideBar({
  isMobile,
  isMobileOpen,
  desktopOpen,
  setDesktopOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  /** 👉 FONTE ÚNICA DE VERDADE */
  const isSidebarExpanded = isMobile ? isMobileOpen : desktopOpen;

  const handlePathname = (path: string) =>
    pathname === path ? "active-path" : "";

  const linkBase =
    "flex items-center gap-3 hover:text-primary transition duration-300";

  const iconOnly =
    "flex justify-center text-2xl hover:text-primary transition duration-300";

  return (
    <aside className="bg-contentTheme shadow-2xl h-full relative flex">
      {/* ================= CONTEÚDO ================= */}
      <div className="flex-1 p-4 overflow-hidden">
        {isSidebarExpanded ? (
          <>
            {/* USUÁRIO */}
            <div className="flex justify-center items-center gap-4 md:mt-2 mt-10 mb-10 py-2 text-xl">
              <h2>Olá, {user?.name}</h2>
              <div className="relative">
                <Image
                  src={user?.avatar || images.imageDefault}
                  alt="Avatar"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
                <label
                  htmlFor="file"
                  className="absolute -bottom-1 right-0 cursor-pointer"
                >
                  <MdAddAPhoto size={15} />
                </label>
                <input id="file" name="photo" type="file" className="hidden" />
              </div>
            </div>

            {/* PAINEL */}
            <h3 className="text-xl font-bold mb-3 border-b border-gray-500/50">
              Painel
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li className={handlePathname("/cashregister")}>
                <Link href="/cashregister" className={linkBase}>
                  <FaCashRegister /> Caixa
                </Link>
              </li>
              <li className={handlePathname("/products")}>
                <Link href="/products" className={linkBase}>
                  <FaBoxesStacked /> Estoque
                </Link>
              </li>
              <li className={handlePathname("/calculator")}>
                <Link href="/calculator" className={linkBase}>
                  <FaCalculator /> Calculadora
                </Link>
              </li>
            </ul>

            {/* ADMIN */}
            <h3 className="text-xl font-bold mt-8 mb-3 border-b border-gray-500/50">
              Administrativo
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li className={handlePathname("/statistic")}>
                <Link href="/statistic" className={linkBase}>
                  <FaChartLine /> Estatísticas
                </Link>
              </li>
              <li className={handlePathname("/users")}>
                <Link href="/users" className={linkBase}>
                  <FaUsers /> Usuários
                </Link>
              </li>
              <li className={handlePathname("/config")}>
                <Link href="/config" className={linkBase}>
                  <FaGear /> Configurações
                </Link>
              </li>
            </ul>
          </>
        ) : (
          /* ===== SOMENTE ÍCONES (DESKTOP) ===== */
          <ul className="flex flex-col items-center gap-8 mt-10">
            <li className={handlePathname("/cashregister")}>
              <Link href="/cashregister" className={iconOnly}>
                <FaCashRegister />
              </Link>
            </li>
            <li className={handlePathname("/products")}>
              <Link href="/products" className={iconOnly}>
                <FaBoxesStacked />
              </Link>
            </li>
            <li className={handlePathname("/calculator")}>
              <Link href="/calculator" className={iconOnly}>
                <FaCalculator />
              </Link>
            </li>
            <li className={handlePathname("/statistic")}>
              <Link href="/statistic" className={iconOnly}>
                <FaChartLine />
              </Link>
            </li>
            <li className={handlePathname("/users")}>
              <Link href="/users" className={iconOnly}>
                <FaUsers />
              </Link>
            </li>
            <li className={handlePathname("/config")}>
              <Link href="/config" className={iconOnly}>
                <FaGear />
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* ================= BOTÃO DESKTOP ================= */}
      {!isMobile && (
        <div className="bg-blue-500 shadow-xl px-1 flex items-center">
          <button
            onClick={() => setDesktopOpen((prev) => !prev)}
            className="text-white h-full flex items-center"
          >
            {desktopOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
          </button>
        </div>
      )}
    </aside>
  );
}
