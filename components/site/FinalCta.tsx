import { Kicker, SectionTitle } from "./Kicker";

type FinalCtaProps = {
  kicker: string;
  title: string;
  titleEmphasis: string;
  subtitle: string;
  ctaText: string;
  scarcity: string;
  waLink: string;
};

export function FinalCta({ kicker, title, titleEmphasis, subtitle, ctaText, scarcity, waLink }: FinalCtaProps) {
  return (
    <section className="max-w-[1120px] mx-auto px-5 py-[clamp(52px,10vw,88px)] text-center">
      <Kicker>{kicker}</Kicker>
      <SectionTitle title={title} emphasis={titleEmphasis} />
      <p className="font-sans text-[15px] leading-[1.7] text-muted font-light max-w-[480px] mx-auto mt-4 mb-7">
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
      <div className="mt-[18px] font-sans text-xs text-muted">{scarcity}</div>
    </section>
  );
}
