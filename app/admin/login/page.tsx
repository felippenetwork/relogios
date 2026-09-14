import { signInAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-[380px] border border-line rounded-md p-7 bg-panel">
        <h1 className="font-serif text-ink text-2xl m-0 mb-1.5">Painel admin</h1>
        <p className="font-sans text-[13px] text-muted m-0 mb-5">
          Entre com seu e-mail e senha do Supabase.
        </p>

        <form action={signInAction}>
          <label className="block font-sans text-[11px] text-muted uppercase tracking-wide mb-1.5">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="w-full box-border bg-bg border border-line text-ink font-sans text-sm px-3 py-2.5 rounded outline-none focus-visible:border-accent mb-3.5"
          />

          <label className="block font-sans text-[11px] text-muted uppercase tracking-wide mb-1.5">
            Senha
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full box-border bg-bg border border-line text-ink font-sans text-sm px-3 py-2.5 rounded outline-none focus-visible:border-accent"
          />

          {error && (
            <p className="font-sans text-[13px] text-red-400 mt-3.5 mb-0">
              E-mail ou senha incorretos.
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-5 bg-accent text-bg font-sans font-semibold text-[13px] tracking-[1.5px] uppercase px-[30px] py-3.5 rounded-[2px] cursor-pointer border-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
