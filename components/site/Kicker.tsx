export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans uppercase tracking-[3px] text-[11px] text-accent font-semibold mb-3.5">
      {children}
    </div>
  );
}

export function SectionTitle({ title, emphasis }: { title: string; emphasis?: string }) {
  return (
    <h2 className="font-serif font-bold text-[clamp(28px,7vw,44px)] leading-[1.12] text-ink m-0">
      {title} {emphasis && <span className="italic text-accent font-medium">{emphasis}</span>}
    </h2>
  );
}
