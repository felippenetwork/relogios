-- Extensions
create extension if not exists pgcrypto;

-- =========================================================
-- site_settings: singleton row
-- =========================================================
create table public.site_settings (
  id smallint primary key default 1,

  brand_name text not null default 'SUA MARCA',
  brand_tagline text not null default 'Curadoria exclusiva',
  brand_location text not null default 'Sua cidade',

  hero_kicker text not null default 'Coleção exclusiva',
  hero_line1 text not null default 'Peças selecionadas',
  hero_line2 text not null default 'para quem exige',
  hero_emphasis text not null default 'o mais alto padrão.',
  hero_subtitle text not null default 'Curadoria pessoal, conferência antes do envio e entrega para todo o Brasil. Você aprova cada detalhe antes de pagar.',
  hero_price_from text not null default 'A partir de R$ 0.000',
  hero_cta_text text not null default 'Ver o catálogo',
  hero_note text not null default 'Envio para todo o Brasil · Atendimento pessoal',
  hero_img_url text,

  stats jsonb not null default '[
    {"num":"800+","label":"Clientes atendidos"},
    {"num":"9 anos","label":"No mercado"},
    {"num":"48h","label":"Entrega média"},
    {"num":"100%","label":"Aprovação"}
  ]'::jsonb,

  catalog_kicker text not null default 'Catálogo atual',
  catalog_title text not null default 'As peças',
  catalog_title_emphasis text not null default 'mais procuradas',
  catalog_subtitle text not null default 'Cada item abaixo é selecionado a dedo. Disponibilidade limitada por lote — fale comigo para ver o que está disponível hoje.',

  value_kicker text not null default 'Transparência',
  value_title text not null default 'O que você está',
  value_title_emphasis text not null default 'realmente levando',
  value_blocks jsonb not null default '[
    {"label":"A diferença que você vê","head":"Você aprova antes de pagar","body":"Nada é enviado sem você ver e aprovar. Esse processo garante que o que chega até você é exatamente o que foi escolhido.","bullets":["Conferência completa antes do envio","Detalhes, acabamento e qualidade validados","Só depois da sua aprovação o envio acontece"]},
    {"label":"A diferença que você sente","head":"Padrão que se percebe no uso","body":"Trabalho apenas com o que tem qualidade real. São peças que se destacam no dia a dia. Quem compra uma vez, volta.","bullets":["Materiais e acabamento de alto nível","Atenção a cada detalhe da peça","Clientes que voltam e indicam"]}
  ]'::jsonb,

  testimonials_kicker text not null default 'Resultados reais',
  testimonials_title text not null default 'Clientes reais.',
  testimonials_title_emphasis text not null default 'Sem filtro.',

  about_kicker text not null default 'Quem atende você',
  about_name text not null default 'SEU NOME',
  about_role text not null default 'Especialista · Sua cidade',
  about_bio text not null default 'Escreva aqui sua apresentação. Fale da sua experiência, do seu diferencial e de por que o atendimento é pessoal e direto com você.',
  about_bullets jsonb not null default '["Atendimento 100% pessoal","Curadoria de qualidade","Envio para todo o Brasil","Pós-venda direto com você"]'::jsonb,
  about_img_url text,

  process_kicker text not null default 'Processo',
  process_title text not null default 'Do primeiro contato',
  process_title_emphasis text not null default 'à entrega final',
  process_steps jsonb not null default '[
    "Você me conta o que procura. A curadoria começa aqui.",
    "Envio os detalhes e as fotos/vídeo da peça antes de qualquer pagamento.",
    "Após sua aprovação, envio rastreado e discreto para todo o Brasil.",
    "Pós-venda direto comigo. Suporte real, sem robô."
  ]'::jsonb,

  faq_kicker text not null default 'Dúvidas frequentes',
  faq_title text not null default 'Perguntas que',
  faq_title_emphasis text not null default 'todo cliente faz',

  final_cta_kicker text not null default 'Próximo passo',
  final_cta_title text not null default 'Pronto para escolher',
  final_cta_title_emphasis text not null default 'a peça certa?',
  final_cta_subtitle text not null default 'Atendimento direto, sem pressa e sem pressão. Você vê antes de pagar.',
  final_cta_cta_text text not null default 'Falar agora',
  final_cta_scarcity text not null default 'Lote atual: peças disponíveis',

  accent_color text not null default '#c8a45c',
  whatsapp_number text not null default '5511999999999',
  whatsapp_message text not null default 'Olá! Vim pelo site e quero ver o catálogo.',

  updated_at timestamptz not null default now(),

  constraint site_settings_singleton check (id = 1),
  constraint stats_length check (jsonb_array_length(stats) = 4),
  constraint value_blocks_length check (jsonb_array_length(value_blocks) = 2),
  constraint process_steps_length check (jsonb_array_length(process_steps) = 4),
  constraint accent_color_hex check (accent_color ~ '^#[0-9a-fA-F]{6}$'),
  constraint whatsapp_number_digits check (whatsapp_number ~ '^[0-9]+$')
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- =========================================================
-- products
-- =========================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Novo produto',
  tag text not null default 'Disponível',
  price text not null default 'A partir de R$ 0.000',
  image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================
-- testimonials
-- =========================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Cliente',
  detail text not null default 'Produto · Cidade',
  quote_text text not null default 'Depoimento de exemplo. Edite ou remova este texto no painel admin.',
  image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================
-- faq_items
-- =========================================================
create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================
-- RLS
-- =========================================================
alter table public.site_settings enable row level security;
alter table public.products enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq_items enable row level security;

-- Public reads (marketing site is public)
create policy "site_settings_public_read" on public.site_settings for select to anon, authenticated using (true);
create policy "products_public_read" on public.products for select to anon, authenticated using (true);
create policy "testimonials_public_read" on public.testimonials for select to anon, authenticated using (true);
create policy "faq_items_public_read" on public.faq_items for select to anon, authenticated using (true);

-- Admin writes: single-admin app, no per-row ownership column, so `TO authenticated USING (true)`
-- is intentional here (not the BOLA anti-pattern the skill warns about) — it is safe ONLY as long as
-- public sign-up is disabled in Auth settings (see supabase/README.md). Do that before going live.
-- site_settings: UPDATE only. No INSERT/DELETE policy on purpose — the singleton row is seeded once
-- and must never be duplicated or removed; absence of a policy = default deny under RLS.
create policy "site_settings_admin_update" on public.site_settings for update to authenticated using (true) with check (true);

create policy "products_admin_insert" on public.products for insert to authenticated with check (true);
create policy "products_admin_update" on public.products for update to authenticated using (true) with check (true);
create policy "products_admin_delete" on public.products for delete to authenticated using (true);

create policy "testimonials_admin_insert" on public.testimonials for insert to authenticated with check (true);
create policy "testimonials_admin_update" on public.testimonials for update to authenticated using (true) with check (true);
create policy "testimonials_admin_delete" on public.testimonials for delete to authenticated using (true);

create policy "faq_items_admin_insert" on public.faq_items for insert to authenticated with check (true);
create policy "faq_items_admin_update" on public.faq_items for update to authenticated using (true) with check (true);
create policy "faq_items_admin_delete" on public.faq_items for delete to authenticated using (true);

-- Explicit grants (belt-and-suspenders in case Data API defaults differ for new tables)
grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.products, public.testimonials, public.faq_items to anon, authenticated;
grant update on public.site_settings to authenticated;
grant insert, update, delete on public.products, public.testimonials, public.faq_items to authenticated;

-- =========================================================
-- Storage: site-images bucket
-- =========================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

create policy "site_images_public_read" on storage.objects for select to anon, authenticated using (bucket_id = 'site-images');
create policy "site_images_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'site-images');
create policy "site_images_admin_update" on storage.objects for update to authenticated using (bucket_id = 'site-images') with check (bucket_id = 'site-images');
create policy "site_images_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'site-images');
