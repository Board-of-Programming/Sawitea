# ❓ Frequently Asked Questions

## General

### Q: Apa itu Sawitea?
**A:** Sawitea adalah platform donasi untuk streamer Indonesia, alternatif open source untuk Saweria.co. Donor bisa memberikan dukungan finansial dengan mudah via berbagai metode pembayaran.

### Q: Berapa biaya menggunakan Sawitea?
**A:** Sawitea gratis untuk digunakan. Platform fee 5% per donasi untuk maintenance server dan pengembangan fitur.

### Q: Metode pembayaran apa saja yang tersedia?
**A:** Via Mayar.id: QRIS, GoPay, OVO, DANA, LinkAja, Transfer Bank, Kartu Kredit, dan Paylater.

---

## Development

### Q: Error: "Cannot find module '@sawitea/database'"
**A:** Build shared packages terlebih dahulu:
```bash
cd packages/database && npm run build
cd packages/shared && npm run build
```

### Q: Error: "Database connection failed"
**A:** 
1. Pastikan PostgreSQL berjalan:
   ```bash
   brew services list | grep postgresql
   ```
2. Check connection string di `.env`
3. Pastikan database `sawitea` sudah dibuat:
   ```bash
   createdb sawitea
   ```

### Q: Error: "Redis connection failed"
**A:**
1. Pastikan Redis berjalan:
   ```bash
   redis-cli ping
   ```
2. Restart Redis:
   ```bash
   brew services restart redis
   ```

### Q: Port 3000 atau 3001 sudah digunakan
**A:**
```bash
# Kill process pada port tertentu
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Q: Bagaimana cara reset database?
**A:**
```bash
# Drop dan recreate database
dropdb sawitea
createdb sawitea

# Push schema ulang
npm run db:push
```

---

## Deployment

### Q: Bagaimana deploy ke production?
**A:** Lihat [Deployment Guide](../deployment/DEPLOYMENT.md)

### Q: Environment variables apa saja yang wajib?
**A:** Lihat [Environment Variables](./ENVIRONMENT.md)

### Q: Bagaimana setup SSL/HTTPS?
**A:** Gunakan reverse proxy (nginx/traefik) atau platform seperti Vercel/Netlify untuk frontend.

---

## Integration

### Q: Bagaimana integrasi dengan Mayar.id?
**A:**
1. Daftar di https://mayar.id
2. Get API key dari dashboard
3. Set `MAYAR_API_KEY` di environment
4. Configure webhook URL

### Q: Bagaimana setup OBS overlay?
**A:**
1. Copy OBS URL dari dashboard
2. Di OBS, tambahkan Browser Source
3. Paste URL, set 1920x1080
4. Custom CSS: `body { background-color: transparent; }`

### Q: Webhook Mayar.id tidak bekerja?
**A:**
1. Pastikan URL webhook accessible dari internet
2. Check signature validation
3. Check logs di server

---

## Troubleshooting

### Q: Hot reload tidak berfungsi
**A:**
```bash
# Restart dev server
# Clear caches
rm -rf apps/web/.next
rm -rf apps/api/dist
npm run dev
```

### Q: TypeScript errors setelah pull
**A:**
```bash
# Rebuild packages
cd packages/database && npm run build
cd packages/shared && npm run build

# Restart TypeScript server di IDE
```

### Q: Donasi tidak muncul di OBS
**A:**
1. Check WebSocket connection
2. Check browser console di OBS
3. Verify streamer ID di URL
4. Check donation status (harus "completed")

### Q: Notification suara tidak berfungsi
**A:**
1. Check audio settings di OBS
2. Pastikan file audio exists
3. Check browser console untuk errors

---

## Contributing

### Q: Bagaimana cara berkontribusi?
**A:** Lihat [Contributing Guide](../development/CONTRIBUTING.md)

### Q: Format commit message yang benar?
**A:**
```
type(scope): description

Examples:
feat(donation): add email notification
fix(auth): resolve session timeout
docs(readme): update installation guide
```

### Q: Bagaimana menambah fitur baru?
**A:**
1. Buat branch: `git checkout -b feat/nama-fitur`
2. Implementasi dengan tests
3. Update dokumentasi
4. Buat Pull Request

---

## Support

### Q: Dimana mendapat bantuan?
**A:**
- GitHub Issues untuk bug reports
- GitHub Discussions untuk questions
- Discord community (link)

### Q: Bagaimana report security vulnerability?
**A:** Email ke security@sawitea.id jangan buat public issue.

---

Tidak menemukan jawaban? [Buat issue baru](https://github.com/yourusername/sawitea/issues/new)
