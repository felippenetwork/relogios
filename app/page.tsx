import { createClient } from "@/lib/supabase/server";
import { waLink } from "@/lib/whatsapp";
import { EntryGate } from "@/components/site/EntryGate";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { StatsBar } from "@/components/site/StatsBar";
import { Kicker, SectionTitle } from "@/components/site/Kicker";
import { CatalogGrid } from "@/components/site/CatalogGrid";
import { ValueBlocks } from "@/components/site/ValueBlocks";
import { Testimonials } from "@/components/site/Testimonials";
import { AboutSpecialist } from "@/components/site/AboutSpecialist";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloatingButton } from "@/components/site/WhatsAppFloatingButton";
import { scarcityText } from "@/lib/scarcity";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: settings }, { data: products }, { data: testimonials }, { data: faqItems }] =
    await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).single(),
      supabase.from("products").select("*").order("position"),
      supabase.from("testimonials").select("*").order("position"),
      supabase.from("faq_items").select("*").order("position"),
    ]);

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center text-accent font-serif">
        Configuração do site não encontrada.
      </div>
    );
  }

  const wa = waLink(settings.whatsapp_number, settings.whatsapp_message);
  const scarcity = scarcityText(products?.length ?? 0);

  return (
    <EntryGate
      kicker={settings.gate_kicker}
      brandLocation={settings.brand_location}
      line1={settings.gate_line1}
      line2={settings.gate_line2}
      emphasis={settings.gate_emphasis}
      priceFrom={settings.gate_price_from}
      ctaText={settings.gate_cta_text}
      note={settings.gate_note}
    >
    <div className="min-h-screen">
      <Header brandName={settings.brand_name} brandTagline={settings.brand_tagline} />

      <Hero
        photoUrl={settings.about_img_url}
        specialistName={settings.about_name}
        specialistRole={settings.about_role}
        kicker={settings.hero_kicker}
        brandLocation={settings.brand_location}
        line1={settings.hero_line1}
        line2={settings.hero_line2}
        emphasis={settings.hero_emphasis}
        subtitle={settings.hero_subtitle}
        checklist={settings.about_bullets}
        priceFrom={settings.hero_price_from}
        ctaText={settings.hero_cta_text}
        note={settings.hero_note}
        scarcity={scarcity}
        waLink={wa}
      />

      <StatsBar stats={settings.stats} />

      <section className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
        <div className="text-center max-w-[620px] mx-auto mb-11">
          <Kicker>{settings.catalog_kicker}</Kicker>
          <SectionTitle title={settings.catalog_title} emphasis={settings.catalog_title_emphasis} />
          <p className="font-body text-[15px] leading-[1.7] text-muted mt-4">
            {settings.catalog_subtitle}
          </p>
        </div>
        <CatalogGrid products={products ?? []} whatsappNumber={settings.whatsapp_number} />
      </section>

      <section className="bg-panel border-y border-line">
        <div className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
          <div className="text-center mb-11">
            <Kicker>{settings.value_kicker}</Kicker>
            <SectionTitle title={settings.value_title} emphasis={settings.value_title_emphasis} />
          </div>
          <ValueBlocks blocks={settings.value_blocks} />
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
        <div className="text-center mb-11">
          <Kicker>{settings.testimonials_kicker}</Kicker>
          <SectionTitle title={settings.testimonials_title} emphasis={settings.testimonials_title_emphasis} />
        </div>
        <Testimonials items={testimonials ?? []} />
      </section>

      <section className="bg-panel border-y border-line">
        <div className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
          <AboutSpecialist
            kicker={settings.about_kicker}
            name={settings.about_name}
            role={settings.about_role}
            bio={settings.about_bio}
            bullets={settings.about_bullets}
            imgUrl={settings.about_img_url}
          />
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
        <div className="text-center mb-11">
          <Kicker>{settings.process_kicker}</Kicker>
          <SectionTitle title={settings.process_title} emphasis={settings.process_title_emphasis} />
        </div>
        <ProcessSteps steps={settings.process_steps} />
      </section>

      <section className="bg-panel border-y border-line">
        <div className="max-w-[760px] mx-auto px-5 py-[clamp(52px,10vw,88px)]">
          <div className="text-center mb-10">
            <Kicker>{settings.faq_kicker}</Kicker>
            <SectionTitle title={settings.faq_title} emphasis={settings.faq_title_emphasis} />
          </div>
          <FaqAccordion items={faqItems ?? []} />
        </div>
      </section>

      <FinalCta
        kicker={settings.final_cta_kicker}
        title={settings.final_cta_title}
        titleEmphasis={settings.final_cta_title_emphasis}
        subtitle={settings.final_cta_subtitle}
        ctaText={settings.final_cta_cta_text}
        scarcity={scarcity}
        disclaimer={`${settings.hero_price_from} · ${settings.stats[0]?.num} ${settings.stats[0]?.label} · ${settings.brand_location}`}
        waLink={wa}
      />

      <Footer brandName={settings.brand_name} brandLocation={settings.brand_location} />

      <WhatsAppFloatingButton waLink={wa} />
    </div>
    </EntryGate>
  );
}
