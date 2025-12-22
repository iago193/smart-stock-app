import images from "../assets/index";
import Image from "next/image";

export default function SideBar() {
  return (
    <section className="bg-contentTheme shadow-2xl p-4">
      <div className="">
        <div className="flex justify-center items-center gap-4 border-b-2 border-b-gray-500/50 mb-10 py-2 text-2xl">
          <h2>Olá iago bruno</h2>
          <Image
            src={images.imageDefault}
            alt="imageDefault"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <ul className="flex flex-col gap-4 text-xl">
          <li>Estatísticas</li>
          <li>Caixa</li>
          <li>Produtos</li>
          <li>Calculadora</li>
        </ul>
      </div>
    </section>
  );
}
