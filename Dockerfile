# ============================================
# Multi-service Dockerfile for Coolify
# Supports: api (NestJS) and web (Next.js)
# ============================================

# ============================================
# Base Stage
# ============================================
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ============================================
# Dependencies Stage
# ============================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/drizzle.config.ts ./packages/database/

# Install all dependencies
RUN npm ci

# ============================================
# Builder Stage
# ============================================
FROM base AS builder

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json* ./package-lock.json*

# Copy source code
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./turbo.json

# Build packages
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=@sawitea/database

# Build API
RUN npm run build --workspace=@sawitea/api

# Build Web
RUN npm run build --workspace=@sawitea/web

# ============================================
# API Production Stage
# ============================================
FROM base AS api

ENV NODE_ENV=production
ENV PORT=3001

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

USER nestjs

EXPOSE 3001

CMD ["node", "dist/main"]

# ============================================
# Web Production Stage
# ============================================
FROM base AS web

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
