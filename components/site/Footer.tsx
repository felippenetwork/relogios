export function Footer({ brandName, brandLocation }: { brandName: string; brandLocation: string }) {
  return (
    <footer className="border-t border-line px-5 py-7 text-center font-sans text-xs text-muted">
      {brandName} · {brandLocation} — © {new Date().getFullYear()}
    </footer>
  );
}
