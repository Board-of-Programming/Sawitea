# 🚀 Getting Started

Panduan lengkap setup Sawitea untuk development.

## 📋 Prerequisites

### Required
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **PostgreSQL** >= 14
- **Redis** >= 6

### Optional (Recommended)
- **Docker** + Docker Compose
- **Git**

## ⚡ Quick Setup (with Docker)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/sawitea.git
cd sawitea

# 2. Install dependencies
npm install

# 3. Setup environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 4. Start infrastructure (PostgreSQL + Redis)
docker-compose up -d

# 5. Build shared packages
cd packages/shared && npm run build
cd packages/database && npm run build

# 6. Run database migrations
npm run db:push

# 7. Start development servers
npm run dev
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 🔧 Manual Setup (without Docker)

### 1. Install Node.js Dependencies

```bash
# Install root dependencies
npm install

# Build shared packages
cd packages/shared && npm run build
cd packages/database && npm run build
```

### 2. Setup PostgreSQL

```bash
# macOS dengan Homebrew
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb sawitea

# Or dengan psql
psql -c "CREATE DATABASE sawitea;"
```

### 3. Setup Redis

```bash
# macOS dengan Homebrew
brew install redis
brew services start redis

# Verify
redis-cli ping  # Should return PONG
```

### 4. Configure Environment Variables

#### Backend (`apps/api/.env`)
```env
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sawitea

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3001

# Mayar.id (optional untuk development)
MAYAR_API_KEY=
MAYAR_WEBHOOK_SECRET=
```

#### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3001
```

### 5. Database Migrations

```bash
# Generate migrations (if schema changed)
npm run db:generate

# Push to database
npm run db:push

# Open Drizzle Studio (optional)
npm run db:studio
```

### 6. Start Development

Terminal 1 - Backend:
```bash
cd apps/api
npm run start:dev
```

Terminal 2 - Frontend:
```bash
cd apps/web
npm run dev
```

## ✅ Verification

Cek apakah setup berhasil:

1. **Frontend**: Buka http://localhost:3000
2. **Backend API**: http://localhost:3001
3. **Database**: `psql -d sawitea -c "\dt"`
4. **Redis**: `redis-cli ping`

## 🐛 Common Issues

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Database connection failed
```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql@14
```

### Redis connection failed
```bash
# Check Redis status
brew services list | grep redis

# Restart Redis
brew services restart redis
```

### Module not found errors
```bash
# Clean and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

## 📚 Next Steps

- [Database Schema](./DATABASE.md)
- [Development Guide](../development/README.md)
- [API Reference](../api/README.md)

## 🆘 Getting Help

Jika mengalami masalah:

1. Cek [FAQ](./FAQ.md)
2. Baca [Troubleshooting](#-common-issues)
3. Buat issue di GitHub

---

**Related:**
- [Environment Variables](./ENVIRONMENT.md)
- [Docker Setup](../deployment/DOCKER.md)
