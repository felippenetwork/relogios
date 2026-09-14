"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: [string, string][] = [
  ["/admin/site", "Marca / Hero"],
  ["/admin/stats", "Números"],
  ["/admin/catalog", "Catálogo"],
  ["/admin/value", "Transparência"],
  ["/admin/testimonials", "Depoimentos"],
  ["/admin/about", "Sobre"],
  ["/admin/process", "Processo"],
  ["/admin/faq", "FAQ"],
  ["/admin/final-cta", "CTA final"],
  ["/admin/appearance", "Aparência"],
  ["/admin/account", "Conta"],
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1.5 px-5 py-3.5 border-b border-line">
      {LINKS.map(([href, label]) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`font-sans text-xs px-3 py-1.5 rounded no-underline ${
              active ? "bg-accent text-bg font-semibold" : "bg-panel-2 text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
