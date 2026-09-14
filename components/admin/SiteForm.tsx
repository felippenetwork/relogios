"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { SiteSettingsRow } from "@/lib/supabase/types";

export function SiteForm({ settings }: { settings: SiteSettingsRow }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function field<K extends keyof SiteSettingsRow>(key: K) {
    return {
      value: (form[key] ?? "") as string,
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
      <h2 className="font-serif text-ink text-xl m-0">Marca</h2>
      <Label>Nome da marca</Label>
      <TextInput {...field("brand_name")} />
      <Label>Slogan (topo)</Label>
      <TextInput {...field("brand_tagline")} />
      <Label>Cidade / localização</Label>
      <TextInput {...field("brand_location")} />

      <div className="h-px bg-line my-5" />

      <h2 className="font-serif text-ink text-xl m-0">Hero</h2>
      <Label>Kicker do hero</Label>
      <TextInput {...field("hero_kicker")} />
      <Label>Título — linha 1</Label>
      <TextInput {...field("hero_line1")} />
      <Label>Título — linha 2</Label>
      <TextInput {...field("hero_line2")} />
      <Label>Ênfase (itálico dourado)</Label>
      <TextInput {...field("hero_emphasis")} />
      <Label>Subtítulo</Label>
      <TextArea {...field("hero_subtitle")} />
      <Label>Texto do botão</Label>
      <TextInput {...field("hero_cta_text")} />
      <Label>Preço / nota abaixo do botão</Label>
      <TextInput {...field("hero_price_from")} />
      <TextInput {...field("hero_note")} />

      <ImageUploadField
        label="Imagem de fundo do hero (opcional)"
        currentUrl={form.hero_img_url}
        storagePath="hero/hero.jpg"
        onUploaded={(url) => {
          setForm((f) => ({ ...f, hero_img_url: url }));
          updateSiteSettings({ hero_img_url: url });
        }}
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
