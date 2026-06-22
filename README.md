# Ken Motor | Premium Motorcycle Showroom E-commerce Platform

A high-performance, mobile-first motorcycle catalog and advisory platform built for **Ken Motor** in Đồng Tháp, Vietnam. The project is designed with a premium dark-matte luxury aesthetic and features a fully custom hybrid database engine.

---

## 🚀 Key Features

- **Luxury Matte-Black Theme**: Seamless racing red accents, modern typography (Be Vietnam Pro & Inter), and micro-animations.
- **Hybrid Data Layer**: 
  - **Demo Mode**: Full client-side mock fallback running via `localStorage` when database variables are absent. Features automatic client side seeding of 100+ vehicles, 10 brands, 7 categories, 30 blog posts, etc.
  - **Supabase Mode**: Production-ready mode using Supabase (PostgreSQL, Auth, Storage) when credentials are provided in `.env.local`.
- **Advanced Showroom & Catalog**: Comprehensive specifications filtering, real-time query parameters, and pagination.
- **Smart Advisory Quiz (`/tu-van-chon-xe`)**: Questionnaire-driven vehicle match selector filtering by height, budget, brand, and vehicle category.
- **Comparison Engine (`/so-sanh`)**: Interactive table to compare up to 3 motorbikes side-by-side.
- **Installment Calculator (`/tra-gop`)**: Dynamic simulator parsing terms (6, 12, 18, 24 months), custom down-payments, and interest rates.
- **Customer Leads Intake**: Zalo sharing integration, quote requests, used bike trade-ins, test drives, and client inquiries.
- **Full CMS Console (`/admin`)**: Interactive dashboards, secure route protection, and tabular CRUDs for vehicles, categories, brands, hero sliders (desktop/mobile separate images), blogs, FAQs, settings, and leads management.
- **SEO & Production Optimized**: Auto-generated structured JSON-LD data schemas, dynamic `sitemap.xml`, standard `robots.txt`, and clean SSR compliance.

---

## 🛠️ Technology Stack

- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Database / Auth / Storage**: Supabase (PostgreSQL)
- **Deployment**: Vercel

---

## 📂 Project Structure

```text
web-xemay/
├── public/                 # Static brand assets (logo, favicon)
├── supabase/               # SQL schema definitions and initial seed data scripts
├── scripts/                # Database seed helpers and config builders
└── src/
    ├── app/                # Next.js App Router folders and handlers
    │   ├── admin/          # CMS dashboard controls & login portals
    │   ├── vehicles/       # Showroom filters and dynamic detail pages
    │   ├── sitemap.ts      # Dynamic XML sitemap generator
    │   └── robots.txt      # Search engine robots indexing rules
    ├── components/         # Reusable styling parts (Header, Footer, Cards)
    ├── context/            # Cart state management providers
    └── lib/
        ├── db/             # Unified database API clients (Supabase & LocalStorage fallback)
        └── supabase/       # Supabase initialization handles
```

---

## 📖 Quick Setup & Guides

To fully configure, deploy, and operate the Ken Motor platform, please follow these documents:

1. 📂 [Supabase Setup Guide](file:///d:/D/HQP/web%20xemay/SUPABASE_SETUP.md) — Create the tables, insert seed data, configure Storage, and set up triggers.
2. ☁️ [Vercel Deployment Guide](file:///d:/D/HQP/web%20xemay/VERCEL_SETUP.md) — Import the repository and set up production environment keys.
3. ✅ [Launch & Security Checklist](file:///d:/D/HQP/web%20xemay/DEPLOY_CHECKLIST.md) — Run checks before pointing your domain.
4. ⚙️ [CMS Admin Operator Manual](file:///d:/D/HQP/web%20xemay/ADMIN_GUIDE.md) — Learn how to control vehicles, blogs, banners, and lead request statuses.

---

## 💻 Local Development

1. **Clone and Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables (Optional)**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```
   *If these are empty, the site automatically initializes in Demo Mode (using localStorage).*

3. **Start the local server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the client showroom and [http://localhost:3000/admin](http://localhost:3000/admin) to view the CMS Console (Demo login credentials: `admin@kenmotor.vn` / `admin123`).

4. **Verify production builds**:
   ```bash
   npm run build
   ```
