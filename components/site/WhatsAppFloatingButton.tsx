export function WhatsAppFloatingButton({ waLink }: { waLink: string }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className="btn-fixed-glow fixed inset-x-0 bottom-1.5 md:inset-x-auto md:right-6 md:bottom-6 z-45 flex items-center justify-center gap-2.5 bg-accent text-bg font-sans font-bold text-[10px] tracking-[0.15em] md:tracking-[0.18em] uppercase no-underline px-5 py-4 md:px-6 md:py-3.5 rounded-[2px] border border-accent-soft [margin-bottom:env(safe-area-inset-bottom)] focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
    >
      <span aria-hidden>💬</span>
      <span>Ver peças disponíveis agora</span>
    </a>
  );
}
