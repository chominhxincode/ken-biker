# ☁️ Vercel Deployment & Configurations Guide

This guide details how to deploy the Ken Motor showroom application onto the Vercel cloud platform for high-performance edge rendering.

---

## 🏗️ Step 1: Push Code to Git (GitHub/GitLab/Bitbucket)

1. Create a repository on your preferred Git provider (e.g. GitHub).
2. Connect your local workspace and push the current branches:
   ```bash
   git remote add origin https://github.com/your-username/ken-motor.git
   git branch -M main
   git push -u origin main
   ```

---

## 🚀 Step 2: Import Project to Vercel

1. Navigate to the [Vercel Dashboard](https://vercel.com) and log in.
2. Click **Add New** -> **Project**.
3. Select your Git namespace and find the `ken-motor` repository, then click **Import**.
4. On the **Configure Project** screen:
   - **Framework Preset**: Vercel will automatically detect `Next.js`.
   - **Root Directory**: `./` (leave unchanged).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `.next` (default).

---

## 🔑 Step 3: Set Environment Variables

Before triggering the deployment build, you must inject the Supabase credentials. Expand the **Environment Variables** panel and add:

| Key | Value | Scope | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development | Your project's API endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Production, Preview, Development | Public anonymous API key |

> [!IMPORTANT]
> If these environment variables are left blank, Vercel will build the project successfully but it will operate in **Demo Mode (LocalStorage)**, which will reset user updates whenever they clear local browser cache.

---

## ⚡ Step 4: Deploy

1. Click **Deploy**.
2. Vercel will build the TypeScript assets, generate static routes (pre-rendering sitemaps and catalogs), and serve the bundle.
3. Once finished, click on the preview image to visit the live URL.

---

## 🌐 Step 5: Custom Domain Configuration

1. In Vercel, go to **Settings** -> **Domains**.
2. Enter your custom domain name (e.g., `kenmotor.vn`) and click **Add**.
3. Point your DNS records on your domain registrar (e.g. Mat Bao, Pavietnam, Cloudflare) as specified:
   - **A Record**: Point `@` to `76.76.21.21`
   - **CNAME Record**: Point `www` to `cname.vercel-dns.com`
4. Wait for SSL certificate generation and DNS propagation (typically 5 to 15 minutes).

---

## 🔄 Step 6: Webhooks for Revalidation (Optional)

Since many showroom pages are prerendered statically (`ISR/Static`), they will update dynamically on request.
If you want updates to propagate immediately when you update models in the database, Next.js handles caching revalidation natively. You can trigger manual builds on Vercel by creating a **Deploy Hook**:
1. Go to **Settings** -> **Git** -> **Deploy Hooks**.
2. Create a hook named `db_rebuild` pointing to the `main` branch.
3. Copy the POST URL. You can invoke this URL from Supabase functions whenever database modifications occur.
