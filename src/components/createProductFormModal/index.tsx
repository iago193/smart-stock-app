"use client";

import { CategoryListType } from "@/types/productsType";
import { MdOutlineProductionQuantityLimits, MdClose } from "react-icons/md";

type CreateProductFormProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  categories: CategoryListType;
};

export default function CreateProductForm({
  modalOpen,
  setModalOpen,
  categories,
}: CreateProductFormProps) {
  const inputStyle =
    "w-full bg-gray-200 rounded-md p-2 focus:outline-2 outline-blue-400/50 focus:shadow-sm shadow-blue-400 transition duration-300";

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white w-[450px] rounded-2xl p-5 shadow-2xl relative">
          <h2 className="mb-2 font-bold text-2xl flex justify-center items-center gap-2 p-2">
            <MdOutlineProductionQuantityLimits />
            Adicionar produto
          </h2>

          <p className="font-bold text-gray-500 mb-4 p-2">
            Preencha todos os campos para adicionar um novo produto ao estoque.
          </p>

          <form className="flex flex-col gap-1 overflow-y-auto max-h-[300px] font-bold p-2">
            <label>Nome do produto</label>
            <input name="name" className={inputStyle} type="text" />

            <label>Descrição</label>
            <input name="description" className={inputStyle} type="text" />

            <label>Código de barras</label>
            <input
              name="barcode"
              className={inputStyle}
              type="number"
              min="0"
            />

            <label>Marca</label>
            <input name="brand" className={inputStyle} type="text" />

            <label>Preço</label>
            <input
              name="price"
              className={inputStyle}
              type="number"
              min="0"
              step="0.01"
            />

            <label>Estoque</label>
            <input name="stock" className={inputStyle} type="number" min="0" />

            <label>Categoria</label>
            <select name="category_id" className={`${inputStyle}`}>
              <option value="">Selecione</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </form>

          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-4"
          >
            <MdClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
