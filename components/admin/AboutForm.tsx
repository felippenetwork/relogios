"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type AboutCopy = {
  about_kicker: string;
  about_name: string;
  about_role: string;
  about_bio: string;
  about_bullets: string[];
  about_img_url: string | null;
};

export function AboutForm({ settings }: { settings: AboutCopy }) {
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
      <h2 className="font-serif text-ink text-xl m-0 mb-2">Sobre</h2>

      <ImageUploadField
        label="Foto do especialista"
        currentUrl={form.about_img_url}
        storagePath="about/specialist.jpg"
        onUploaded={(url) => {
          setForm((f) => ({ ...f, about_img_url: url }));
          updateSiteSettings({ about_img_url: url });
        }}
      />

      <Label>Kicker</Label>
      <TextInput
        value={form.about_kicker}
        onChange={(e) => setForm((f) => ({ ...f, about_kicker: e.target.value }))}
      />
      <Label>Nome</Label>
      <TextInput
        value={form.about_name}
        onChange={(e) => setForm((f) => ({ ...f, about_name: e.target.value }))}
      />
      <Label>Cargo / localização</Label>
      <TextInput
        value={form.about_role}
        onChange={(e) => setForm((f) => ({ ...f, about_role: e.target.value }))}
      />
      <Label>Apresentação</Label>
      <TextArea
        value={form.about_bio}
        onChange={(e) => setForm((f) => ({ ...f, about_bio: e.target.value }))}
      />
      <Label>Diferenciais (um por linha)</Label>
      <TextArea
        value={form.about_bullets.join("\n")}
        onChange={(e) => setForm((f) => ({ ...f, about_bullets: e.target.value.split("\n") }))}
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
