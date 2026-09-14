"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import type { FaqItemRow } from "@/lib/supabase/types";

export async function createFaqItem(position: number) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("faq_items").insert({
    question: "Nova pergunta?",
    answer: "Resposta.",
    position,
  });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { error: null };
}

export async function updateFaqItem(id: string, patch: Partial<FaqItemRow>) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("faq_items").update(patch).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { error: null };
}

export async function deleteFaqItem(id: string) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { error: null };
}

export async function swapFaqPosition(idA: string, positionA: number, idB: string, positionB: number) {
  const { supabase } = await requireUser();

  const [a, b] = await Promise.all([
    supabase.from("faq_items").update({ position: positionB }).eq("id", idA),
    supabase.from("faq_items").update({ position: positionA }).eq("id", idB),
  ]);
  const error = a.error?.message ?? b.error?.message ?? null;
  if (error) return { error };

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { error: null };
}
