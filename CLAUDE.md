# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev        # dev server at localhost:4321
pnpm build      # production build to ./dist/
pnpm preview    # preview production build
pnpm astro check  # type-check .astro files
```

Package manager: **pnpm** (node >= 22.12.0 required).

## Stack

- **Astro 6** — static site generator; pages live in `src/pages/`
- **Preact 10** — used for interactive components (`jsx`/`tsx` files); configured as the JSX runtime via `jsxImportSource: "preact"` in tsconfig
- **Tailwind CSS 4** — integrated via `@tailwindcss/vite` plugin (not the legacy PostCSS plugin); imported once in `src/styles/global.css`
- **Prettier** with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`

## Path aliases (tsconfig.json)

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@hooks/*` | `src/components/hooks/*` |
| `@icons/*` | `src/icons/*` |
| `@styles/*` | `src/styles/*` |

## Architecture notes

- `src/layouts/Layout.astro` is the base HTML shell (lang="es", favicon links, `<slot />`). All pages wrap their content in it.
- Preact components go in `src/components/`. They are imported directly into `.astro` files; use the `client:*` directive to hydrate them (`client:load`, `client:idle`, `client:visible`).
- There is no content collections setup yet — the site is in its initial scaffolding state.
