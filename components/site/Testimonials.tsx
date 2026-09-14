import Image from "next/image";
import type { TestimonialRow } from "@/lib/supabase/types";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Testimonials({ items }: { items: TestimonialRow[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
      {items.map((t) => (
        <div key={t.id} className="border border-line rounded p-6 bg-panel">
          <div className="text-accent text-sm tracking-[2px] mb-3.5">★★★★★</div>
          <p className="font-serif italic text-base leading-[1.6] text-ink m-0 mb-[18px]">
            &ldquo;{t.quote_text}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden shrink-0 relative">
              {t.image_url ? (
                <Image src={t.image_url} alt={t.name} fill className="object-cover" />
              ) : (
                <ImagePlaceholder label="Foto" small />
              )}
            </div>
            <div>
              <div className="font-sans text-sm text-ink font-medium">{t.name}</div>
              <div className="font-sans text-xs text-muted">{t.detail}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
