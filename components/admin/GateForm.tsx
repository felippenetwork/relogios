"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type GateCopy = {
  gate_kicker: string;
  gate_line1: string;
  gate_line2: string;
  gate_emphasis: string;
  gate_price_from: string;
  gate_cta_text: string;
  gate_note: string;
};

export function GateForm({ settings }: { settings: GateCopy }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function field<K extends keyof GateCopy>(key: K) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
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
      <h2 className="font-serif text-ink text-xl m-0">Portão de entrada</h2>
      <p className="font-sans text-[13px] text-muted mt-1 mb-0">
        A primeira tela cheia que aparece antes do site, com o efeito de revelar ao clicar.
      </p>
      <Label>Texto pequeno (acima do título)</Label>
      <TextInput {...field("gate_kicker")} />
      <Label>Título — linha 1</Label>
      <TextInput {...field("gate_line1")} />
      <Label>Título — linha 2</Label>
      <TextInput {...field("gate_line2")} />
      <Label>Ênfase (itálico dourado)</Label>
      <TextInput {...field("gate_emphasis")} />
      <Label>Preço de entrada</Label>
      <TextInput {...field("gate_price_from")} />
      <Label>Texto do botão</Label>
      <TextInput {...field("gate_cta_text")} />
      <Label>Nota abaixo do botão</Label>
      <TextArea {...field("gate_note")} />

      <div className="mt-5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
