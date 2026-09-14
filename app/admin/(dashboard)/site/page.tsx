import { createClient } from "@/lib/supabase/server";
import { SiteForm } from "@/components/admin/SiteForm";

export default async function AdminSitePage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  if (!settings) return null;
  return <SiteForm settings={settings} />;
}
