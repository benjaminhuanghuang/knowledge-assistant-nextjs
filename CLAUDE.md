@AGENTS.md

# Knowledge Assistant

A knowledge base assistant. Users upload PDF, Word, and Markdown files. They ask questions in natural language. The system retrieves relevant content from the documents and answers, with citations to the source.

## Decided tech stack

- **Framework**: Next.js 16 (App Router). `next.config.ts` has `cacheComponents` and `partialPrefetching` enabled.
- **Styling**: Tailwind v4.
- **Database / Auth / Storage**: Supabase. One platform for all three:
  - Postgres with the `pgvector` extension, used as the vector store.
  - Supabase Auth.
  - Supabase Storage, for the original uploaded files.
- **ORM**: Drizzle, with drizzle-kit for migrations. `.env.example` already has `DATABASE_URL` and `DIRECT_URL` (the direct URL is for drizzle-kit, via the Supabase session pooler).
- **LLM and embeddings**: Google Gemini, called through the Vercel AI SDK (`ai` + `@ai-sdk/google`). `.env.example` already has `GOOGLE_GENERATIVE_AI_API_KEY`. Both answer generation and embeddings use Gemini — no OpenAI or Anthropic API in the app itself.
- **UI components**: shadcn, `base-nova` style (built on `@base-ui/react`, not Radix), plus `class-variance-authority` for variants, `lucide-react` for icons, `tw-animate-css` for animations.
- **Git hooks**: husky + lint-staged (`*.{js,jsx,ts,tsx}` → `eslint --fix`) + gitleaks. Gitleaks is a system binary, not an npm package — install it locally with `brew install gitleaks` (or the equivalent for your OS), and install it separately in CI too. The pre-commit hook runs `gitleaks protect --staged --redact --no-banner`, which only scans staged changes and can be bypassed with `--no-verify`; CI should run a full-history scan separately.

Setup history and commands are logged in [_notes/0_setup.md](_notes/0_setup.md). That file is a chronological log of what was run; this file is the current source of truth for decisions.

## Current state: done vs. planned

**Done**: Next.js scaffold, Tailwind v4, husky/lint-staged/gitleaks pre-commit hook.

**Planned, not yet done** (check before assuming these exist):
- Supabase project created, `pgvector` extension enabled.
- Drizzle schema and first migration.
- shadcn `components.json` — the `npx shadcn add ...` commands in `_notes/0_setup.md` have not been run yet; `components.json` does not exist in the repo.
- Dependencies: `ai`, `@ai-sdk/google`, `@supabase/supabase-js`.
- Ingestion and RAG application code.

## Draft data model (Drizzle schema, not yet implemented)

- `documents`: id, user_id, filename, storage_path, mime_type, status (processing/ready/failed), created_at
- `chunks`: id, document_id, chunk_index, content, embedding vector(N), metadata (page/heading), created_at

Citations are not a separate table — look up the parent document from the matched chunk at query time.

## RAG flow

**Upload**: file → Supabase Storage → extract text (PDF: `unpdf`, DOCX: `mammoth`, Markdown: read as-is) → chunk (character-based, with overlap) → embed with Gemini → insert into `chunks`. For the MVP this runs synchronously inside the upload route handler (it's a POST, so `cacheComponents` caching does not apply).

**Query**: question → embed with Gemini → pgvector similarity search, top-k chunks → build a prompt that marks each source → stream the answer with Gemini `streamText` (AI SDK), and return the matched chunks' source documents as citations alongside the stream.

## Planned directory layout

```
app/api/upload/route.ts
app/api/chat/route.ts
app/documents/page.tsx
app/page.tsx
lib/db/{schema,client}.ts
lib/supabase/{server,client}.ts
lib/ingestion/{pdf,docx,markdown,chunk}.ts
lib/rag/{retrieve,prompt}.ts
drizzle/            # migrations
drizzle.config.ts
```

## Design and implementation principles

- Use current, stable versions of libraries and frameworks, and current best practices — not older patterns from training data. Several dependencies here move fast (Next.js 16, Supabase, Drizzle, the Vercel AI SDK, the Gemini API).
- Before writing code against one of them, check its current docs (e.g. `node_modules/<pkg>/dist/docs` when present, the package's own README/CHANGELOG, or the web) instead of assuming a remembered API still applies. The Next.js rule at the top of this file (via `@AGENTS.md`) is one instance of this; apply the same caution to every other fast-moving dependency.
- When a design or implementation choice is genuinely ambiguous (not just "which version"), stop and ask rather than guessing.

## Git rules

The coding agent must not commit code. After making changes, stop and let the user review the diff. Only commit when the user explicitly asks for it.

## Open decisions

- Exact Gemini embedding model (e.g. `text-embedding-004`).
- When to wire up Supabase Auth: get single-user RAG working first, or add per-user isolation now.
