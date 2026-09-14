"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label, TextInput } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";

export function AccountForm({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("saved");
      setPassword("");
    }
  }

  return (
    <div>
      <h2 className="font-serif text-ink text-xl m-0 mb-1">Conta</h2>
      <p className="font-sans text-[13px] text-muted mb-4">Logado como {email}</p>

      <form onSubmit={handleSubmit}>
        <Label>Nova senha</Label>
        <TextInput
          type="password"
          value={password}
          minLength={6}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-3.5">
          <PrimaryButton type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Salvando…" : "Trocar senha"}
          </PrimaryButton>
          {status === "saved" && <span className="text-accent text-xs ml-2.5">Senha alterada.</span>}
          {status === "error" && <span className="text-red-400 text-xs ml-2.5">{errorMsg}</span>}
        </div>
      </form>
    </div>
  );
}
