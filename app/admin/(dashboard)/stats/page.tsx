import { createClient } from "@/lib/supabase/server";
import { StatsForm } from "@/components/admin/StatsForm";

export default async function AdminStatsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("stats").eq("id", 1).single();

  if (!settings) return null;
  return <StatsForm stats={settings.stats} />;
}
