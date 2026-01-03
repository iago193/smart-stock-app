import { HiCurrencyDollar, HiDocumentCurrencyDollar } from "react-icons/hi2";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa";
import { CircularProgress } from "@/utils/circularProgress";

export default function Statistic() {
  const currentValue = 10000;
  const estimativeValue = 20000;

  const formattedCurrentValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currentValue);

  const formattedEstimativeValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(estimativeValue);

  const progress = Math.min((currentValue / estimativeValue) * 100, 100);

  return (
    <section id="panel" className="min-h-screen flex flex-col gap-5 p-5">
      {/* MAIN SALES SUMMARY CARD */}
      <div className="w-full bg-contentTheme rounded-2xl shadow-2xl p-5 md:p-10 overflow-hidden relative">
        {/* TOP CONTENT AREA */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-40">
          {/* CURRENT MONTH SALES */}
          <div className="flex justify-center flex-col items-center">
            {/* DECORATIVE BACKGROUND ELEMENT */}
            <div className="absolute -right-20 -top-40 text-gray-400/20 pointer-events-none select-none">
              <FaRegCircle size={500} />
            </div>

            <h2 className="text-2xl mb-5 flex items-center gap-2">
              <HiCurrencyDollar />
              Total de vendas esse mês
            </h2>

            <p className="text-5xl font-bold">{formattedCurrentValue}</p>
          </div>

          {/* MONTHLY SALES ESTIMATE (DESKTOP ONLY) */}
          <div className="hidden lg:flex justify-center flex-col items-center">
            <h2 className="text-2xl mb-5 flex items-center gap-2">
              <HiDocumentCurrencyDollar />
              Estimativa de vendas para esse mês
            </h2>

            <p className="text-5xl font-bold">{formattedEstimativeValue}</p>
          </div>
        </div>

        {/* SALES PROGRESS BAR */}
        <div className="w-full h-4 bg-gray-700/40 mt-10 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ACTION BUTTON */}
        <button className="rounded-full p-2 text-2xl absolute top-5 right-5 md:top-5 md:right-5 hover:bg-blue-500/70">
          <CgMoreVerticalAlt />
        </button>
      </div>

      {/* DASHBOARD BOTTOM GRID */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-start relative">
        {/* PREVIOUS MONTHS SUMMARY */}
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-5 lg:p-10 max-h-[38.5rem] overflow-y-auto custom-scroll relative">
          <h2 className="mb-4">Resumo dos meses passados</h2>

          {/* MONTHS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* JANUARY / FEBRUARY */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-60 h-60 flex flex-col items-center">
                <h3>Janeiro - 2025</h3>
                <CircularProgress />
              </div>

              <div className="w-60 h-60 flex flex-col items-center">
                <h3>Fevereiro - 2025</h3>
                <CircularProgress />
              </div>
            </div>

            {/* MARCH / APRIL */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-60 h-60 flex flex-col items-center">
                <h3>Março - 2025</h3>
                <CircularProgress />
              </div>

              <div className="w-60 h-60 flex flex-col items-center">
                <h3>Abril - 2025</h3>
                <CircularProgress />
              </div>
            </div>
          </div>
          {/* ACTION BUTTON */}
          <button className="rounded-full p-2 text-2xl absolute top-5 right-5 md:top-5 md:right-5 hover:bg-blue-500/70">
            <CgMoreVerticalAlt />
          </button>
        </div>

        {/* SALES HISTORY */}
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-5 lg:p-10 max-h-[38.5rem] overflow-y-auto custom-scroll">
          <h3 className="mb-5">Histórico de vendas</h3>
          <div className="flex flex-col gap-4">
            <div className="bg-blue-500/50 p-4 rounded-2xl shadow-sm">
              <div className="flex justify-between">
                <h4>Operador: iago - 12/05/2025</h4>
                <p>Valor da venda: 48,66</p>
              </div>
              <span>produto1, produto2, produto3, produto4</span>
            </div>
          </div>
        </div>
        {/* ACTION BUTTON */}
        <button className="rounded-full p-2 text-2xl absolute top-5 right-5 md:top-5 md:right-5 hover:bg-blue-500/70">
          <CgMoreVerticalAlt />
        </button>
      </div>
    </section>
  );
}
