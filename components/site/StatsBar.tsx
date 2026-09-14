import type { Stat } from "@/lib/supabase/types";

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-line">
      <div className="max-w-[1120px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {stats.map((s, i) => (
          <div
            key={i}
            className="py-8 px-4 text-center"
            style={i > 0 ? { borderLeft: "1px solid var(--color-line)" } : undefined}
          >
            <div className="font-serif text-[30px] text-accent font-normal">{s.num}</div>
            <div className="font-sans text-xs text-muted mt-1.5 tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
