"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type CatalogCopy = {
  catalog_kicker: string;
  catalog_title: string;
  catalog_title_emphasis: string;
  catalog_subtitle: string;
};

export function CatalogCopyForm({ settings }: { settings: CatalogCopy }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function field<K extends keyof CatalogCopy>(key: K) {
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
      <h2 className="font-serif text-ink text-xl m-0">Catálogo</h2>
      <Label>Kicker</Label>
      <TextInput {...field("catalog_kicker")} />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Título</Label>
          <TextInput {...field("catalog_title")} />
        </div>
        <div className="flex-1">
          <Label>Ênfase</Label>
          <TextInput {...field("catalog_title_emphasis")} />
        </div>
      </div>
      <Label>Subtítulo</Label>
      <TextArea {...field("catalog_subtitle")} />
      <div className="mt-3.5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
