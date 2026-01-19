"use client";

import type { CategoryListType, ProductsType } from "@/types/productsType";
import { useState } from "react";
import CreateProductForm from "../createProductFormModal";
import EditProductForm from "../editProductFormModal ";

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
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [productEdit, setProductEdit] = useState<ProductsType | null>(null);

  const handleProductEdit = (product: ProductsType) => {
    setProductEdit(product);
    setModalEditOpen(true);
  };

  const applyFilters = (
    category: string,
    searchText: string,
    statusFilter: "all" | "active" | "inactive",
  ) => {
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

    if (statusFilter !== "all") {
      result = result.filter((product) =>
        statusFilter === "active" ? product.is_active : !product.is_active,
      );
    }

    setFilted(result);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    applyFilters(value, search, status);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    applyFilters(filter, value, status);
  };

  const handleStatusFilter = (value: "all" | "active" | "inactive") => {
    setStatus(value);
    applyFilters(filter, search, value);
  };

  return (
    <>
      {/* BUSCA */}
      <div className="w-80">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 rounded-2xl bg-gray-200 mb-4 outline-blue-300"
          type="search"
          placeholder="Buscar produto"
        />
      </div>

      {/* TABELA */}
      <div className="overflow-auto max-h-[50vh]">
        <table className="w-full">
          <thead className="text-center">
            <tr>
              <th className={styleUl}>ID</th>
              <th className={styleUl}>Nome</th>
              <th className={styleUl}>SKU</th>
              <th className={styleUl}>Preço</th>
              <th className={styleUl}>Estoque</th>
              <th className={styleUl}>Código de barras</th>
              <th className={styleUl}>Descrição</th>
              <th className={styleUl}>Categoria</th>
              <th className={styleUl}>Ativo</th>
              <th className={styleUl}>Criado em</th>
              <th className={styleUl}>Ações</th>
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
                  <td className={styleUl}>{product.barcode ?? "-"}</td>
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
                  <td className="px-2">
                    <button
                      onClick={() => handleProductEdit(product)}
                      className="bg-green-500/50 px-2 py-1 rounded-md my-1 shadow-2xl text-white font-bold transform hover:scale-105 transition duration-300"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-4 text-gray-400 text-center">
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FILTROS + AÇÕES */}
      <div className="w-full flex gap-4 mt-5 flex-wrap items-center">
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="rounded-2xl p-2 bg-contentTheme shadow-xl text-center"
        >
          <option value="">Mostrar todas categorias</option>
          {[
            ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => handleStatusFilter("all")}
            className={`px-3 py-2 rounded-2xl shadow-xl ${
              status === "all" ? "bg-blue-500 text-white" : "bg-contentTheme"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => handleStatusFilter("active")}
            className={`px-3 py-2 rounded-2xl shadow-xl ${
              status === "active"
                ? "bg-green-500 text-white"
                : "bg-contentTheme"
            }`}
          >
            Ativos
          </button>

          <button
            onClick={() => handleStatusFilter("inactive")}
            className={`px-3 py-2 rounded-2xl shadow-xl ${
              status === "inactive"
                ? "bg-red-500 text-white"
                : "bg-contentTheme"
            }`}
          >
            Inativos
          </button>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="rounded-2xl p-2 bg-contentTheme shadow-xl text-center"
        >
          Adicionar Produto
        </button>
      </div>

      {/* MODAIS */}
      <CreateProductForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        categories={categories}
      />

      <EditProductForm
        modalOpen={modalEditOpen}
        categories={categories}
        setModalOpen={setModalEditOpen}
        product={productEdit}
      />
    </>
  );
}
