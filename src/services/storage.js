import { supabase } from "../lib/supabase";

export async function uploadImage(file) {
  console.log("========== INICIO UPLOAD ==========");
  console.log("Arquivo recebido:", file);

  if (!file) {
    throw new Error("Nenhuma imagem foi enviada.");
  }

  const fileName =
    Date.now() +
    "-" +
    file.name.replace(/\s/g, "_");

  console.log("Nome do arquivo:", fileName);

  const { error } = await supabase.storage
    .from("produtos")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } = supabase.storage
    .from("produtos")
    .getPublicUrl(fileName);

  console.log("URL:", data.publicUrl);

  return data.publicUrl;
}