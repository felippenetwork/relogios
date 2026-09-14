import Image from "next/image";
import { Kicker } from "./Kicker";
import { ImagePlaceholder } from "./ImagePlaceholder";

type AboutProps = {
  kicker: string;
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  imgUrl: string | null;
};

export function AboutSpecialist({ kicker, name, role, bio, bullets, imgUrl }: AboutProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10 items-center">
      <div className="aspect-4/5 rounded overflow-hidden max-w-[360px] relative">
        {imgUrl ? (
          <Image src={imgUrl} alt={name} fill className="object-cover" />
        ) : (
          <ImagePlaceholder label="Foto do especialista" />
        )}
      </div>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-serif text-[32px] text-ink m-0 mb-1.5">{name}</h2>
        <div className="font-sans text-[13px] text-accent mb-[18px] tracking-wide">{role}</div>
        <p className="font-body text-[15px] leading-[1.7] text-muted mb-5">{bio}</p>
        {bullets.map((x, i) => (
          <div key={i} className="flex gap-2.5 mb-2 font-sans text-sm text-ink">
            <span className="text-accent">—</span>
            <span>{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
