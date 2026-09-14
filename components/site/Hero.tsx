import Image from "next/image";
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
  scarcity: string;
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
  scarcity,
  waLink,
}: HeroProps) {
  return (
    <section className="relative grid md:grid-cols-2 md:min-h-screen overflow-hidden">
      {/* Photo: full-bleed, glued to the top edge — the fixed Header floats over it. */}
      <div className="relative h-[46vh] min-h-[320px] md:h-auto">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={specialistName}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[center_20%] grayscale-[25%] brightness-[0.75]"
          />
        ) : (
          <ImagePlaceholder label="Foto do especialista" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg" />
        <div className="absolute left-5 md:left-10 bottom-5 md:bottom-12 z-10">
          <div className="w-8 h-px bg-accent mb-2.5" />
          <div className="font-serif text-ink text-lg md:text-xl">{specialistName}</div>
          <div className="font-sans text-[9px] text-accent tracking-[0.3em] uppercase">
            {specialistRole}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 md:px-16 pt-10 pb-12 md:pt-32 md:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-px bg-accent shrink-0" />
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.38em] text-accent uppercase">
            {kicker} · {brandLocation}
          </span>
        </div>

        <h1 className="text-balance font-serif font-normal text-[clamp(28px,4.5vw,50px)] leading-[1.15] text-ink m-0 mb-5">
          {line1}
          <br />
          {line2} <em className="italic text-accent font-medium">{emphasis}</em>
        </h1>

        <p className="font-body text-[15px] leading-[1.7] text-muted max-w-[480px] mb-6">
          {subtitle}
        </p>

        {checklist.length > 0 && (
          <div className="mb-7 flex flex-col gap-3">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 font-sans text-[13px] tracking-wide text-ink leading-[1.5]">
                <span className="mt-[5px] w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block w-fit bg-accent text-bg font-sans font-bold text-[13px] tracking-[1.5px] uppercase px-[30px] py-4 rounded-[2px] no-underline cursor-pointer"
        >
          {ctaText}
        </a>
        <div className="mt-5 font-sans text-xs text-muted tracking-wide">
          {priceFrom} · {note}
        </div>
        <div className="mt-3 inline-flex w-fit items-center gap-2 border border-accent-soft px-3.5 py-[7px]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-sans text-[9px] tracking-[0.2em] text-accent uppercase">
            {scarcity}
          </span>
        </div>
      </div>
    </section>
  );
}
