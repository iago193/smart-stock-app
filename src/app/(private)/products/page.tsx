import { url, endpoints } from "@/constants/api";
import TableProducts from '@/components/productTable';
import type { ProductsType } from "@/types/productsType";

export default async function Product() {

  let products :ProductsType[] = [];

  try {
    const response = await fetch(`${url}${endpoints.products}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    products = data.data
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="m-5">
      <div className="w-full rounded-2xl bg-contentTheme shadow-2xl p-5">
          <TableProducts products={products} />
      </div>

      <div className="w-ful flex gap-2">
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
        <button className="rounded-2xl p-2 mt-2 bg-contentTheme shadow-xl text-center">
          btn1
        </button>
      </div>
    </section>
  );
}
