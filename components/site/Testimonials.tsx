import Image from "next/image";
import type { TestimonialRow } from "@/lib/supabase/types";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Testimonials({ items }: { items: TestimonialRow[] }) {
  return (
    <div>
      {/* Client photos: swipeable on mobile, tight mosaic on desktop — mirrors CatalogGrid. */}
      <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:gap-px md:bg-line md:border md:border-line md:overflow-visible">
        {items.map((t) => (
          <div
            key={t.id}
            className="group relative shrink-0 basis-[76vw] snap-start border border-line md:basis-auto md:border-0 bg-bg overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {t.image_url ? (
                <Image
                  src={t.image_url}
                  alt={t.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 76vw"
                  className="object-cover brightness-[0.85] saturate-[0.85] transition-[filter] duration-500 group-hover:brightness-100 group-hover:saturate-100"
                />
              ) : (
                <ImagePlaceholder label="Foto" />
              )}
              <div className="absolute inset-x-0 bottom-0 px-4 pt-7 pb-4 bg-gradient-to-t from-bg/90 to-transparent translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                <div className="font-serif text-ink text-sm mb-0.5">{t.name}</div>
                <div className="font-sans text-[8px] text-accent tracking-[0.25em] uppercase">
                  {t.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="md:hidden mt-3 text-center font-sans text-[9px] tracking-[0.2em] text-muted uppercase">
        ← Deslize para ver todos →
      </p>

      {/* Quote cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-px md:bg-line md:border md:border-line">
        {items.map((t) => (
          <div key={t.id} className="relative border border-line md:border-0 bg-panel p-7 overflow-hidden">
            <span className="absolute top-2 left-4 font-serif italic text-accent/10 text-[56px] leading-none pointer-events-none">
              &ldquo;
            </span>
            <p className="relative font-body italic text-[18px] leading-[1.65] text-ink mt-5">
              {t.quote_text}
            </p>
            <div className="relative mt-4 text-accent text-[10px] tracking-[0.2em]">★★★★★</div>
            <div className="relative font-serif text-ink text-sm mt-4">{t.name}</div>
            <div className="relative font-sans text-[8px] text-accent tracking-[0.25em] uppercase mt-0.5">
              {t.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
