"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type Appearance = { accent_color: string; whatsapp_number: string; whatsapp_message: string };

export function AppearanceForm({ settings }: { settings: Appearance }) {
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
      <h2 className="font-serif text-ink text-xl m-0">Aparência</h2>

      <Label>Cor de destaque (dourado)</Label>
      <div className="flex items-center gap-2.5">
        <input
          type="color"
          value={form.accent_color}
          onChange={(e) => setForm((f) => ({ ...f, accent_color: e.target.value }))}
          className="w-12 h-10 bg-transparent border border-line rounded cursor-pointer"
        />
        <TextInput
          value={form.accent_color}
          onChange={(e) => setForm((f) => ({ ...f, accent_color: e.target.value }))}
        />
      </div>

      <Label>WhatsApp (só números, com DDI+DDD)</Label>
      <TextInput
        value={form.whatsapp_number}
        placeholder="5511999999999"
        onChange={(e) =>
          setForm((f) => ({ ...f, whatsapp_number: e.target.value.replace(/\D/g, "") }))
        }
      />

      <Label>Mensagem automática do WhatsApp</Label>
      <TextArea
        value={form.whatsapp_message}
        onChange={(e) => setForm((f) => ({ ...f, whatsapp_message: e.target.value }))}
      />

      <div className="mt-5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
