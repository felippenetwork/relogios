"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type ProcessCopy = {
  process_kicker: string;
  process_title: string;
  process_title_emphasis: string;
  process_steps: string[];
};

export function ProcessForm({ settings }: { settings: ProcessCopy }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const { error } = await updateSiteSettings(form);
      setStatus(error ? "error" : "saved");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-serif text-ink text-xl m-0">Processo</h2>
      <Label>Kicker</Label>
      <TextInput
        value={form.process_kicker}
        onChange={(e) => setForm((f) => ({ ...f, process_kicker: e.target.value }))}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Título</Label>
          <TextInput
            value={form.process_title}
            onChange={(e) => setForm((f) => ({ ...f, process_title: e.target.value }))}
          />
        </div>
        <div className="flex-1">
          <Label>Ênfase</Label>
          <TextInput
            value={form.process_title_emphasis}
            onChange={(e) => setForm((f) => ({ ...f, process_title_emphasis: e.target.value }))}
          />
        </div>
      </div>
      <Label>Os 4 passos (um por linha)</Label>
      <TextArea
        value={form.process_steps.join("\n")}
        onChange={(e) => setForm((f) => ({ ...f, process_steps: e.target.value.split("\n") }))}
        rows={6}
      />
      <div className="mt-3.5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
