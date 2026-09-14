"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/site-settings";
import { Label, TextInput } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { SaveStatus } from "@/components/admin/SaveStatus";

type TestimonialsCopy = {
  testimonials_kicker: string;
  testimonials_title: string;
  testimonials_title_emphasis: string;
};

export function TestimonialsCopyForm({ settings }: { settings: TestimonialsCopy }) {
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
      <h2 className="font-serif text-ink text-xl m-0">Depoimentos</h2>
      <Label>Kicker</Label>
      <TextInput
        value={form.testimonials_kicker}
        onChange={(e) => setForm((f) => ({ ...f, testimonials_kicker: e.target.value }))}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Título</Label>
          <TextInput
            value={form.testimonials_title}
            onChange={(e) => setForm((f) => ({ ...f, testimonials_title: e.target.value }))}
          />
        </div>
        <div className="flex-1">
          <Label>Ênfase</Label>
          <TextInput
            value={form.testimonials_title_emphasis}
            onChange={(e) => setForm((f) => ({ ...f, testimonials_title_emphasis: e.target.value }))}
          />
        </div>
      </div>
      <div className="mt-3.5">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
