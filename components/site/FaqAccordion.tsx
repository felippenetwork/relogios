"use client";

import { useState } from "react";
import type { FaqItemRow } from "@/lib/supabase/types";

export function FaqAccordion({ items }: { items: FaqItemRow[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-px bg-line border border-line">
      {items.map((f) => {
        const isOpen = openId === f.id;
        return (
          <div key={f.id} className="bg-panel">
            <button
              onClick={() => setOpenId(isOpen ? null : f.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-5 bg-transparent border-none px-6 py-6 cursor-pointer text-left font-serif text-[17px] leading-[1.4] text-ink transition-colors hover:bg-accent-faint focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
            >
              <span>{f.question}</span>
              <span
                aria-hidden
                className={`shrink-0 w-6 h-6 flex items-center justify-center border border-accent-soft text-accent text-sm font-sans transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="font-serif text-[16px] leading-[1.8] text-muted px-6 pb-6">{f.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
