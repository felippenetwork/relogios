type FinalCtaProps = {
  kicker: string;
  title: string;
  titleEmphasis: string;
  subtitle: string;
  ctaText: string;
  scarcity: string;
  disclaimer: string;
  waLink: string;
};

export function FinalCta({
  kicker,
  title,
  titleEmphasis,
  subtitle,
  ctaText,
  scarcity,
  disclaimer,
  waLink,
}: FinalCtaProps) {
  return (
    <section className="relative max-w-[1120px] mx-auto px-5 py-[clamp(64px,12vw,120px)] text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,var(--accent-faint),transparent_70%)] pointer-events-none" />

      <div className="relative flex items-center justify-center gap-4 mb-8">
        <span className="w-7 h-px bg-accent" />
        <span className="font-sans text-[8px] tracking-[0.45em] text-accent uppercase">{kicker}</span>
        <span className="w-7 h-px bg-accent" />
      </div>

      <h2 className="relative text-balance font-serif font-normal text-[clamp(32px,5vw,60px)] leading-[1.15] text-ink m-0 mb-4">
        {title}
        <br />
        <em className="italic text-accent font-medium">{titleEmphasis}</em>
      </h2>

      <p className="relative font-body text-[17px] sm:text-[19px] leading-[1.7] text-muted max-w-[480px] mx-auto mb-8">
        {subtitle}
      </p>

      <div className="relative flex items-center justify-center gap-2 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="font-sans text-[9px] tracking-[0.22em] text-accent uppercase">{scarcity}</span>
      </div>

      <div className="relative flex flex-col items-center gap-3.5">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-bg font-sans font-bold text-[13px] tracking-[1.5px] uppercase px-9 py-[17px] rounded-[2px] no-underline cursor-pointer"
        >
          <span>{ctaText}</span>
          <span aria-hidden>→</span>
        </a>
        <span className="font-sans text-[9px] tracking-[0.18em] text-muted uppercase">{disclaimer}</span>
      </div>
    </section>
  );
}
