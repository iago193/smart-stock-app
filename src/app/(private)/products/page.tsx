import { url, endpoints } from "@/constants/api";
import TableProducts from "@/components/productTable";
import type { CategoryListType, ProductsType } from "@/types/productsType";

export default async function Product() {
  let products: ProductsType[] = [];
  let categories: CategoryListType = [];

  // const sleep = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // await sleep(9000);

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

  try {
    const categoriesResponse = await fetch(`${url}${endpoints.categories}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!categoriesResponse.ok) {
      throw new Error("API respondeu com erro");
    }

    const categoriesData = await categoriesResponse.json();
    categories = categoriesData.data;
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao conectar com a API");
  }

  return (
    <section className="w-full h-screen p-5">
      <div className="w-full rounded-2xl bg-contentTheme shadow-2xl p-5">
        <TableProducts products={products} categories={categories} />
      </div>
    </section>
  );
}
