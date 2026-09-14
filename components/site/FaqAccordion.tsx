"use client";

import { useState } from "react";
import type { FaqItemRow } from "@/lib/supabase/types";

export function FaqAccordion({ items }: { items: FaqItemRow[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((f) => {
        const isOpen = openId === f.id;
        return (
          <div key={f.id} className="border-b border-line">
            <button
              onClick={() => setOpenId(isOpen ? null : f.id)}
              aria-expanded={isOpen}
              className="w-full flex justify-between items-center gap-4 bg-transparent border-none py-5 cursor-pointer text-left font-serif text-[17px] text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <span>{f.question}</span>
              <span className="text-accent text-xl leading-none shrink-0">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="font-sans text-[15px] leading-[1.7] text-muted font-light pb-5">
                {f.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
