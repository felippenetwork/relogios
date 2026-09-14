import { createClient } from "@/lib/supabase/server";
import { FinalCtaForm } from "@/components/admin/FinalCtaForm";

export default async function AdminFinalCtaPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "final_cta_kicker, final_cta_title, final_cta_title_emphasis, final_cta_subtitle, final_cta_cta_text"
    )
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <FinalCtaForm settings={settings} />;
}
