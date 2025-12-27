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
    <section className="w-full h-screen p-5">
      <div className="w-full rounded-2xl bg-contentTheme shadow-2xl p-5">
          <TableProducts products={products} />
      </div>
    </section>
  );
}
