# Relógios

Site de catálogo dark-luxury (preto + dourado), com painel admin para editar todo o conteúdo (produtos, depoimentos, FAQ, cores, textos) sem precisar mexer em código.

Stack: **Next.js** (App Router + TypeScript + Tailwind CSS) hospedado na **Vercel**, com **Supabase** para banco de dados, autenticação do admin e armazenamento de imagens.

> Em construção: migração do protótipo estático em [`reference/luxo-catalogo.jsx`](reference/luxo-catalogo.jsx) para esta base real.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Copie `.env.example` para `.env.local` e preencha com as chaves do projeto Supabase (Project Settings → API).

## Painel admin

Acesse `/admin` (login via Supabase Auth — sem senha fixa no código).

## Deploy

Conectado à Vercel via integração com este repositório: todo push em `main` gera deploy de produção automaticamente.
