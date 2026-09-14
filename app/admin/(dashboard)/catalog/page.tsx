import { createClient } from "@/lib/supabase/server";
import { CatalogCopyForm } from "@/components/admin/CatalogCopyForm";
import { ProductList } from "@/components/admin/ProductList";

export default async function AdminCatalogPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: products }] = await Promise.all([
    supabase
      .from("site_settings")
      .select("catalog_kicker, catalog_title, catalog_title_emphasis, catalog_subtitle")
      .eq("id", 1)
      .single(),
    supabase.from("products").select("*").order("position"),
  ]);

  if (!settings) return null;

  return (
    <div>
      <CatalogCopyForm settings={settings} />
      <div className="h-px bg-line my-6" />
      <ProductList products={products ?? []} />
    </div>
  );
}
