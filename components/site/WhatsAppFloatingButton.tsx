export function WhatsAppFloatingButton({ waLink }: { waLink: string }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[22px] right-[22px] w-[54px] h-[54px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,.4)] z-45 no-underline text-2xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      💬
    </a>
  );
}
