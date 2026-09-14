import type { Metadata, Viewport } from "next";
import { Playfair_Display, Didact_Gothic, EB_Garamond } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { hexToRgba } from "@/lib/color";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const didactGothic = Didact_Gothic({
  variable: "--font-didact",
  subsets: ["latin"],
  weight: "400",
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

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
      className={`${playfair.variable} ${didactGothic.variable} ${ebGaramond.variable}`}
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
