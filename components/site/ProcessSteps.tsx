export function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
      {steps.map((s, i) => (
        <div
          key={i}
          className="bg-panel text-center px-6 py-9 transition-colors duration-300 hover:bg-accent-faint"
        >
          <div className="font-serif text-[34px] text-accent font-normal leading-none mb-3">
            {String(i + 1).padStart(2, "0")}
          </div>
          <p className="font-sans text-[10px] tracking-[0.09em] text-muted leading-[1.7]">{s}</p>
        </div>
      ))}
    </div>
  );
}
