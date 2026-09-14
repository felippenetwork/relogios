"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import type { SiteSettingsRow } from "@/lib/supabase/types";

export async function updateSiteSettings(patch: Partial<SiteSettingsRow>) {
  const { supabase } = await requireUser();

  const { error } = await supabase.from("site_settings").update(patch).eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { error: null };
}
