export function Header({ brandName, brandTagline }: { brandName: string; brandTagline: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-4 px-5 md:px-12 py-5 bg-gradient-to-b from-bg/95 via-bg/50 to-transparent">
      <div className="font-serif text-ink text-sm md:text-[13px] tracking-[0.3em] uppercase">
        {brandName}
      </div>
      <div className="font-sans text-[8px] md:text-[9px] text-muted tracking-[0.25em] uppercase border border-accent-soft px-3 py-1.5">
        {brandTagline}
      </div>
    </header>
  );
}
