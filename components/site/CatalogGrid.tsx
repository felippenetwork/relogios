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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
      {products.map((p) => (
        <a
          key={p.id}
          href={waLinkFor(whatsappNumber, p.name)}
          target="_blank"
          rel="noreferrer"
          className="block no-underline border border-line hover:border-accent-soft rounded overflow-hidden bg-panel transition-colors"
        >
          <div className="aspect-square relative">
            {p.image_url ? (
              <Image src={p.image_url} alt={p.name} fill className="object-cover" />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
          <div className="px-4 pt-4 pb-[18px]">
            <div className="font-serif text-ink text-[17px] mb-1">{p.name}</div>
            <div className="font-sans text-xs text-muted mb-2.5">{p.tag}</div>
            <div className="font-sans text-[13px] text-accent font-medium">{p.price}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
