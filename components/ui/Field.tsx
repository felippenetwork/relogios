export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-sans text-[11px] text-muted uppercase tracking-wide mt-3.5 mb-1.5">
      {children}
    </span>
  );
}

const inputClass =
  "w-full box-border bg-panel border border-line text-ink font-sans text-sm px-3 py-2.5 rounded outline-none focus-visible:border-accent";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[80px]`} />;
}
