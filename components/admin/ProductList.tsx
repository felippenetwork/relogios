"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  swapProductPosition,
  updateProduct,
} from "@/lib/actions/products";
import { Label, TextInput } from "@/components/ui/Field";
import { PrimaryButton, GhostButton, DangerButton } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ProductRow } from "@/lib/supabase/types";

export function ProductList({ products }: { products: ProductRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function addProduct() {
    const nextPosition = products.length ? Math.max(...products.map((p) => p.position)) + 1 : 0;
    startTransition(async () => {
      await createProduct(nextPosition);
      router.refresh();
    });
  }

  function move(index: number, direction: -1 | 1) {
    const other = products[index + direction];
    const current = products[index];
    if (!other) return;
    startTransition(async () => {
      await swapProductPosition(current.id, current.position, other.id, other.position);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <b className="font-sans text-ink text-sm">Produtos ({products.length})</b>
        <GhostButton onClick={addProduct} disabled={isPending} type="button">
          + Adicionar produto
        </GhostButton>
      </div>
      {products.map((p, i) => (
        <ProductRow
          key={p.id}
          product={p}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < products.length - 1 ? () => move(i, 1) : undefined}
          onDeleted={() => router.refresh()}
        />
      ))}
    </div>
  );
}

function ProductRow({
  product,
  onMoveUp,
  onMoveDown,
  onDeleted,
}: {
  product: ProductRow;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState(product);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      const { error } = await updateProduct(product.id, {
        name: form.name,
        tag: form.tag,
        price: form.price,
      });
      setStatus(error ? "error" : "saved");
    });
  }

  function remove() {
    startTransition(async () => {
      await deleteProduct(product.id);
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

      <Label>Nome</Label>
      <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      <Label>Tag / status</Label>
      <TextInput value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} />
      <Label>Preço</Label>
      <TextInput value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />

      <ImageUploadField
        label="Foto do produto"
        currentUrl={product.image_url}
        storagePath={`products/${product.id}.jpg`}
        onUploaded={(url) => updateProduct(product.id, { image_url: url })}
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
