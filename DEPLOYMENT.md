# 🚀 راهنمای دیپلوی

## دیپلوی روی Vercel با Supabase

### 1. ساخت دیتابیس Supabase

1. برو به [supabase.com](https://supabase.com)
2. ثبت‌نام کن یا لاگین کن
3. **New Project** بزن
4. یک نام و پسورد قوی انتخاب کن (این پسورد رو یادداشت کن!)
5. Region رو انتخاب کن (Singapore برای ایران بهتره)
6. **Create new project** بزن
7. صبر کن تا پروژه آماده بشه (1-2 دقیقه)

### 2. گرفتن Connection String

بعد از آماده شدن پروژه:

1. برو به **Settings** (آیکون چرخ‌دنده)
2. برو به **Database**
3. پایین صفحه، قسمت **Connection string** رو پیدا کن
4. **URI** رو انتخاب کن
5. کپی کن و `[YOUR-PASSWORD]` رو با پسوردی که انتخاب کردی جایگزین کن

مثال:

```
postgresql://postgres:your-password@db.abcdefghijk.supabase.co:5432/postgres
```

### 3. تنظیم Environment Variables در Vercel

1. برو به Vercel Dashboard
2. پروژه‌ت رو انتخاب کن
3. برو به **Settings** > **Environment Variables**
4. این متغیرها رو اضافه کن:

```
DATABASE_URL=postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres
JWT_SECRET=897c507ffb1d612c8d131b163476531d74e9f34a23a3c087f4d478183a9a6f4ce577b22ee786cda86f77a18a538b04ef64001b6b697956c3ee75ad8e11780d15
ADMIN_USERNAME=keihan
ADMIN_PASSWORD=seta2003K
```

⚠️ **مهم:** `JWT_SECRET` رو حتماً عوض کن!

### 4. Push کردن Schema به Supabase

بعد از اولین deploy:

```bash
# نصب Vercel CLI
npm i -g vercel

# لاگین
vercel login

# لینک کردن پروژه
vercel link

# دانلود environment variables
vercel env pull .env.production

# Push کردن schema
npx prisma db push
```

یا می‌تونی مستقیم از local:

```bash
# فایل .env.production بساز و connection string رو بذار
DATABASE_URL="postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres"

# Push schema
npx prisma db push
```

### 5. Deploy

کدت رو به GitHub push کن - Vercel خودکار deploy می‌کنه!

---

## Local Development

برای توسعه محلی از SQLite استفاده می‌کنیم:

```bash
# نصب dependencies
pnpm install

# ساخت دیتابیس محلی
pnpm db:reset

# اجرای dev server
pnpm dev
```

---

## دستورات دیتابیس

```bash
# Local (SQLite)
pnpm db:push:local      # Push تغییرات schema
pnpm db:studio:local    # باز کردن Prisma Studio
pnpm db:reset           # ریست دیتابیس

# Production (PostgreSQL)
pnpm db:push            # Push schema به production
pnpm db:studio          # باز کردن Prisma Studio برای production
```

---

## دسترسی ادمین

اولین بار که لاگین می‌کنی، یوزر ادمین خودکار از environment variables ساخته میشه:

- Username: مقدار `ADMIN_USERNAME`
- Password: مقدار `ADMIN_PASSWORD`

آدرس پنل ادمین: `/admin/login`

---

## API Endpoints

- `POST /api/track` - ثبت بازدیدکننده (خودکار)
- `GET /api/stats` - دریافت آمار (نیاز به احراز هویت)
- `POST /api/auth/login` - لاگین ادمین
- `POST /api/auth/logout` - خروج ادمین
- `GET /api/auth/check` - بررسی وضعیت لاگین

---

## نکات مهم

### امنیت

- حتماً `JWT_SECRET` رو تغییر بده
- از پسورد قوی برای ادمین استفاده کن
- Connection string رو هیچ‌وقت commit نکن

### Supabase Free Tier

- 500 MB دیتابیس
- Unlimited API requests
- 2 GB bandwidth
- برای این پروژه کاملاً کافیه!

### مشکلات رایج

**خطا: Can't reach database server**

- چک کن connection string درست باشه
- مطمئن شو پسورد رو درست جایگزین کردی
- Region Supabase رو چک کن

**خطا: P3009 migrate.lock file is missing**

- نگران نباش! از `prisma db push` استفاده کن نه `prisma migrate`

**دیتابیس خالیه**

- مطمئن شو `prisma db push` رو اجرا کردی
- چک کن environment variables در Vercel درست باشن
