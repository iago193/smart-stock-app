import { HiCurrencyDollar, HiDocumentCurrencyDollar } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { CircularProgress } from "@/components/circularProgress";

export default function Home() {
  const currentValue = 1000000;
  const estimativeValue = 2000000;

  const progress = Math.min((currentValue / estimativeValue) * 100, 100);

  return (
    <section id="panel" className="h-screen flex flex-col gap-5 p-5">
      <div className="w-full bg-contentTheme rounded-2xl shadow-2xl p-10 overflow-hidden relative">
        <div className="flex gap-40">
          <div className="flex justify-center  flex-col items-center">
            <div className="absolute -right-20 -top-40 text-gray-400/20">
              <FaRegCircle size={500} />
            </div>
            <h2 className="text-2xl mb-5 flex items-center gap-2">
              {<HiCurrencyDollar />}Total de vendas esse mês
            </h2>
            <p className="text-5xl flex items-center font-bold">
              {<BsCurrencyDollar />}
              {currentValue}
            </p>
          </div>
          <div className="lg:flex hidden justify-center flex-col items-center">
            <h2 className="text-2xl mb-5 flex items-center gap-2">
              {<HiDocumentCurrencyDollar />}Estimativa de vendas para esse mês
            </h2>
            <p className="text-5xl flex items-center font-bold">
              {<BsCurrencyDollar />}
              {estimativeValue}
            </p>
          </div>
        </div>
        {/* BARRA */}
        <div className="w-full h-4 bg-gray-700/40 mt-10 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          className="bg-blue-400/50 rounded-full p-2 absolute top-10 right-10
        hover:bg-blue-400/70"
        >
          Ver detalhes
        </button>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-10">
          <h2>Title</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 p-2">
            <div className="flex flex-col items-center">
              <div className="w-60 flex flex-col items-center h-60 p-1">
                <h3>1</h3>
                <CircularProgress />
              </div>
              <div className="w-60 flex flex-col items-center h-60 p-1">
                <h3>2</h3>
                <CircularProgress />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-60 flex flex-col items-center h-60 p-1">
                <h3>3</h3>
                <CircularProgress />
              </div>
              <div className="w-60 flex flex-col items-center h-60 p-1">
                <h3>4</h3>
                <CircularProgress />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-10">
          serção 2
        </div>
      </div>
    </section>
  );
}
