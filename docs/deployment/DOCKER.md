# 🐳 Docker Deployment

Panduan deployment menggunakan Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/sawitea.git
cd sawitea
```

### 2. Environment Variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Edit dengan production values
nano apps/api/.env
```

### 3. Start with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services akan tersedia di:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 📁 Docker Compose Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend - Next.js
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001
    depends_on:
      - api
    networks:
      - sawitea-network

  # Backend - NestJS
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/sawitea
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - postgres
      - redis
    networks:
      - sawitea-network

  # Database - PostgreSQL
  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=sawitea
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - sawitea-network

  # Queue - Redis
  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - sawitea-network

volumes:
  postgres-data:
  redis-data:

networks:
  sawitea-network:
    driver: bridge
```

## 🐋 Dockerfiles

### Frontend (apps/web/Dockerfile)

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/*/package*.json ./packages/*/
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build --workspace=web

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy build output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Backend (apps/api/Dockerfile)

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/*/package*.json ./packages/*/
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build --workspace=api

EXPOSE 3001

CMD ["node", "apps/api/dist/main.js"]
```

## 🔧 Production Configuration

### With SSL (Let's Encrypt)

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
      - api
    networks:
      - sawitea-network

  # ... other services
```

### Environment Variables for Production

Create `.env.production`:

```env
# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/sawitea

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Better Auth
BETTER_AUTH_SECRET=your-production-secret-32-chars
BETTER_AUTH_URL=https://api.yourdomain.com

# Mayar.id
MAYAR_API_KEY=your-production-api-key
MAYAR_WEBHOOK_SECRET=your-webhook-secret

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📊 Monitoring

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f postgres
```

### Health Checks

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats
```

## 🔄 Updates

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Run migrations
docker-compose exec api npm run db:migrate
```

### Database Migrations

```bash
# Generate migration
docker-compose exec api npm run db:generate

# Run migration
docker-compose exec api npm run db:migrate
```

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean up system
docker system prune -a
```

## 🆘 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs [service-name]

# Check for port conflicts
docker-compose ps

# Restart specific service
docker-compose restart [service-name]
```

### Database connection failed

```bash
# Check postgres container
docker-compose logs postgres

# Verify network
docker network ls
docker network inspect sawitea-network
```

### Permission issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Run with sudo (not recommended for production)
sudo docker-compose up -d
```

---

**Related:**
- [Deployment Guide](./DEPLOYMENT.md)
- [Environment Setup](../guides/ENVIRONMENT.md)
