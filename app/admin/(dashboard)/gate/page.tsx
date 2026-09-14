import { createClient } from "@/lib/supabase/server";
import { GateForm } from "@/components/admin/GateForm";

export default async function AdminGatePage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("gate_kicker, gate_line1, gate_line2, gate_emphasis, gate_price_from, gate_cta_text, gate_note")
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <GateForm settings={settings} />;
}
