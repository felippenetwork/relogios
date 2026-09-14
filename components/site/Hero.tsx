import Image from "next/image";
import { Kicker } from "./Kicker";
import { ImagePlaceholder } from "./ImagePlaceholder";

type HeroProps = {
  photoUrl: string | null;
  specialistName: string;
  specialistRole: string;
  kicker: string;
  brandLocation: string;
  line1: string;
  line2: string;
  emphasis: string;
  subtitle: string;
  checklist: string[];
  priceFrom: string;
  ctaText: string;
  note: string;
  waLink: string;
};

export function Hero({
  photoUrl,
  specialistName,
  specialistRole,
  kicker,
  brandLocation,
  line1,
  line2,
  emphasis,
  subtitle,
  checklist,
  priceFrom,
  ctaText,
  note,
  waLink,
}: HeroProps) {
  return (
    <section className="relative px-5 py-[clamp(48px,10vw,96px)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-faint),transparent_60%)]" />
      <div className="relative max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,380px)_1fr] gap-10 md:gap-14 items-center">
        <div className="relative aspect-4/5 max-w-[380px] mx-auto md:mx-0 w-full rounded overflow-hidden">
          {photoUrl ? (
            <Image src={photoUrl} alt={specialistName} fill className="object-cover" />
          ) : (
            <ImagePlaceholder label="Foto do especialista" />
          )}
          <div className="absolute left-0 bottom-0 bg-bg/80 backdrop-blur-sm px-4 py-3">
            <div className="w-6 h-px bg-accent mb-2" />
            <div className="font-serif text-ink text-sm">{specialistName}</div>
            <div className="font-sans text-[11px] text-accent tracking-wide uppercase">
              {specialistRole}
            </div>
          </div>
        </div>

        <div>
          <Kicker>
            {kicker} · {brandLocation}
          </Kicker>
          <h1 className="text-balance font-serif font-bold text-[clamp(30px,6vw,52px)] leading-[1.12] text-ink m-0 mb-5">
            {line1}
            <br />
            {line2} <span className="italic text-accent font-medium">{emphasis}</span>
          </h1>
          <div className="w-10 h-px bg-accent-soft mb-5" />
          <p className="font-sans text-[16px] leading-[1.7] text-muted font-light max-w-[520px] mb-6">
            {subtitle}
          </p>

          {checklist.length > 0 && (
            <div className="mb-7 flex flex-col gap-2.5">
              {checklist.map((item, i) => (
                <div key={i} className="flex gap-2.5 font-sans text-sm text-ink">
                  <span className="text-accent shrink-0">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

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
      </div>
    </section>
  );
}
