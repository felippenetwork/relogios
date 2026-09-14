import type { ValueBlock } from "@/lib/supabase/types";

export function ValueBlocks({ blocks }: { blocks: ValueBlock[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
      {blocks.map((b, i) => (
        <div key={i} className="border border-line rounded p-6 sm:p-7 bg-bg">
          <div className="font-sans text-[11px] tracking-[2px] uppercase text-accent mb-3.5">
            {b.label}
          </div>
          <h3 className="font-serif text-[22px] text-ink m-0 mb-3">{b.head}</h3>
          <p className="font-body text-[15px] leading-[1.7] text-muted mb-[18px]">
            {b.body}
          </p>
          {b.bullets.map((x, j) => (
            <div key={j} className="flex gap-2.5 mb-2 font-sans text-sm text-ink">
              <span className="text-accent">—</span>
              <span>{x}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
