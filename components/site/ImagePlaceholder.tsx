export function ImagePlaceholder({ label = "Imagem", small = false }: { label?: string; small?: boolean }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center font-sans uppercase tracking-wide text-accent/50 ${
        small ? "text-[9px]" : "text-xs"
      }`}
      style={{ background: "linear-gradient(135deg, var(--color-panel-2), var(--color-panel))" }}
    >
      {label}
    </div>
  );
}
