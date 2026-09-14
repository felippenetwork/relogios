import { createClient } from "@/lib/supabase/server";
import { AppearanceForm } from "@/components/admin/AppearanceForm";

export default async function AdminAppearancePage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("accent_color, whatsapp_number, whatsapp_message")
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <AppearanceForm settings={settings} />;
}
