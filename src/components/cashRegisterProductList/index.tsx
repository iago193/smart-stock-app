"use client";

import type { ProductsType } from "@/types/productsType";
import { colorFromIndex } from "@/utils/colorFromIndex";
import { useMemo, useState } from "react";

type Props = {
  products: ProductsType[];
};

export default function CashRegisterProductList({ products }: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.barcode?.toString().includes(search)
    );
  }, [products, search]);

  return (
    <>
      {/* SEARCH */}
      <div className="px-5 mt-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="p-2 rounded-2xl bg-gray-300 w-80 focus:outline-2 outline-blue-400 transition duration-300"
          type="search"
          placeholder="Buscar produto"
        />
      </div>

      {/* LISTA */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 transition duration-300 gap-4 p-5 content-start">
        {filteredProducts.length === 0 && (
          <p className="text-white/60">Nenhum produto encontrado</p>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{ backgroundColor: colorFromIndex(product.id) }}
            className="aspect-square rounded-xl p-3 text-white shadow cursor-pointer hover:scale-[1.02] transition"
          >
            <h3 className="bg-gray-50/30 p-2 rounded-2xl truncate">
              {product.name}
            </h3>
            <p className="font-bold text-2xl mt-2">
              R$ {Number(product.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
