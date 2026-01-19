"use client";

import { useState } from "react";
import { MdOutlineProductionQuantityLimits, MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { toast } from "react-toastify";
import { CategoryListType, ProductsType } from "@/types/productsType";
import { editProductAction } from "./action-product-edit";

type CreateProductFormProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  categories: CategoryListType;
  product: ProductsType | null;
};

export default function EditProductForm({
  modalOpen,
  setModalOpen,
  categories,
  product,
}: CreateProductFormProps) {
  const [enabledFields, setEnabledFields] = useState<Record<string, boolean>>(
    {},
  );
  const [editedFields, setEditedFields] = useState<Record<string, boolean>>({});

  const inputStyle = (enabled: boolean) =>
    `w-full rounded-md p-2 transition duration-300
     ${
       enabled
         ? "bg-white border-2 border-blue-400"
         : "bg-gray-200 text-gray-500 cursor-not-allowed"
     }`;

  const enableField = (field: string) => {
    setEnabledFields((prev) => ({ ...prev, [field]: true }));
  };

  const markEdited = (field: string) => {
    setEditedFields((prev) => ({ ...prev, [field]: true }));
  };

  const hasChanges = Object.keys(editedFields).length > 0;

  const handleProductAction = async (formData: FormData) => {
    if (!hasChanges || !product) return;

    formData.append("id", String(product.id));

    const response = await editProductAction(formData);
    toast.success(response);
    setModalOpen(false);
  };

  if (!modalOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white w-[450px] rounded-2xl p-5 shadow-2xl relative">
          <h2 className="mb-2 font-bold text-2xl flex justify-center items-center gap-2 p-2">
            <MdOutlineProductionQuantityLimits />
            Editar produto
          </h2>

          <form
            key={product.id}
            onSubmit={(e) => {
              e.preventDefault();
              handleProductAction(new FormData(e.currentTarget));
            }}
            className="flex flex-col gap-2 overflow-y-auto max-h-[300px] font-bold p-2"
          >
            <input type="hidden" name="id" value={product.id} />
            {(
              [
                ["name", "Nome do produto", "text"],
                ["description", "Descrição", "text"],
                ["barcode", "Código de barras", "number"],
                ["brand", "Marca", "text"],
                ["price", "Preço", "number"],
                ["stock", "Estoque", "number"],
              ] as const
            ).map(([field, label, type]) => (
              <div key={field}>
                <label className="flex justify-between items-center">
                  <span>{label}</span>
                  <button
                    type="button"
                    onClick={() => enableField(field)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                </label>

                <input
                  name={field}
                  type={type}
                  min={type === "number" ? "0" : undefined}
                  step={field === "price" ? "0.01" : undefined}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  defaultValue={(product as any)[field] ?? ""}
                  disabled={!enabledFields[field]}
                  onChange={() => markEdited(field)}
                  className={inputStyle(!!enabledFields[field])}
                />
              </div>
            ))}

            {/* ATIVO */}
            <div>
              <label className="flex justify-between items-center">
                <span>Ativo</span>
                <button
                  type="button"
                  onClick={() => enableField("is_active")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              </label>

              <select
                name="is_active"
                defaultValue={product.is_active ? "1" : "0"}
                disabled={!enabledFields.is_active}
                onChange={() => markEdited("is_active")}
                className={inputStyle(!!enabledFields.is_active)}
              >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            </div>

            {/* CATEGORIA */}
            <div>
              <label className="flex justify-between items-center">
                <span>Categoria</span>
                <button
                  type="button"
                  onClick={() => enableField("category_id")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              </label>

              <select
                name="category_id"
                defaultValue={product.category?.id}
                disabled={!enabledFields.category_id}
                onChange={() => markEdited("category_id")}
                className={inputStyle(!!enabledFields.category_id)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SALVAR */}
            <button
              type="submit"
              disabled={!hasChanges}
              className={`mt-5 p-2 w-24 rounded-lg flex justify-center transition
                ${
                  hasChanges
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              <GrNext className="text-white" size={26} />
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setEnabledFields({} as Record<string, boolean>);
              setModalOpen(false);
            }}
            className="absolute top-2 right-4"
          >
            <MdClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
