import { url, endpoints } from "@/constants/api";
import TableProducts from "@/components/productTable";
import type { CategoryListType, ProductsType } from "@/types/productsType";

export default async function Product() {
  let products: ProductsType[] = [];
  let categories: CategoryListType = [];

  try {
    const response = await fetch(`${url}${endpoints.products.get}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    products = data.data;
  } catch (error) {
    console.log(error);
  }

  const categoriesResponse = await fetch(`${url}${endpoints.category.get}`, {
    method: "GET",
    cache: "no-store",
  });
  const categoriesData = await categoriesResponse.json();
  categories = categoriesData.data;

  return (
    <section className="w-full h-screen p-5">
      <div className="w-full rounded-2xl bg-contentTheme shadow-2xl p-5">
        <TableProducts products={products} categories={categories} />
      </div>
    </section>
  );
}
