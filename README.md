# Commerce Core POS

Phase 1 foundation for a web-first POS system. The goal is functionality before visual polish.

## Stack

- Frontend: React, TypeScript, Vite, Redux Toolkit, React Router
- Backend: NestJS, TypeScript, Prisma
- Database: PostgreSQL

## Workspace layout

```text
apps/
  web/      React POS application
  api/      NestJS API
packages/
  shared/   Shared TypeScript contracts
  database/ Prisma schema
```

## Scripts

```bash
npm install
npm run dev:web
npm run dev:api
npm run build
npm run lint
npm run typecheck
```

## Phase 1 behavior

- Mock login flow for local navigation.
- Functional POS screen: browse/search products, add to cart, adjust quantities, totals, and checkout.
- Product, inventory, sales, dashboard, and reports views backed by Redux state on the frontend.
- Backend starts with in-memory services so the API shape can evolve before wiring PostgreSQL persistence.
- Prisma schema models the intended PostgreSQL data design for users, categories, products, inventory movements, sales, and sale items.

## Environment

Do not commit secrets. When database integration is enabled, provide `DATABASE_URL` through a local environment file or deployment secret store.
# Commerce-Core
