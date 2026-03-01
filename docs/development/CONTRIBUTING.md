# 🤝 Contributing Guide

Terima kasih atas minat Anda untuk berkontribusi pada Sawitea!

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork repository di GitHub
# kemudian clone

git clone https://github.com/YOUR_USERNAME/sawitea.git
cd sawitea
```

### 2. Setup Environment

Ikuti [Getting Started Guide](../guides/GETTING_STARTED.md) untuk setup development environment.

### 3. Create Branch

```bash
# Format: type/description
# Types: feat/, fix/, docs/, refactor/, test/

git checkout -b feat/add-new-feature
git checkout -b fix/bug-description
git checkout -b docs/update-readme
```

## 📝 Contribution Guidelines

### Code Style

#### TypeScript
- Gunakan strict mode
- Hindari `any` - gunakan proper types
- Export types yang reusable

```typescript
// ✅ Good
interface DonationData {
  amount: number;
  donorName: string;
}

export async function createDonation(data: DonationData): Promise<Donation> {
  // implementation
}

// ❌ Bad
export async function createDonation(data: any) {
  // implementation
}
```

#### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `DonationForm.tsx` |
| Functions | camelCase | `createDonation` |
| Constants | UPPER_SNAKE | `MAX_DONATION_AMOUNT` |
| Types/Interfaces | PascalCase | `DonationData` |
| Files/Folders | kebab-case | `donation-form.tsx` |

### Commit Messages

Format: `type(scope): description`

```
feat(donation): add email notification
fix(auth): resolve session timeout issue
docs(readme): update installation guide
refactor(api): simplify donation service
test(donation): add unit tests
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process, dependencies

### Pull Request Process

1. **Update Documentation**
   - Update README jika ada perubahan fitur
   - Update API docs jika ada perubahan endpoint
   - Add comments untuk code kompleks

2. **Testing**
   - Pastikan semua tests pass
   - Add tests untuk fitur baru
   - Test manual untuk UI changes

3. **PR Template**
   ```markdown
   ## Description
   Deskripsi perubahan

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Refactoring

   ## Testing
   - [ ] Tests pass
   - [ ] Manual testing done

   ## Checklist
   - [ ] Code follows style guide
   - [ ] Self-review completed
   - [ ] Documentation updated
   ```

## 🏗️ Development Workflow

### Adding New Feature

1. **Database (if needed)**
   ```bash
   # Update schema
   # packages/database/src/schema/feature.ts
   
   # Rebuild
   cd packages/database && npm run build
   
   # Push to database
   npm run db:push
   ```

2. **Backend API**
   ```bash
   # Create module structure
   apps/api/src/feature/
   ├── feature.module.ts
   ├── feature.controller.ts
   ├── feature.service.ts
   └── dto/
       └── create-feature.dto.ts
   ```

3. **Frontend**
   ```bash
   # Create components
   apps/web/src/components/feature/
   
   # Add validation
   apps/web/src/lib/validations/feature.ts
   
   # Create page (if needed)
   apps/web/src/app/feature/page.tsx
   ```

4. **Documentation**
   - Update API docs: `docs/api/`
   - Update guides: `docs/guides/`
   - Add to README

### Database Changes

1. **Schema Update**
   ```typescript
   // packages/database/src/schema/
   export const newTable = pgTable("new_table", {
     // fields
   });
   ```

2. **Migration**
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Update Types**
   ```typescript
   export type NewTable = typeof newTable.$inferSelect;
   ```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
cd apps/api
npm run test

# Run specific test
npm run test -- donation.service.spec.ts

# Run with coverage
npm run test:cov
```

### Frontend Tests

```bash
# Run all tests
cd apps/web
npm run test

# Run in watch mode
npm run test:watch
```

### E2E Tests

```bash
cd apps/api
npm run test:e2e
```

## 🐛 Reporting Bugs

Gunakan template berikut:

```markdown
**Description**
Deskripsi bug

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
Apa yang seharusnya terjadi

**Actual Behavior**
Apa yang sebenarnya terjadi

**Environment**
- OS: [e.g., macOS, Windows]
- Node version: [e.g., 20.5.0]
- Browser: [e.g., Chrome 120]

**Screenshots**
Jika ada
```

## 💡 Feature Requests

Gunakan template berikut:

```markdown
**Is your feature request related to a problem?**
Deskripsi masalah

**Describe the solution you'd like**
Solusi yang diinginkan

**Describe alternatives you've considered**
Alternatif lain yang dipertimbangkan

**Additional context**
Context tambahan
```

## 📚 Resources

- [Getting Started](../guides/GETTING_STARTED.md)
- [Architecture Overview](../architecture/SYSTEM_OVERVIEW.md)
- [API Reference](../api/README.md)
- [AI Assistant Guide](./AI_GUIDE.md)

## ❓ Questions?

- Join our Discord (link)
- Create GitHub Discussion
- Email: contact@sawitea.id

---

Terima kasih telah berkontribusi! 🎉
