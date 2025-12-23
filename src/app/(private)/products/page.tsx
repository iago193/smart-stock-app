export default function Product() {
  const styleUl = "p-2";

  return (
    <section className="m-5">
      <div className="w-full rounded-2xl bg-contentTheme shadow-2xl p-5">
        <div className="w-80">
          <input className="w-full p-2 rounded-2xl bg-gray-200 mb-4 outline-blue-300" type="search" placeholder="Buscar"/>
        </div>
        <div className="overflow-auto max-h-[50vh]">
          <table className="w-full">
            <thead className="text-center">
              <tr>
                <th className={styleUl}>ID</th>
                <th className={styleUl}>Nome</th>
                <th className={styleUl}>SKU</th>
                <th className={styleUl}>Preço</th>
                <th className={styleUl}>Preço com desconto</th>
                <th className={styleUl}>Estoque</th>
                <th className={styleUl}>Ativo</th>
                <th className={styleUl}>Criado em</th>
              </tr>
            </thead>

            <tbody className="text-center">
              <tr className="odd:bg-blue-500/50 even:bg-transparent">
                <td className={styleUl}>1</td>
                <td className={styleUl}>Produto Exemplo</td>
                <td className={styleUl}>SKU123</td>
                <td className={styleUl}>99.90</td>
                <td className={styleUl}>79.90</td>
                <td className={styleUl}>10</td>
                <td className={styleUl}>Sim</td>
                <td className={styleUl}>2025-01-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-ful flex gap-2">
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
      </div>
    </section>
  );
}
