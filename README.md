# ☕ Sawitea

> Platform donasi untuk streamer Indonesia. Alternatif open source untuk Saweria.co

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ Features

- 🎥 **OBS Overlay Real-time** - Animasi donasi langsung muncul di stream
- 💳 **Mayar.id Integration** - Pembayaran via QRIS, E-Wallet, Transfer Bank
- 🔐 **Authentication** - Better Auth dengan email/password
- 📊 **Dashboard** - Kelola donasi dan statistik streamer
- 🎨 **Modern UI** - shadcn/ui dengan Matsu Theme

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/yourusername/sawitea.git
cd sawitea

# 2. Install dependencies
npm install

# 3. Setup environment
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 4. Start database & redis
docker-compose up -d postgres redis

# 5. Run migrations
npm run db:push

# 6. Start development
npm run dev
```

## 📚 Documentation

- [Getting Started](./docs/guides/GETTING_STARTED.md) - Setup lengkap
- [Architecture](./docs/architecture/README.md) - Arsitektur sistem
- [API Reference](./docs/api/README.md) - Dokumentasi API
- [Development](./docs/development/README.md) - Panduan development
- [Deployment](./docs/deployment/README.md) - Panduan deployment

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Backend | NestJS 11, TypeScript |
| Database | PostgreSQL 14, Drizzle ORM |
| Queue | Bull + Redis |
| Real-time | Socket.io |
| Payment | Mayar.id |
| Auth | Better Auth |

## 📂 Project Structure

```
sawitea/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
├── packages/
│   ├── database/         # Drizzle schema & config
│   └── shared/           # Shared types & utilities
├── docs/                 # Documentation
├── docker-compose.yml    # Local infrastructure
└── turbo.json           # Turborepo config
```

## 🤝 Contributing

Lihat [CONTRIBUTING.md](./docs/development/CONTRIBUTING.md)

## 📄 License

[MIT License](LICENSE)

---

Made with ❤️ for Indonesian streamers.
