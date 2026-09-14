export function Header({ brandName, brandTagline }: { brandName: string; brandTagline: string }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-[18px] border-b border-line sticky top-0 z-40 bg-bg/85 backdrop-blur-sm">
      <div className="font-serif text-ink text-lg tracking-wide">{brandName}</div>
      <div className="font-sans text-[11px] text-muted tracking-wider uppercase">{brandTagline}</div>
    </header>
  );
}
