"use client";

import { HiCurrencyDollar, HiDocumentCurrencyDollar } from "react-icons/hi2";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa";
import { CircularProgress } from "@/utils/circularProgress";
import type { Order } from "@/types/productsType";
import { useMemo } from "react";

type StatisticComponentProps = {
  history: Order[];
};

type MonthlySummary = {
  key: string;
  label: string;
  total: number;
};

/* =======================
   UTILIDADES
======================= */

// gera SEMPRE os últimos 4 meses do calendário
function getLastFourCalendarMonths(history: Order[]): MonthlySummary[] {
  const now = new Date();
  const months: MonthlySummary[] = [];

  for (let i = 3; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    const total = history
      .filter((order) => {
        const d = new Date(order.createdAt);
        return (
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      })
      .reduce((acc, order) => acc + order.total, 0);

    months.push({ key, label, total });
  }

  return months;
}

function getBarColor(progress: number) {
  if (progress < 40) return "bg-red-500";
  if (progress < 70) return "bg-yellow-400";
  return "bg-green-500";
}

/* =======================
   COMPONENTE
======================= */

export default function StatisticComponent({
  history,
}: StatisticComponentProps) {
  const estimativeValue = 200_000;

  /* TOTAL DO MÊS ATUAL */
  const currentMonthTotal = useMemo(() => {
    const now = new Date();

    return history
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, order) => acc + order.total, 0);
  }, [history]);

  /* SEMPRE 4 MESES */
  const lastFourMonths = useMemo(
    () => getLastFourCalendarMonths(history),
    [history],
  );

  const progress = Math.min((currentMonthTotal / estimativeValue) * 100, 100);

  return (
    <>
      {/* =======================
          CARD PRINCIPAL
      ======================= */}
      <div className="w-full bg-contentTheme rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute -right-24 -top-40 text-gray-400/20">
          <FaRegCircle size={500} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-40">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-5 flex items-center gap-2">
              <HiCurrencyDollar />
              Total de vendas esse mês
            </h2>

            <p className="text-5xl font-bold">
              {currentMonthTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center">
            <h2 className="text-2xl mb-5 flex items-center gap-2">
              <HiDocumentCurrencyDollar />
              Estimativa de vendas
            </h2>

            <p className="text-5xl font-bold">
              {estimativeValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-4 bg-gray-700/40 mt-10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getBarColor(
              progress,
            )}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <button className="rounded-full p-2 text-2xl absolute top-5 right-5 hover:bg-blue-500/70">
          <CgMoreVerticalAlt />
        </button>
      </div>

      {/* =======================
          GRID INFERIOR
      ======================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* RESUMO DOS MESES */}
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-10">
          <h2 className="mb-6">Resumo dos últimos meses</h2>

          {/* 🔥 2 EM CIMA / 2 EM BAIXO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lastFourMonths.map((month) => {
              const monthProgress = Math.min(
                (month.total / estimativeValue) * 100,
                100,
              );

              return (
                <div
                  key={month.key}
                  className="flex flex-col items-center gap-3"
                >
                  <h3 className="capitalize">{month.label}</h3>

                  <CircularProgress progress={monthProgress} />

                  <span className="text-sm opacity-70">
                    {month.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* HISTÓRICO */}
        <div className="bg-contentTheme shadow-2xl rounded-2xl p-10 max-h-[38rem] overflow-y-auto">
          <h3 className="mb-5">Histórico de vendas</h3>

          <div className="flex flex-col gap-4">
            {history.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString(
                "pt-BR",
              );

              return (
                <div key={order.id} className="bg-blue-500/40 p-4 rounded-2xl">
                  <div className="flex justify-between">
                    <h4>
                      Operador: {order.operator} — {date}
                    </h4>
                    <p>
                      {order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <span className="text-sm opacity-80">
                    {order.items.map((i) => i.productName).join(", ")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
