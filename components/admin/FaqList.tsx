"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createFaqItem, deleteFaqItem, swapFaqPosition, updateFaqItem } from "@/lib/actions/faq";
import { Label, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton, GhostButton, DangerButton } from "@/components/ui/Button";
import type { FaqItemRow } from "@/lib/supabase/types";

export function FaqList({ items }: { items: FaqItemRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function add() {
    const nextPosition = items.length ? Math.max(...items.map((f) => f.position)) + 1 : 0;
    startTransition(async () => {
      await createFaqItem(nextPosition);
      router.refresh();
    });
  }

  function move(index: number, direction: -1 | 1) {
    const other = items[index + direction];
    const current = items[index];
    if (!other) return;
    startTransition(async () => {
      await swapFaqPosition(current.id, current.position, other.id, other.position);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <b className="font-sans text-ink text-sm">Perguntas ({items.length})</b>
        <GhostButton onClick={add} disabled={isPending} type="button">
          + Adicionar
        </GhostButton>
      </div>
      {items.map((f, i) => (
        <FaqRow
          key={f.id}
          item={f}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < items.length - 1 ? () => move(i, 1) : undefined}
          onDeleted={() => router.refresh()}
        />
      ))}
    </div>
  );
}

function FaqRow({
  item,
  onMoveUp,
  onMoveDown,
  onDeleted,
}: {
  item: FaqItemRow;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState(item);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      const { error } = await updateFaqItem(item.id, {
        question: form.question,
        answer: form.answer,
      });
      setStatus(error ? "error" : "saved");
    });
  }

  function remove() {
    startTransition(async () => {
      await deleteFaqItem(item.id);
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

      <Label>Pergunta</Label>
      <TextInput
        value={form.question}
        onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
      />
      <Label>Resposta</Label>
      <TextArea
        value={form.answer}
        onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
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
