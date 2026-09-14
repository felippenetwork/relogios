"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import type { TestimonialRow } from "@/lib/supabase/types";

export async function createTestimonial(position: number) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("testimonials").insert({
    name: "Cliente",
    detail: "Produto · Cidade",
    quote_text: "Novo depoimento.",
    position,
  });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { error: null };
}

export async function updateTestimonial(id: string, patch: Partial<TestimonialRow>) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("testimonials").update(patch).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { error: null };
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { error: null };
}

export async function swapTestimonialPosition(
  idA: string,
  positionA: number,
  idB: string,
  positionB: number
) {
  const { supabase } = await requireUser();

  const [a, b] = await Promise.all([
    supabase.from("testimonials").update({ position: positionB }).eq("id", idA),
    supabase.from("testimonials").update({ position: positionA }).eq("id", idB),
  ]);
  const error = a.error?.message ?? b.error?.message ?? null;
  if (error) return { error };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { error: null };
}
