import { url, endpoints } from "@/constants/api";

export async function editProductAction(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const barcode = formData.get("barcode");
  const brand = formData.get("brand");
  const price = formData.get("price");
  const category_id = formData.get("category_id");
  const stock = formData.get("stock");
  const id = formData.get("id");

  const rawActive = formData.get("is_active");
  const is_active = rawActive === "1" ? true : false;

  const response = await fetch(`${url}${endpoints.products}/${id}`, {
    method: "PUT",
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
      is_active,
    }),
  });

  if (!response.ok) {
    return "Erro ao editar o produto.";
  }

  return "Produto editado com sucesso!";
}
