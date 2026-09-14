"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { downscaleImage } from "@/lib/image";

type ImageUploadFieldProps = {
  label: string;
  currentUrl: string | null;
  storagePath: string;
  onUploaded: (url: string) => void;
};

export function ImageUploadField({ label, currentUrl, storagePath, onUploaded }: ImageUploadFieldProps) {
  const [displayUrl, setDisplayUrl] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await downscaleImage(file);
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(storagePath, blob, { upsert: true, contentType: "image/jpeg" });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("site-images").getPublicUrl(storagePath);
      const bustedUrl = `${data.publicUrl}?v=${Date.now()}`;
      setDisplayUrl(bustedUrl);
      onUploaded(bustedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <span className="block font-sans text-[11px] text-muted uppercase tracking-wide mt-3.5 mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-2.5">
        <div className="w-[60px] h-[60px] rounded overflow-hidden shrink-0 bg-panel-2 relative">
          {displayUrl ? (
            <Image src={displayUrl} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-accent/50 text-[8px]">
              —
            </div>
          )}
        </div>
        <label className="bg-panel-2 border border-line text-ink font-sans text-xs px-3 py-1.5 rounded cursor-pointer">
          {uploading ? "Enviando…" : "Enviar imagem"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
