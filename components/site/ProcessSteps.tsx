export function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
      {steps.map((s, i) => (
        <div key={i} className="pt-[18px]" style={{ borderTop: "2px solid var(--accent-soft)" }}>
          <div className="font-serif text-[30px] text-accent font-bold mb-2">
            {String(i + 1).padStart(2, "0")}
          </div>
          <p className="font-sans text-sm text-ink leading-[1.7]">{s}</p>
        </div>
      ))}
    </div>
  );
}
