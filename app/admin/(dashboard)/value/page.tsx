import { createClient } from "@/lib/supabase/server";
import { ValueForm } from "@/components/admin/ValueForm";

export default async function AdminValuePage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("value_kicker, value_title, value_title_emphasis, value_blocks")
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <ValueForm settings={settings} />;
}
