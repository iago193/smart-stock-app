import Image from "next/image";
import images from "../../assets";
import {
  FaGear,
  FaChartLine,
  FaCashRegister,
  FaBoxesStacked,
  FaCalculator,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa6";
import Link from "next/link";

export default function SideBar() {
  const linkStyle =
    "inline-flex items-center gap-3 hover:text-primary transition";

  return (
    <aside className="bg-contentTheme shadow-2xl p-4 h-full">
      {/* Usuário */}
      <div className="flex justify-center items-center gap-4 mb-10 py-2 text-2xl">
        <h2>Olá, Iago Bruno</h2>
        <Image
          src={images.imageDefault}
          alt="Avatar do usuário"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      {/* Painel */}
      <h3 className="text-2xl font-bold mt-5 mb-2 border-b-2 border-b-gray-500/50 py-2">
        Painel
      </h3>
      <ul className="flex flex-col gap-4 text-xl">
        <li>
          <Link href="/cashregister" className={linkStyle}>
            <FaCashRegister />
            Caixa
          </Link>
        </li>
        <li>
          <Link href="/products" className={linkStyle}>
            <FaBoxesStacked />
            Estoque
          </Link>
        </li>
        <li>
          <Link href="#" className={linkStyle}>
            <FaCalculator />
            Calculadora
          </Link>
        </li>
      </ul>

      {/* Administrativo */}
      <h3 className="text-2xl font-bold mt-8 mb-2 border-b-2 border-b-gray-500/50 py-2">
        Administrativo
      </h3>
      <ul className="flex flex-col gap-4 text-xl">
        <li>
          <Link href="/statistic" className={linkStyle}>
            <FaChartLine />
            Estatísticas
          </Link>
        </li>
        <li>
          <Link href="#" className={linkStyle}>
            <FaUsers />
            Usuários
          </Link>
        </li>
        <li>
          <Link href="#" className={linkStyle}>
            <FaMoneyBillWave />
            Financeiro
          </Link>
        </li>
        <li>
          <Link href="#" className={linkStyle}>
            <FaGear />
            Configurações
          </Link>
        </li>
      </ul>
    </aside>
  );
}
