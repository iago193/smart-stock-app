import { url, endpoints } from "@/constants/api";

export async function createProductAction(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const barcode = formData.get("barcode");
  const brand = formData.get("brand");
  const price = formData.get("price");
  const category_id = formData.get("category_id");
  const stock = formData.get("stock");
  const sku = `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const response = await fetch(`${url}${endpoints.products}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      barcode,
      brand,
      stock,
      price,
      category_id,
      sku,
    }),
  });

  if (!response.ok) {
    return "Erro ao criar o produto.";
  }

  return "Produto criado com sucesso!";
}
