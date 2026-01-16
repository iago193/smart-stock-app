"use client";

import type { CategoryListType, ProductsType } from "@/types/productsType";
import { useState } from "react";
import CreateProductForm from "../createProductFormModal";

type TableProductsProps = {
  products: ProductsType[];
  categories: CategoryListType;
};

export default function TableProducts({
  products,
  categories,
}: TableProductsProps) {
  const styleUl = "p-2";

  const [filted, setFilted] = useState<ProductsType[]>(products);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const applyFilters = (category: string, searchText: string) => {
    let result = products;

    if (category) {
      result = result.filter((product) =>
        product.category?.name
          ?.toLowerCase()
          .includes(category.toLowerCase().trim()),
      );
    }

    if (searchText) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase().trim()),
      );
    }

    setFilted(result);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    applyFilters(value, search);
  };

  const handleSeach = (value: string) => {
    setSearch(value);
    applyFilters(filter, value);
  };

  return (
    <>
      <div className="w-80">
        <input
          onChange={(e) => handleSeach(e.target.value)}
          className="w-full p-2 rounded-2xl bg-gray-200 mb-4 outline-blue-300"
          type="search"
          placeholder="Buscar"
        />
      </div>

      <div className="overflow-auto max-h-[50vh]">
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
            {filted.length > 0 ? (
              filted.map((product) => (
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
                <td colSpan={9} className="p-4 text-gray-400 text-center">
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full flex gap-4 mt-5">
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center"
        >
          <option value="">Mostrar todos</option>
          {[
            ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center"
        >
          Adicionar Produto
        </button>
      </div>
      <CreateProductForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        categories={categories}
      />
    </>
  );
}
