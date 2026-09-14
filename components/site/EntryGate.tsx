"use client";

import { useEffect, useState } from "react";
import { Kicker } from "./Kicker";

type EntryGateProps = {
  kicker: string;
  brandLocation: string;
  line1: string;
  line2: string;
  emphasis: string;
  priceFrom: string;
  ctaText: string;
  note: string;
};

type Phase = "gated" | "revealing" | "entered";

export function EntryGate({
  kicker,
  brandLocation,
  line1,
  line2,
  emphasis,
  priceFrom,
  ctaText,
  note,
}: EntryGateProps) {
  const [phase, setPhase] = useState<Phase>("gated");

  useEffect(() => {
    if (phase === "entered") return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevOverflow;
    };
  }, [phase]);

  if (phase === "entered") return null;

  function enter() {
    setPhase("revealing");
    setTimeout(() => setPhase("entered"), 700);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-5 text-center bg-bg transition-opacity duration-700 ${
        phase === "revealing" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-faint),transparent_60%)]" />
      <div className="relative max-w-[560px]">
        <Kicker>
          Acesso restrito · {brandLocation}
        </Kicker>
        <h1 className="font-serif font-bold text-[clamp(30px,8vw,52px)] leading-[1.1] text-ink m-0 mb-6">
          {line1}
          <br />
          {line2} <span className="italic text-accent font-medium">{emphasis}</span>
        </h1>
        <p className="font-sans text-sm text-muted mb-7">
          {kicker} · {priceFrom}
        </p>
        <button
          type="button"
          onClick={enter}
          className="inline-flex items-center gap-2 bg-transparent border border-accent-soft text-accent font-sans font-semibold text-[13px] tracking-[1.5px] uppercase px-[30px] py-4 rounded-[2px] cursor-pointer"
        >
          {ctaText}
          <span aria-hidden>→</span>
        </button>
        <div className="mt-5 font-sans text-xs text-muted tracking-wide">
          {priceFrom} · {note}
        </div>
      </div>
    </div>
  );
}
