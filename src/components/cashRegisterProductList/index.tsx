"use client";

import type { ProductsType } from "@/types/productsType";
import { colorFromIndex } from "@/utils/colorFromIndex";

type Props = {
  products: ProductsType[];
};

export default function CashRegisterProductList({ products }: Props) {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5  gap-4 p-5 content-start">
      {products.map((product) => (
        <div
          key={product.id}
          style={{ backgroundColor: colorFromIndex(product.id) }}
          className="aspect-square rounded-xl p-3 text-white shadow"
        >
          <h3 className="bg-gray-50/30 p-2 rounded-2xl">{product.name}</h3>
          <p className="font-bold text-2xl">{product.stock}</p>
        </div>
      ))}
    </div>
  );
}
