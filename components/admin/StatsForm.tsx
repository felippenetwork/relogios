"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";
import type { Stat } from "@/lib/supabase/types";

export function StatsForm({ stats }: { stats: Stat[] }) {
  const [items, setItems] = useState(stats);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function update(i: number, patch: Partial<Stat>) {
    setItems((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const { error } = await updateSiteSettings({ stats: items });
      setStatus(error ? "error" : "saved");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-sans text-[13px] text-muted mb-2">Os 4 números da faixa de destaque.</p>
      {items.map((s, i) => (
        <div key={i} className="border border-line rounded p-3.5 mb-3.5 bg-panel flex gap-2">
          <div className="w-[110px]">
            <Label>Número</Label>
            <TextInput value={s.num} onChange={(e) => update(i, { num: e.target.value })} />
          </div>
          <div className="flex-1">
            <Label>Rótulo</Label>
            <TextInput value={s.label} onChange={(e) => update(i, { label: e.target.value })} />
          </div>
        </div>
      ))}
      <PrimaryButton type="submit" disabled={isPending}>
        {isPending ? "Salvando…" : "Salvar"}
      </PrimaryButton>
      <SaveStatus status={status} />
    </form>
  );
}
