export default function CashRegisterOder() {
  const btnStyle =
    "w-full p-5 rounded-2xl text-3xl font-bold text-white shadow-sm transition duration-300";
  return (
    <div className="w-full">
      <div>
        <input
          className="
            w-full bg-gray-200 p-4 rounded-2xl text-3xl outline-none"
          type="text"
          autoFocus
          placeholder="Código de barras ou nome"
        />
        <label className="font-bold mr-2 text-2xl text-white" htmlFor="amount">Quantidade:</label>
        <input
          id="amount"
          className="
            w-20 bg-gray-200 p-1 rounded-2xl text-2xl outline-none mt-2 text-end"
          type="number"
          defaultValue={1}
        />
      </div>
      <div id="itens" className="h-[27rem] rounded-2xl my-5 bg-contentTheme"></div>

      <div className="flex justify-end flex-col items-center gap-2">
        <button className={`bg-green-400 hover:bg-green-500 ${btnStyle}`}>
          Confirmar
        </button>
        <button className={`bg-red-400 hover:bg-red-500 ${btnStyle}`}>
          Cancelar
        </button>
      </div>
      <div className="w-full bg-blue-400 p-5 text-3xl font-bold mt-2 rounded-2xl text-white shadow-sm">
        <span className="">TOTAL: R$ 0</span>
      </div>
    </div>
  );
}
