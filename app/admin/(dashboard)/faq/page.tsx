import { createClient } from "@/lib/supabase/server";
import { FaqCopyForm } from "@/components/admin/FaqCopyForm";
import { FaqList } from "@/components/admin/FaqList";

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: faqItems }] = await Promise.all([
    supabase
      .from("site_settings")
      .select("faq_kicker, faq_title, faq_title_emphasis")
      .eq("id", 1)
      .single(),
    supabase.from("faq_items").select("*").order("position"),
  ]);

  if (!settings) return null;

  return (
    <div>
      <FaqCopyForm settings={settings} />
      <div className="h-px bg-line my-6" />
      <FaqList items={faqItems ?? []} />
    </div>
  );
}
