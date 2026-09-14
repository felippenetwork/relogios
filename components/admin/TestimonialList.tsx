"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  deleteTestimonial,
  swapTestimonialPosition,
  updateTestimonial,
} from "@/lib/actions/testimonials";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton, GhostButton, DangerButton } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { TestimonialRow } from "@/lib/supabase/types";

export function TestimonialList({ testimonials }: { testimonials: TestimonialRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function add() {
    const nextPosition = testimonials.length
      ? Math.max(...testimonials.map((t) => t.position)) + 1
      : 0;
    startTransition(async () => {
      await createTestimonial(nextPosition);
      router.refresh();
    });
  }

  function move(index: number, direction: -1 | 1) {
    const other = testimonials[index + direction];
    const current = testimonials[index];
    if (!other) return;
    startTransition(async () => {
      await swapTestimonialPosition(current.id, current.position, other.id, other.position);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <b className="font-sans text-ink text-sm">Depoimentos ({testimonials.length})</b>
        <GhostButton onClick={add} disabled={isPending} type="button">
          + Adicionar
        </GhostButton>
      </div>
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={t.id}
          testimonial={t}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < testimonials.length - 1 ? () => move(i, 1) : undefined}
          onDeleted={() => router.refresh()}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  onMoveUp,
  onMoveDown,
  onDeleted,
}: {
  testimonial: TestimonialRow;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState(testimonial);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      const { error } = await updateTestimonial(testimonial.id, {
        name: form.name,
        detail: form.detail,
        quote_text: form.quote_text,
      });
      setStatus(error ? "error" : "saved");
    });
  }

  function remove() {
    startTransition(async () => {
      await deleteTestimonial(testimonial.id);
      onDeleted();
    });
  }

  return (
    <div className="border border-line rounded p-3.5 mb-3.5 bg-panel">
      <div className="flex justify-between mb-1.5">
        <div className="flex gap-1">
          <GhostButton type="button" onClick={onMoveUp} disabled={!onMoveUp || isPending}>
            ↑
          </GhostButton>
          <GhostButton type="button" onClick={onMoveDown} disabled={!onMoveDown || isPending}>
            ↓
          </GhostButton>
        </div>
        <DangerButton type="button" onClick={remove} disabled={isPending}>
          Excluir
        </DangerButton>
      </div>

      <Label>Depoimento</Label>
      <TextArea
        value={form.quote_text}
        onChange={(e) => setForm((f) => ({ ...f, quote_text: e.target.value }))}
      />
      <Label>Nome</Label>
      <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      <Label>Produto · Cidade</Label>
      <TextInput
        value={form.detail}
        onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
      />

      <ImageUploadField
        label="Foto do cliente"
        currentUrl={testimonial.image_url}
        storagePath={`testimonials/${testimonial.id}.jpg`}
        onUploaded={(url) => updateTestimonial(testimonial.id, { image_url: url })}
      />

      <div className="mt-2.5">
        <PrimaryButton type="button" onClick={save} disabled={isPending}>
          {isPending ? "Salvando…" : "Salvar"}
        </PrimaryButton>
        {status === "saved" && <span className="text-accent text-xs ml-2.5">Salvo.</span>}
        {status === "error" && <span className="text-red-400 text-xs ml-2.5">Falha ao salvar.</span>}
      </div>
    </div>
  );
}
