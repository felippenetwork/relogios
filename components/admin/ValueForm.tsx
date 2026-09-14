"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";
import type { ValueBlock } from "@/lib/supabase/types";

type ValueCopy = {
  value_kicker: string;
  value_title: string;
  value_title_emphasis: string;
  value_blocks: ValueBlock[];
};

export function ValueForm({ settings }: { settings: ValueCopy }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function updateBlock(i: number, patch: Partial<ValueBlock>) {
    setForm((f) => ({
      ...f,
      value_blocks: f.value_blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const { error } = await updateSiteSettings(form);
      setStatus(error ? "error" : "saved");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-serif text-ink text-xl m-0">Transparência</h2>
      <Label>Kicker</Label>
      <TextInput
        value={form.value_kicker}
        onChange={(e) => setForm((f) => ({ ...f, value_kicker: e.target.value }))}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Título</Label>
          <TextInput
            value={form.value_title}
            onChange={(e) => setForm((f) => ({ ...f, value_title: e.target.value }))}
          />
        </div>
        <div className="flex-1">
          <Label>Ênfase</Label>
          <TextInput
            value={form.value_title_emphasis}
            onChange={(e) => setForm((f) => ({ ...f, value_title_emphasis: e.target.value }))}
          />
        </div>
      </div>

      {form.value_blocks.map((b, i) => (
        <div key={i} className="border border-line rounded p-3.5 mt-4 bg-panel">
          <span className="font-sans text-[11px] text-accent">Bloco #{i + 1}</span>
          <Label>Rótulo</Label>
          <TextInput value={b.label} onChange={(e) => updateBlock(i, { label: e.target.value })} />
          <Label>Título</Label>
          <TextInput value={b.head} onChange={(e) => updateBlock(i, { head: e.target.value })} />
          <Label>Texto</Label>
          <TextArea value={b.body} onChange={(e) => updateBlock(i, { body: e.target.value })} />
          <Label>Pontos (um por linha)</Label>
          <TextArea
            value={b.bullets.join("\n")}
            onChange={(e) => updateBlock(i, { bullets: e.target.value.split("\n") })}
          />
        </div>
      ))}

      <div className="mt-4">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
