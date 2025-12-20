export default function Home() {
  return (
    <section className="">
      <div className="w-full bg-contentTheme rounded-2xl flex justify-between shadow-2xl p-10">
        <div className="flex justify-center  flex-col items-center">
          <h2 className="text-2xl mb-5">Total de vendas esse mês</h2>
          <p className="text-5xl">10.000,00</p>
        </div>
        <div className="lg:flex hidden justify-center flex-col items-center">
          <h2 className="text-2xl mb-5">Expectativa de vendas para esse mês</h2>
          <p className="text-5xl">20.000,00</p>
        </div>
      </div>
    </section>
  );
}
