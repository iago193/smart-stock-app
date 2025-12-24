"use client";

import type { ProductsType } from "@/types/productsType";

type TableProductsProps = {
  products: ProductsType[];
};

export default function TableProducts({ products }: TableProductsProps) {
  const styleUl = "p-2";

  return (
    <div className="overflow-auto max-h-[50vh]">
      <div className="w-80">
        <input
          className="w-full p-2 rounded-2xl bg-gray-200 mb-4 outline-blue-300"
          type="search"
          placeholder="Buscar"
        />
      </div>

      <table className="w-full">
        <thead className="text-center">
          <tr>
            <th className={styleUl}>ID</th>
            <th className={styleUl}>Nome</th>
            <th className={styleUl}>SKU</th>
            <th className={styleUl}>Preço</th>
            <th className={styleUl}>Estoque</th>
            <th className={styleUl}>Descrição</th>
            <th className={styleUl}>Categoria</th>
            <th className={styleUl}>Ativo</th>
            <th className={styleUl}>Criado em</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="odd:bg-blue-500/50 even:bg-transparent"
              >
                <td className={styleUl}>{product.id}</td>
                <td className={styleUl}>{product.name}</td>
                <td className={styleUl}>{product.sku ?? "-"}</td>
                <td className={styleUl}>
                  {Number(product.price).toFixed(2)}
                </td>
                <td className={styleUl}>{product.stock ?? 0}</td>
                <td className={styleUl}>{product.description ?? "-"}</td>
                <td className={styleUl}>{product.category?.name ?? "-"}</td>
                <td className={styleUl}>
                  {product.is_active ? "Sim" : "Não"}
                </td>
                <td className={styleUl}>
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="p-4 text-gray-400">
                Nenhum produto encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
