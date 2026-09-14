export type Stat = { num: string; label: string };
export type ValueBlock = { label: string; head: string; body: string; bullets: string[] };

export type SiteSettingsRow = {
  id: number;
  brand_name: string;
  brand_tagline: string;
  brand_location: string;
  hero_kicker: string;
  hero_line1: string;
  hero_line2: string;
  hero_emphasis: string;
  hero_subtitle: string;
  hero_price_from: string;
  hero_cta_text: string;
  hero_note: string;
  hero_img_url: string | null;
  stats: Stat[];
  catalog_kicker: string;
  catalog_title: string;
  catalog_title_emphasis: string;
  catalog_subtitle: string;
  value_kicker: string;
  value_title: string;
  value_title_emphasis: string;
  value_blocks: ValueBlock[];
  testimonials_kicker: string;
  testimonials_title: string;
  testimonials_title_emphasis: string;
  about_kicker: string;
  about_name: string;
  about_role: string;
  about_bio: string;
  about_bullets: string[];
  about_img_url: string | null;
  process_kicker: string;
  process_title: string;
  process_title_emphasis: string;
  process_steps: string[];
  faq_kicker: string;
  faq_title: string;
  faq_title_emphasis: string;
  final_cta_kicker: string;
  final_cta_title: string;
  final_cta_title_emphasis: string;
  final_cta_subtitle: string;
  final_cta_cta_text: string;
  final_cta_scarcity: string;
  accent_color: string;
  whatsapp_number: string;
  whatsapp_message: string;
  updated_at: string;
};

export type ProductRow = {
  id: string;
  name: string;
  tag: string;
  price: string;
  image_url: string | null;
  position: number;
  created_at: string;
};

export type TestimonialRow = {
  id: string;
  name: string;
  detail: string;
  quote_text: string;
  image_url: string | null;
  position: number;
  created_at: string;
};

export type FaqItemRow = {
  id: string;
  question: string;
  answer: string;
  position: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Partial<SiteSettingsRow>;
        Update: Partial<SiteSettingsRow>;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: Partial<ProductRow>;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: Partial<TestimonialRow>;
        Update: Partial<TestimonialRow>;
        Relationships: [];
      };
      faq_items: {
        Row: FaqItemRow;
        Insert: Partial<FaqItemRow>;
        Update: Partial<FaqItemRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
