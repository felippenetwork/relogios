"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type FinalCtaCopy = {
  final_cta_kicker: string;
  final_cta_title: string;
  final_cta_title_emphasis: string;
  final_cta_subtitle: string;
  final_cta_cta_text: string;
};

export function FinalCtaForm({ settings }: { settings: FinalCtaCopy }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function field<K extends keyof FinalCtaCopy>(key: K) {
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
      <h2 className="font-serif text-ink text-xl m-0">CTA final</h2>
      <Label>Kicker</Label>
      <TextInput {...field("final_cta_kicker")} />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Título</Label>
          <TextInput {...field("final_cta_title")} />
        </div>
        <div className="flex-1">
          <Label>Ênfase</Label>
          <TextInput {...field("final_cta_title_emphasis")} />
        </div>
      </div>
      <Label>Subtítulo</Label>
      <TextArea {...field("final_cta_subtitle")} />
      <Label>Texto do botão</Label>
      <TextInput {...field("final_cta_cta_text")} />
      <p className="font-sans text-[13px] text-muted mt-3.5 mb-0">
        A nota &quot;Lote atual: N peças disponíveis&quot; é calculada automaticamente pela
        quantidade de produtos cadastrados na aba Catálogo.
      </p>
      <div className="mt-3.5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
