import { createClient } from "@/lib/supabase/server";
import { TestimonialsCopyForm } from "@/components/admin/TestimonialsCopyForm";
import { TestimonialList } from "@/components/admin/TestimonialList";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: testimonials }] = await Promise.all([
    supabase
      .from("site_settings")
      .select("testimonials_kicker, testimonials_title, testimonials_title_emphasis")
      .eq("id", 1)
      .single(),
    supabase.from("testimonials").select("*").order("position"),
  ]);

  if (!settings) return null;

  return (
    <div>
      <TestimonialsCopyForm settings={settings} />
      <div className="h-px bg-line my-6" />
      <TestimonialList testimonials={testimonials ?? []} />
    </div>
  );
}
