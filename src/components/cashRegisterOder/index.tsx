"use client";

import { endpoints } from "@/constants/api";
import type { ProductsType } from "@/types/productsType";
import { useEffect, useMemo, useState } from "react";

type TableProductsProps = {
  products: ProductsType[];
};

type CartItem = ProductsType & {
  quantity: number;
};

export default function CashRegisterOder({ products }: TableProductsProps) {
  const [productList, setProductList] = useState(products);
  const [search, setSeach] = useState("");
  const [count, setCount] = useState(1);
  const [seachIsTrue, setSeachIsTrue] = useState(false);
  const [registerOder, setRegisterOder] = useState<CartItem[]>([]);

  const handleCashRegisterHistory = async () => {
    const response = await fetch(endpoints.history, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: registerOder,
        total: cash,
        createdAt: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar histórico");
    }

    const data = await response.json();
    console.log(data);
  };

  /* Atualiza lista de produtos */
  useEffect(() => {
    setProductList(products);
  }, [products]);

  /* FILTRO */
  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode?.toString().includes(search)
  );

  /* SEARCH */
  const handleSeach = (value: string) => {
    setSeach(value);
    setSeachIsTrue(value.trim() !== "");
  };

  /* ADICIONAR PRODUTO */
  const handleOder = (value: string) => {
    const productSelected = productList.find(
      (product) =>
        product.name.toLowerCase() === value.toLowerCase() ||
        product.barcode?.toString() === value
    );

    if (!productSelected) return;

    setRegisterOder((prev) => {
      const exists = prev.find((p) => p.id === productSelected.id);

      if (exists) {
        return prev.map((p) =>
          p.id === productSelected.id
            ? { ...p, quantity: p.quantity + count }
            : p
        );
      }

      return [...prev, { ...productSelected, quantity: count }];
    });

    setSeach("");
    setSeachIsTrue(false);
    setCount(1);
  };

  /* ALTERAR QUANTIDADE NO CARRINHO */
  const updateQuantity = (id: number, amount: number) => {
    setRegisterOder((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* TOTAL */
  const cash = useMemo(() => {
    return registerOder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [registerOder]);

  const btnStyle =
    "w-full p-5 rounded-2xl text-3xl font-bold text-white shadow-sm transition duration-300";

  return (
    <div className="w-full relative">
      {/* INPUT BUSCA */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOder(search);
        }}
      >
        <input
          onChange={(e) => handleSeach(e.target.value)}
          className="w-full bg-gray-200 p-4 rounded-2xl text-3xl outline-none"
          type="search"
          value={search}
          autoFocus
          placeholder="Código de barras ou nome"
        />
      </form>

      {/* AUTOCOMPLETE */}
      <div
        className={`w-full bg-amber-300 ${
          !seachIsTrue ? "hidden" : ""
        } rounded-2xl max-h-60 overflow-y-auto absolute z-10`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <p
              key={product.id}
              onClick={() => handleOder(product.name)}
              className="p-2 cursor-pointer hover:bg-blue-400 hover:text-white"
            >
              {product.name} - R${product.price}
            </p>
          ))
        ) : (
          <p className="p-2">Nada encontrado</p>
        )}
      </div>

      {/* QUANTIDADE */}
      <div className="mt-4">
        <label className="font-bold mr-2 text-2xl text-white">
          Quantidade:
        </label>
        <input
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 bg-gray-200 p-1 rounded-2xl text-2xl outline-none text-end"
          type="number"
          min={1}
          value={count}
        />
      </div>

      {/* CARRINHO */}
      <div className="h-[27rem] rounded-2xl my-5 bg-contentTheme p-5 overflow-y-auto">
        {registerOder.length === 0 && (
          <p className="opacity-60">Nenhum item no carrinho</p>
        )}

        {registerOder.map((product) => (
          <div key={product.id} className="flex items-center mb-2">
            <p className="text-2xl ml-1">
              {product.name} - R${product.price}
            </p>

            <span className="flex items-center ml-5 gap-2 text-xl">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="bg-amber-300/50 px-2 rounded"
              >
                {"<"}
              </button>
              x{product.quantity}
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="bg-amber-300/50 px-2 rounded"
              >
                {">"}
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* BOTÕES */}
      <div className="flex flex-col gap-2">
        <button
          onChange={() => handleCashRegisterHistory()}
          className={`bg-green-400 hover:bg-green-500 ${btnStyle}`}
        >
          Confirmar
        </button>
        <button
          onClick={() => setRegisterOder([])}
          className={`bg-red-400 hover:bg-red-500 ${btnStyle}`}
        >
          Cancelar
        </button>
      </div>

      {/* TOTAL */}
      <div className="w-full bg-blue-400 p-5 text-3xl font-bold mt-2 rounded-2xl text-white">
        TOTAL: R$ {cash.toFixed(2)}
      </div>
    </div>
  );
}
