import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { hexToRgba } from "@/lib/color";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("brand_name, brand_tagline")
    .eq("id", 1)
    .single();

  return {
    title: data?.brand_name ?? "Catálogo",
    description: data?.brand_tagline ?? "Curadoria exclusiva",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("accent_color")
    .eq("id", 1)
    .single();

  const accent = settings?.accent_color ?? "#c8a45c";
  const accentSoft = hexToRgba(accent, 0.22);
  const accentFaint = hexToRgba(accent, 0.08);

  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable}`}
      style={
        {
          "--accent": accent,
          "--accent-soft": accentSoft,
          "--accent-faint": accentFaint,
        } as React.CSSProperties
      }
    >
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
