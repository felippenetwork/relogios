-- The entry gate (full-screen teaser) and the real hero section (shown after
-- entering) need independent copy — reusing the same hero_* columns for both
-- made the hero look like it repeated the gate verbatim.
alter table public.site_settings
  add column gate_kicker text not null default 'Acesso restrito',
  add column gate_line1 text not null default 'Você não está',
  add column gate_line2 text not null default 'comprando um relógio.',
  add column gate_emphasis text not null default 'Está entrando num nível.',
  add column gate_price_from text not null default 'A partir de R$ 6.799',
  add column gate_cta_text text not null default 'Ver o catálogo',
  add column gate_note text not null default 'Envio para todo o Brasil · Atendimento pessoal';
