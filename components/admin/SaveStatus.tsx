export function SaveStatus({ status }: { status: "idle" | "saved" | "error" }) {
  if (status === "saved") return <p className="text-accent text-xs mt-3">Salvo.</p>;
  if (status === "error") return <p className="text-red-400 text-xs mt-3">Falha ao salvar.</p>;
  return null;
}
