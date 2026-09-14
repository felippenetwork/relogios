import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-bg border-b border-line flex justify-between items-center px-5 py-4">
        <div className="font-serif text-ink text-lg">Painel admin</div>
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            target="_blank"
            className="font-sans text-xs text-muted no-underline px-3 py-1.5"
          >
            Ver site
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="font-sans text-xs bg-panel-2 border border-line text-ink px-3 py-1.5 rounded cursor-pointer"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
      <AdminNav />
      <div className="p-5 max-w-[640px]">{children}</div>
    </div>
  );
}
