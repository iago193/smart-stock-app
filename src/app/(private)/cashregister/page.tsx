import CashRegisterProductList from "@/components/cashRegisterProductList";
import { url, endpoints } from "@/constants/api";
import type { ProductsType } from "@/types/productsType";

export default async function CashRegister() {
  let products :ProductsType[] = [];

  const response = await fetch(`${url}${endpoints.products}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();
  products = data.data

  return (
    <section className="w-full h-screen p-5">
      <div className="w-full h-full rounded-2xl bg-contentTheme shadow-2xl p-5">
        <div className="w-full h-full grid grid-cols-[2fr_1fr] gap-5">
          <div>
            <CashRegisterProductList products={products} />
          </div>
          <div className="border-2 p-5">
            item 2
          </div>
        </div>
      </div>
    </section>
  );
}
