export function WhatsAppFloatingButton({ waLink }: { waLink: string }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className="btn-fixed-glow fixed inset-x-0 bottom-0 md:inset-x-auto md:right-6 md:bottom-6 z-45 flex items-center justify-center gap-2.5 bg-accent text-bg font-sans font-bold text-[10px] tracking-[0.15em] md:tracking-[0.18em] uppercase no-underline px-5 py-4 md:px-6 md:py-3.5 md:rounded-[2px] border border-accent-soft [padding-bottom:calc(1rem+env(safe-area-inset-bottom))] md:[padding-bottom:0.875rem] focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
    >
      <span aria-hidden>💬</span>
      <span>Ver peças disponíveis agora</span>
    </a>
  );
}
