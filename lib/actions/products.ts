"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import type { ProductRow } from "@/lib/supabase/types";

export async function createProduct(position: number) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("products").insert({
    name: "Novo produto",
    tag: "Disponível",
    price: "A partir de R$ 0.000",
    position,
  });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/catalog");
  return { error: null };
}

export async function updateProduct(id: string, patch: Partial<ProductRow>) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("products").update(patch).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/catalog");
  return { error: null };
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/catalog");
  return { error: null };
}

export async function swapProductPosition(idA: string, positionA: number, idB: string, positionB: number) {
  const { supabase } = await requireUser();

  const [a, b] = await Promise.all([
    supabase.from("products").update({ position: positionB }).eq("id", idA),
    supabase.from("products").update({ position: positionA }).eq("id", idB),
  ]);
  const error = a.error?.message ?? b.error?.message ?? null;
  if (error) return { error };

  revalidatePath("/");
  revalidatePath("/admin/catalog");
  return { error: null };
}
