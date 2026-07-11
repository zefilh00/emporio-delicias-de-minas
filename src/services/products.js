import { supabase } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function createProduct(product) {
  const { error } = await supabase
    .from("products")
    .insert(product);

  if (error) throw error;
}

export async function updateProduct(id, product) {
  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}