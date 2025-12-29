"use client";

import type { ProductsType } from "@/types/productsType";
import { useEffect, useState } from "react";

type TableProductsProps = {
  products: ProductsType[];
};

export default function CashRegisterOder({ products }: TableProductsProps) {
  const [productList, setProductList] = useState(products);
  const [seach, setSeach] = useState("");
  const [seachIsTrue, setSeachIsTru] = useState(false);

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(seach.toLowerCase()) ||
      product.barcode?.toString().toLowerCase().includes(seach.toLowerCase())
  );

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleSeach = (value: string) => {
    if (value.trim() !== "") {
      setSeach(value);
      setSeachIsTru(true);
    } else {
      setSeachIsTru(false);
    }
  };

  const handleOrder = (value: string) => {
    console.log(value)
  };

  const btnStyle =
    "w-full p-5 rounded-2xl text-3xl font-bold text-white shadow-sm transition duration-300";
  return (
    <div className="w-full relative">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const value = formData.get("search") as string;
            handleOrder(value);
          }}
        >
          <input
            onChange={e => handleSeach(e.target.value)}
            className="
            w-full bg-gray-200 p-4 rounded-2xl text-3xl outline-none"
            type="text"
            name="search"
            autoFocus
            placeholder="Código de barras ou nome"
          />
        </form>
        <div
          className={`w-full bg-amber-300 ${
            !seachIsTrue ? "hidden" : ""
          } rounded-2xl max-h-60 overflow-y-auto absolute`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <p 
              onClick={() => handleOrder(product.name)}
              className="transition duration-100 hover:text-white cursor-pointer
               hover:bg-blue-400 p-2" key={product.id}>
                {product.id} - {product.name} - R${product.price}
              </p>
            ))
          ) : (
            <p className="p-2">Nada encontrado</p>
          )}
        </div>
        <label className="font-bold mr-2 text-2xl text-white" htmlFor="amount">
          Quantidade:
        </label>
        <input
          id="amount"
          className="
            w-20 bg-gray-200 p-1 rounded-2xl text-2xl outline-none mt-2 text-end"
          type="number"
          defaultValue={1}
        />
      </div>
      <div
        id="itens"
        className="h-[27rem] rounded-2xl my-5 bg-contentTheme"
      ></div>

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
