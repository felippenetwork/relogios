"use client";

import { useEffect, useRef, useState } from "react";

type EntryGateProps = {
  kicker: string;
  brandLocation: string;
  line1: string;
  line2: string;
  emphasis: string;
  priceFrom: string;
  ctaText: string;
  note: string;
  children: React.ReactNode;
};

type Phase = "gated" | "leaving" | "entered";

export function EntryGate({
  kicker,
  brandLocation,
  line1,
  line2,
  emphasis,
  priceFrom,
  ctaText,
  note,
  children,
}: EntryGateProps) {
  const [phase, setPhase] = useState<Phase>("gated");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Send focus into the gate so keyboard/screen-reader users land on it
    // first, instead of tabbing into the (visually hidden) page underneath.
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phase === "entered") return;
    const { body, documentElement: html } = document;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, [phase]);

  function enter() {
    setPhase("leaving");
    setTimeout(() => setPhase("entered"), 950);
  }

  const gated = phase !== "entered";

  return (
    <>
      {gated && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Acesso ao catálogo"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-7 text-center bg-bg transition-[opacity,visibility] duration-[900ms] ease-in-out motion-reduce:transition-none ${
            phase === "leaving" ? "opacity-0 invisible pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="gate-line-top mb-9" />

          <p className="gate-eyebrow font-sans text-[9px] tracking-[0.45em] text-accent uppercase mb-8">
            Acesso restrito · {brandLocation}
          </p>

          <p className="gate-title text-balance font-serif font-normal text-[clamp(28px,7vw,52px)] leading-[1.2] text-ink m-0 mb-3 max-w-[720px]">
            {line1}
            <br />
            {line2} <em className="text-accent">{emphasis}</em>
          </p>

          <p className="gate-sub font-sans text-xs tracking-[0.12em] text-muted uppercase mb-[52px]">
            {kicker} · {priceFrom}
          </p>

          <button
            ref={buttonRef}
            type="button"
            onClick={enter}
            className="gate-btn inline-flex items-center gap-3.5 border border-accent text-accent bg-transparent font-sans text-[10px] tracking-[0.35em] uppercase px-10 py-4 cursor-pointer [touch-action:manipulation] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            <span>{ctaText}</span>
            <span aria-hidden className="relative z-10">
              →
            </span>
          </button>

          <p className="gate-note mt-7 font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
            {priceFrom} · {note}
          </p>

          <div className="gate-line-bottom mt-9" />
        </div>
      )}

      {/* `inert` removes the rest of the page from both the tab order and the
          accessibility tree while the gate is open — without it, keyboard and
          screen-reader users could reach content that's only visually hidden. */}
      <div inert={gated || undefined}>{children}</div>
    </>
  );
}
