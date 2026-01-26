import CashRegisterProductList from "@/components/cashRegisterProductList";
import { url, endpoints } from "@/constants/api";
import type { ProductsType } from "@/types/productsType";
import CashRegisterOder from "@/components/cashRegisterOder";

export default async function CashRegister() {
  let products: ProductsType[] = [];

  try {
    const response = await fetch(`${url}${endpoints.products}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("API respondeu com erro");
    }
    const data = await response.json();
    products = data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao conectar com a API");
  }

  return (
    <section className="w-full h-screen p-5">
      <div className="w-full h-full rounded-2xl bg-contentTheme shadow-2xl p-5">
        <div className="w-full h-full grid md:grid-cols-[1fr_450px] xl:grid-cols-[2fr_450px] grid-cols-1 gap-5">
          <div className="hidden md:block overflow-y-auto">
            <CashRegisterProductList products={products} />
          </div>
          <div className="p-5 bg-purple rounded-2xl shadow-2xl overflow-auto">
            <CashRegisterOder products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
