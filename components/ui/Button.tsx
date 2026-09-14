export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-accent text-bg font-sans font-semibold text-xs tracking-wide uppercase px-5 py-3 rounded-[2px] cursor-pointer border-none disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-panel-2 border border-line text-ink font-sans text-xs px-3 py-1.5 rounded cursor-pointer disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-panel-2 border border-line text-red-400 font-sans text-xs px-2.5 py-1 rounded cursor-pointer disabled:opacity-60"
    >
      {children}
    </button>
  );
}
