# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the Dona Ruth Moda Feminina landing page website.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, TailwindCSS, framer-motion, lucide-react, shadcn/ui

## Artifacts

### Dona Ruth Moda Feminina (artifacts/dona-ruth)
- **Type**: react-vite, preview at `/`
- **Description**: Conversion-focused landing page for Dona Ruth Moda Feminina, a plus-size women's fashion store in Goiânia, Brazil
- **Main page**: `artifacts/dona-ruth/src/pages/Home.tsx`
- **Features**: Hero section, About, Product Gallery, Diferenciais, Testimonials, VIP WhatsApp Group CTA, Location with Google Maps, Contact, Footer, Floating WhatsApp button
- **WhatsApp contacts**: Carol (5562992842710), Vendedora 2 (556296383761)
- **WhatsApp Group**: https://chat.whatsapp.com/JUAiUTinXPY7WCqHvEDYDd

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
