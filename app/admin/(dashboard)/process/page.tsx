import { createClient } from "@/lib/supabase/server";
import { ProcessForm } from "@/components/admin/ProcessForm";

export default async function AdminProcessPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("process_kicker, process_title, process_title_emphasis, process_steps")
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <ProcessForm settings={settings} />;
}
