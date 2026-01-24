import { url, endpoints } from "@/constants/api";

export default async function actionPreviewImage(file: File, userId: number) {
  const formData = new FormData();
  formData.append("image", file);

  console.log("estamos aqui na action");

  const res = await fetch(`${url}${endpoints.uploadImage}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao enviar imagem");
  }

  return await res.json();
}
