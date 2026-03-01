# 📂 Project Structure

Struktur lengkap project Sawitea untuk referensi AI dan developer.

## 📁 Directory Tree

```
sawitea/
├── 📁 apps/
│   ├── 📁 api/                          # NestJS Backend
│   │   ├── 📁 src/
│   │   │   ├── 📁 database/            # Drizzle ORM module
│   │   │   │   ├── database.module.ts
│   │   │   │   └── index.ts
│   │   │   ├── 📁 donation/            # Donation feature
│   │   │   │   ├── donation.controller.ts
│   │   │   │   ├── donation.module.ts
│   │   │   │   ├── donation.processor.ts
│   │   │   │   ├── donation.service.ts
│   │   │   │   └── 📁 dto/
│   │   │   │       └── create-donation.dto.ts
│   │   │   ├── 📁 payment/             # Payment integration
│   │   │   │   ├── mayar.service.ts
│   │   │   │   └── payment.module.ts
│   │   │   ├── 📁 streamer/            # Streamer feature
│   │   │   │   ├── streamer.controller.ts
│   │   │   │   ├── streamer.module.ts
│   │   │   │   ├── streamer.service.ts
│   │   │   │   └── 📁 dto/
│   │   │   │       └── create-streamer.dto.ts
│   │   │   ├── 📁 websocket/           # WebSocket gateway
│   │   │   │   ├── donation.gateway.ts
│   │   │   │   └── websocket.module.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── 📁 test/
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── drizzle.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── 📁 web/                          # Next.js Frontend
│       ├── 📁 src/
│       │   ├── 📁 app/                 # Next.js App Router
│       │   │   ├── 📁 api/
│       │   │   │   └── 📁 auth/
│       │   │   │       └── 📁 [...all]/
│       │   │   │           └── route.ts
│       │   │   ├── 📁 dashboard/
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 login/
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 obs/
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 register/
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 user/
│       │   │   │   └── 📁 [username]/
│       │   │   │       └── page.tsx
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   │
│       │   ├── 📁 components/
│       │   │   ├── 📁 auth/
│       │   │   │   ├── login-form.tsx
│       │   │   │   └── register-form.tsx
│       │   │   ├── 📁 donation/
│       │   │   │   └── donation-form.tsx
│       │   │   └── 📁 ui/              # shadcn/ui components
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── checkbox.tsx
│       │   │       ├── form.tsx
│       │   │       ├── input.tsx
│       │   │       ├── label.tsx
│       │   │       ├── select.tsx
│       │   │       ├── sonner.tsx
│       │   │       ├── tabs.tsx
│       │   │       ├── textarea.tsx
│       │   │       └── ... (53 components total)
│       │   │
│       │   ├── 📁 lib/
│       │   │   ├── api.ts              # API client
│       │   │   ├── query-provider.tsx  # TanStack Query
│       │   │   ├── socket.ts           # Socket.io client
│       │   │   └── utils.ts
│       │   │
│       │   └── 📁 hooks/               # Custom React hooks
│       │
│       ├── .env.local
│       ├── .env.example
│       ├── components.json             # shadcn/ui config
│       ├── next.config.js
│       ├── package.json
│       └── tsconfig.json
│
├── 📁 packages/
│   ├── 📁 database/                     # Database package
│   │   ├── 📁 src/
│   │   │   ├── 📁 schema/
│   │   │   │   ├── auth.ts             # Better Auth tables
│   │   │   │   ├── donation.ts         # Donation tables
│   │   │   │   └── index.ts
│   │   │   ├── auth.ts                 # Better Auth config
│   │   │   ├── db.ts                   # Drizzle client
│   │   │   ├── index.ts
│   │   │   └── seed.ts
│   │   ├── drizzle.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── 📁 shared/                       # Shared utilities
│       ├── 📁 src/
│       │   ├── 📁 types/
│       │   │   └── index.ts
│       │   ├── 📁 utils/
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── 📁 docs/                             # Documentation
│   ├── 📁 api/
│   │   ├── AUTHENTICATION.md
│   │   ├── DONATION.md
│   │   ├── README.md
│   │   ├── STREAMER.md
│   │   └── WEBSOCKET.md
│   │
│   ├── 📁 architecture/
│   │   ├── DATABASE_SCHEMA.md
│   │   ├── SYSTEM_OVERVIEW.md
│   │   └── TECH_STACK.md
│   │
│   ├── 📁 deployment/
│   │   ├── DEPLOYMENT.md
│   │   ├── DOCKER.md
│   │   └── ENV_PRODUCTION.md
│   │
│   ├── 📁 development/
│   │   ├── AI_GUIDE.md
│   │   ├── CODE_STYLE.md
│   │   ├── CONTRIBUTING.md
│   │   └── TESTING.md
│   │
│   ├── 📁 guides/
│   │   ├── DATABASE.md
│   │   ├── ENVIRONMENT.md
│   │   ├── FAQ.md
│   │   └── GETTING_STARTED.md
│   │
│   ├── PROJECT_STRUCTURE.md
│   └── README.md
│
├── .env.example                         # Environment template
├── .eslintrc.js                         # ESLint config
├── .gitignore
├── .prettierrc                          # Prettier config
├── docker-compose.yml                   # Docker Compose
├── package.json                         # Root package.json
├── README.md
└── turbo.json                           # Turborepo config
```

## 🎯 Key Files Reference

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Workspace configuration |
| `turbo.json` | Build pipeline config |
| `docker-compose.yml` | Local infrastructure |
| `.env.example` | Environment template |
| `apps/web/components.json` | shadcn/ui config |

### Entry Points
| File | Description |
|------|-------------|
| `apps/api/src/main.ts` | NestJS bootstrap |
| `apps/web/src/app/layout.tsx` | Next.js root layout |
| `apps/web/src/app/page.tsx` | Landing page |

### Core Features
| Feature | Backend | Frontend |
|---------|---------|----------|
| Donation | `apps/api/src/donation/` | `apps/web/src/components/donation/` |
| Streamer | `apps/api/src/streamer/` | `apps/web/src/app/user/[username]/` |
| OBS Overlay | `apps/api/src/websocket/` | `apps/web/src/app/obs/` |
| Dashboard | - | `apps/web/src/app/dashboard/` |

### Database
| File | Purpose |
|------|---------|
| `packages/database/src/schema/auth.ts` | User tables |
| `packages/database/src/schema/donation.ts` | Donation tables |
| `packages/database/src/auth.ts` | Better Auth config |
| `packages/database/src/db.ts` | Drizzle client |

## 🔍 Quick Navigation

### For AI Assistants
1. Start with [AI Guide](./development/AI_GUIDE.md)
2. Check [System Overview](./architecture/SYSTEM_OVERVIEW.md)
3. Reference [API Docs](./api/README.md)

### For Developers
1. Read [Getting Started](./guides/GETTING_STARTED.md)
2. Review [Contributing Guide](./development/CONTRIBUTING.md)
3. Check [Code Style](./development/CODE_STYLE.md)

### For DevOps
1. See [Docker Setup](./deployment/DOCKER.md)
2. Review [Deployment Guide](./deployment/DEPLOYMENT.md)
3. Check [Environment Config](./guides/ENVIRONMENT.md)

## 📊 File Statistics

```
Total Files: ~150+
TypeScript Files: ~100+
Components: 53 (shadcn/ui) + custom
API Endpoints: 10+
Database Tables: 5
Documentation Files: 20+
```

---

**Related:**
- [System Overview](./architecture/SYSTEM_OVERVIEW.md)
- [AI Guide](./development/AI_GUIDE.md)
