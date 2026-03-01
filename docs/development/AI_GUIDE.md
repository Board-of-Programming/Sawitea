# 🤖 AI Assistant Guide

Panduan khusus untuk AI assistants yang membantu mengembangkan Sawitea.

## 🎯 Quick Context

**Project Type:** Full-stack monorepo donation platform
**Stack:** Next.js + NestJS + PostgreSQL + Drizzle + Better Auth
**Main Feature:** Real-time donation with OBS overlay

## 📁 Key Files for AI

When working on Sawitea, always check these files first:

```
# Project Structure
sawitea/
├── apps/
│   ├── web/src/
│   │   ├── components/donation/donation-form.tsx  # Main donation UI
│   │   ├── app/user/[username]/page.tsx           # Streamer profile
│   │   ├── app/obs/page.tsx                       # OBS overlay
│   │   └── app/dashboard/page.tsx                 # Streamer dashboard
│   └── api/src/
│       ├── donation/donation.service.ts           # Donation logic
│       ├── donation/donation.controller.ts        # API endpoints
│       ├── websocket/donation.gateway.ts          # WebSocket events
│       └── payment/mayar.service.ts               # Payment integration
├── packages/database/src/
│   └── schema/
│       ├── auth.ts                                # User tables
│       └── donation.ts                            # Donation tables
└── docs/                                          # This documentation
```

## 🏗️ Architecture Patterns

### 1. Feature-Based Structure
```
feature/
├── feature.module.ts      # NestJS module
├── feature.controller.ts  # HTTP routes
├── feature.service.ts     # Business logic
├── feature.gateway.ts     # WebSocket (optional)
├── feature.processor.ts   # Bull queue (optional)
└── dto/
    └── create-feature.dto.ts
```

### 2. Database Schema Pattern
```typescript
// packages/database/src/schema/feature.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const featureTable = pgTable("feature_table", {
  id: text("id").primaryKey(),
  // fields...
  createdAt: timestamp("created_at").defaultNow(),
});

export type Feature = typeof featureTable.$inferSelect;
export type NewFeature = typeof featureTable.$inferInsert;
```

### 3. API Pattern (NestJS)
```typescript
@Controller("feature")
export class FeatureController {
  constructor(private readonly service: FeatureService) {}

  @Post()
  async create(@Body() dto: CreateFeatureDto) {
    return this.service.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.service.findById(id);
  }
}
```

### 4. Form Pattern (React + Zod)
```typescript
// Schema
const schema = z.object({
  field: z.string().min(1),
});

// Component
const form = useForm({
  resolver: zodResolver(schema),
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="field"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

## 🔄 Common Workflows

### Adding a New Feature

1. **Database First**
   ```bash
   # Edit: packages/database/src/schema/newFeature.ts
   # Then rebuild
   cd packages/database && npm run build
   ```

2. **Backend API**
   ```bash
   # Create module
   cd apps/api/src
   mkdir new-feature
   
   # Files to create:
   # - new-feature.module.ts
   # - new-feature.controller.ts
   # - new-feature.service.ts
   # - dto/create-new-feature.dto.ts
   ```

3. **Frontend**
   ```bash
   # Create component
   cd apps/web/src
   
   # Files to create:
   # - components/new-feature/new-feature-component.tsx
   # - lib/validations/new-feature.ts (Zod schema)
   # - app/feature/page.tsx (if needed)
   ```

### Database Migration

```bash
# 1. Update schema file
# packages/database/src/schema/*.ts

# 2. Build package
cd packages/database && npm run build

# 3. Push to database
npm run db:push

# 4. Verify in Drizzle Studio
npm run db:studio
```

### Adding an API Endpoint

```typescript
// 1. Controller (apps/api/src/feature/feature.controller.ts)
@Get("new-endpoint")
async newEndpoint(@Query("param") param: string) {
  return this.service.handleNewEndpoint(param);
}

// 2. Service (apps/api/src/feature/feature.service.ts)
async handleNewEndpoint(param: string) {
  // Implementation
  return result;
}

// 3. Frontend API (apps/web/src/lib/api.ts)
export const featureApi = {
  newEndpoint: async (param: string) => {
    const response = await api.get("/feature/new-endpoint", {
      params: { param },
    });
    return response.data;
  },
};
```

## 🛠️ Code Generation Templates

### NestJS Module
```typescript
// {{name}}.module.ts
import { Module } from "@nestjs/common";
import { {{Name}}Controller } from "./{{name}}.controller";
import { {{Name}}Service } from "./{{name}}.service";

@Module({
  controllers: [{{Name}}Controller],
  providers: [{{Name}}Service],
  exports: [{{Name}}Service],
})
export class {{Name}}Module {}
```

### React Component
```typescript
// {{name}}.tsx
"use client";

import { useState } from "react";

interface {{Name}}Props {
  // props
}

export function {{Name}}({ }: {{Name}}Props) {
  return (
    <div>
      {/* component */}
    </div>
  );
}
```

### Zod Schema
```typescript
// {{name}}.ts
import { z } from "zod";

export const {{name}}Schema = z.object({
  // fields
});

export type {{Name}}Data = z.infer<typeof {{name}}Schema>;
```

## 🧪 Testing Approach

### Unit Test (Backend)
```typescript
// feature.service.spec.ts
describe("FeatureService", () => {
  let service: FeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FeatureService],
    }).compile();
    service = module.get<FeatureService>(FeatureService);
  });

  it("should create feature", async () => {
    const result = await service.create({ /* data */ });
    expect(result).toBeDefined();
  });
});
```

### Component Test (Frontend)
```typescript
// feature-component.test.tsx
import { render, screen } from "@testing-library/react";
import { {{Name}} } from "./{{name}}";

describe("{{Name}}", () => {
  it("renders correctly", () => {
    render(<{{Name}} />);
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
});
```

## 📋 Checklist for AI

When implementing features, verify:

### Backend
- [ ] DTO validation with class-validator
- [ ] Proper error handling
- [ ] Type safety throughout
- [ ] WebSocket events if real-time
- [ ] Queue jobs if background processing

### Frontend
- [ ] Zod validation schema
- [ ] React Hook Form integration
- [ ] Error messages displayed
- [ ] Loading states
- [ ] Success/error toasts

### Database
- [ ] Schema in packages/database
- [ ] Types exported
- [ ] Relations defined
- [ ] Migration ready

### General
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] TypeScript strict mode
- [ ] No console.log in production code

## 🔍 Debugging Tips

### Backend
```typescript
// Enable NestJS debug logging
// apps/api/src/main.ts
const app = await NestFactory.create(AppModule, {
  logger: ["error", "warn", "log", "debug", "verbose"],
});

// Add breakpoints
// Use VSCode debugger with launch.json
```

### Frontend
```typescript
// React Query devtools
// Enabled automatically in development

// Check TanStack Query cache
// Open React Query Devtools in browser
```

### Database
```bash
# Check current schema
psql -d sawitea -c "\dt"

# Check table structure
psql -d sawitea -c "\d donation"

# View recent records
psql -d sawitea -c "SELECT * FROM donation ORDER BY created_at DESC LIMIT 5;"
```

## 🆘 Common Issues

### "Cannot find module"
```bash
# Rebuild packages
cd packages/database && npm run build
cd packages/shared && npm run build

# Clear Next.js cache
rm -rf apps/web/.next
```

### "Database connection failed"
```bash
# Check PostgreSQL
brew services list | grep postgresql
brew services restart postgresql@14

# Verify connection string in .env
```

### "Redis connection failed"
```bash
# Check Redis
redis-cli ping
brew services restart redis
```

## 📚 Quick References

### File Locations
| Purpose | Path |
|---------|------|
| Main donation form | `apps/web/src/components/donation/donation-form.tsx` |
| Donation API | `apps/api/src/donation/` |
| Database schema | `packages/database/src/schema/` |
| Environment vars | `apps/api/.env`, `apps/web/.env.local` |
| API client | `apps/web/src/lib/api.ts` |
| Validations | `apps/web/src/lib/validations/` |

### Key Commands
```bash
# Development
npm run dev              # Start all apps
npm run db:push         # Push schema to DB
npm run db:studio       # Open Drizzle Studio

# Building
cd packages/database && npm run build
cd packages/shared && npm run build

# Testing
npm run test            # Run all tests
```

---

**Remember:**
- Always check existing code patterns before implementing
- Keep types strict (no `any`)
- Document new environment variables
- Test in both dev and production modes

**Questions?** Check:
1. [System Overview](../architecture/SYSTEM_OVERVIEW.md)
2. [API Reference](../api/README.md)
3. [Getting Started](../guides/GETTING_STARTED.md)
