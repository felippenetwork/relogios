-- Idempotent: safe to re-run without duplicating rows or clobbering live admin edits.
insert into public.site_settings (id) values (1)
on conflict (id) do nothing;   -- all real defaults already live on the columns above

insert into public.products (id, name, tag, price, image_url, position) values
  ('00000000-0000-0000-0000-000000000001', 'Peça Signature 01', 'Linha Signature · Disponível', 'A partir de R$ 0.000', null, 0),
  ('00000000-0000-0000-0000-000000000002', 'Peça Signature 02', 'Linha Signature · Disponível', 'A partir de R$ 0.000', null, 1),
  ('00000000-0000-0000-0000-000000000003', 'Peça Signature 03', 'Edição limitada · Disponível', 'A partir de R$ 0.000', null, 2)
on conflict (id) do nothing;

insert into public.testimonials (id, name, detail, quote_text, image_url, position) values
  ('00000000-0000-0000-0000-000000000001', 'Cliente Exemplo', 'Produto · Cidade', 'Depoimento de exemplo. Edite ou remova este texto no painel admin.', null, 0),
  ('00000000-0000-0000-0000-000000000002', 'Cliente Exemplo', 'Produto · Cidade', 'Depoimento de exemplo. Edite ou remova este texto no painel admin.', null, 1),
  ('00000000-0000-0000-0000-000000000003', 'Cliente Exemplo', 'Produto · Cidade', 'Depoimento de exemplo. Edite ou remova este texto no painel admin.', null, 2)
on conflict (id) do nothing;

insert into public.faq_items (id, question, answer, position) values
  ('00000000-0000-0000-0000-000000000001', 'Pergunta de exemplo 1?', 'Resposta de exemplo. Edite este conteúdo no painel admin.', 0),
  ('00000000-0000-0000-0000-000000000002', 'Pergunta de exemplo 2?', 'Resposta de exemplo. Edite este conteúdo no painel admin.', 1),
  ('00000000-0000-0000-0000-000000000003', 'Pergunta de exemplo 3?', 'Resposta de exemplo. Edite este conteúdo no painel admin.', 2),
  ('00000000-0000-0000-0000-000000000004', 'Pergunta de exemplo 4?', 'Resposta de exemplo. Edite este conteúdo no painel admin.', 3)
on conflict (id) do nothing;
