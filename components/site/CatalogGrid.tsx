import Image from "next/image";
import type { ProductRow } from "@/lib/supabase/types";
import { waLinkFor } from "@/lib/whatsapp";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function CatalogGrid({
  products,
  whatsappNumber,
}: {
  products: ProductRow[];
  whatsappNumber: string;
}) {
  return (
    <div>
      <div
        className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:gap-px md:bg-line md:border md:border-line md:overflow-visible"
      >
        {products.map((p) => (
          <a
            key={p.id}
            href={waLinkFor(whatsappNumber, p.name)}
            target="_blank"
            rel="noreferrer"
            className="group relative block no-underline shrink-0 basis-[76vw] snap-start border border-line md:basis-auto md:border-0 md:shrink bg-bg overflow-hidden"
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 76vw"
                  className="object-cover brightness-[0.85] saturate-[0.9] transition-[filter,transform] duration-500 ease-out group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.04]"
                />
              ) : (
                <ImagePlaceholder />
              )}
              <div className="pointer-events-none absolute top-0 right-0 w-[22px] h-[22px] border-t border-r border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 px-5 pt-9 pb-5 bg-gradient-to-t from-bg/95 to-transparent translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
                <div className="font-serif text-ink text-[17px] mb-1">{p.name}</div>
                <div className="font-sans text-[8px] text-accent tracking-[0.28em] uppercase mb-2">
                  {p.tag}
                </div>
                <div className="font-serif italic text-accent text-[13px]">{p.price}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="md:hidden mt-3 text-center font-sans text-[9px] tracking-[0.2em] text-muted uppercase">
        ← Deslize para ver todos →
      </p>
    </div>
  );
}
