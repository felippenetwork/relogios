import { Kicker } from "./Kicker";

type HeroProps = {
  heroImgUrl: string | null;
  kicker: string;
  brandLocation: string;
  line1: string;
  line2: string;
  emphasis: string;
  subtitle: string;
  priceFrom: string;
  ctaText: string;
  note: string;
  waLink: string;
};

export function Hero({
  heroImgUrl,
  kicker,
  brandLocation,
  line1,
  line2,
  emphasis,
  subtitle,
  priceFrom,
  ctaText,
  note,
  waLink,
}: HeroProps) {
  return (
    <section className="relative px-5 py-[clamp(60px,14vw,120px)] text-center overflow-hidden">
      {heroImgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.28]"
          style={{ backgroundImage: `url(${heroImgUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-faint),transparent_60%)]" />
      <div className="relative max-w-[780px] mx-auto">
        <Kicker>
          {kicker} · {brandLocation}
        </Kicker>
        <h1 className="font-serif font-bold text-[clamp(34px,9vw,64px)] leading-[1.08] text-ink m-0 mb-6">
          {line1}
          <br />
          {line2} <span className="italic text-accent font-medium">{emphasis}</span>
        </h1>
        <p className="font-sans text-[16px] leading-[1.7] text-muted font-light max-w-[560px] mx-auto mb-8">
          {subtitle}
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-accent text-bg font-sans font-semibold text-[13px] tracking-[1.5px] uppercase px-[30px] py-4 rounded-[2px] no-underline cursor-pointer"
        >
          {ctaText}
        </a>
        <div className="mt-5 font-sans text-xs text-muted tracking-wide">
          {priceFrom} · {note}
        </div>
      </div>
    </section>
  );
}
