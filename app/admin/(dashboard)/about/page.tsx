import { createClient } from "@/lib/supabase/server";
import { AboutForm } from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("about_kicker, about_name, about_role, about_bio, about_bullets, about_img_url")
    .eq("id", 1)
    .single();

  if (!settings) return null;
  return <AboutForm settings={settings} />;
}
