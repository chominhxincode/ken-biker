# 📂 Supabase Database & Services Setup Guide

This document outlines the steps required to configure your Supabase project for the Ken Motor platform. The site automatically switches from LocalStorage Demo Mode to Supabase Mode as soon as it detects valid environment credentials.

---

## 🛠️ Step 1: Create a Supabase Project

1. Go to the [Supabase Dashboard](https://supabase.com) and log in.
2. Click **New Project** and select your organization.
3. Fill in the project details:
   - **Name**: `Ken Motor`
   - **Database Password**: *Save this securely*
   - **Region**: Select a region close to your target users (e.g., Singapore for Vietnam).
4. Click **Create new project** and wait a few minutes for the database to provision.

---

## 💾 Step 2: Initialize Database Schema

Once your project is ready, execute the SQL schema definition to create the required tables, relations, and settings:

1. In the Supabase sidebar, click on **SQL Editor**.
2. Click **New Query**.
3. Open the file `supabase/supabase-schema.sql` in your workspace and copy its entire contents.
4. Paste the SQL query into the editor.
5. Click **Run** (or press `Ctrl + Enter`).
6. Verify that the console reports successful creation of the following tables:
   - `brands`, `categories`, `vehicles`, `vehicle_images`, `posts`, `sliders`, `faqs`, `testimonials`, `settings`, `quote_requests`, `installment_requests`, `sell_vehicle_requests`, `test_drive_requests`, `contacts`

---

## 🌱 Step 3: Load Showroom Seed Data

To populate the database with the pre-configured **100+ vehicles, 10 brands, 7 categories, 30 blog posts, 8 hero sliders, FAQs, and reviews**:

1. In the SQL Editor, create another **New Query**.
2. Open the file `supabase/seed-data.sql` in your workspace and copy its entire contents (approx. 400KB).
3. Paste the query into the editor.
4. Click **Run**.
5. *Note: The SQL scripts are written with safety guards (`ON CONFLICT DO NOTHING / UPDATE`) and are safe to execute multiple times.*

---

## 🪣 Step 4: Configure Storage Buckets

The Admin CMS requires bucket storage to host image uploads for motorbikes, categories, hero slides, and trade-in receipts.

1. Go to the **Storage** section in the Supabase sidebar.
2. Create the following four public buckets by clicking **New Bucket**:
   - **Name**: `brand-logos` (Make it **Public**)
   - **Name**: `categories` (Make it **Public**)
   - **Name**: `vehicle-images` (Make it **Public**)
   - **Name**: `hero-sliders` (Make it **Public**)
   - **Name**: `blog-posts` (Make it **Public**)
   - **Name**: `sell-requests` (Make it **Public**)

### Storage Security Policies (Row Level Security)
To ensure only authenticated operators can upload/delete images while customers can view them:

For **each** of the buckets created above, click on **Policies** -> **New Policy**:
- **Policy 1: Allow Public Read Access**:
  - **Allowed operations**: `SELECT`
  - **Target Roles**: `public`
  - **Condition**: Set to true (Allow anyone to read objects).
- **Policy 2: Allow Authenticated Create/Update/Delete Access**:
  - **Allowed operations**: `INSERT`, `UPDATE`, `DELETE`
  - **Target Roles**: `authenticated` (Signed-in administrators).

---

## 🔒 Step 5: Configure Row Level Security (RLS) on Tables

To secure your relational tables:
1. Under **Database** -> **Tables**, ensure **RLS** is enabled on administrative tables (`brands`, `categories`, `vehicles`, `vehicle_images`, `posts`, `sliders`, `faqs`, `settings`).
2. Add the following policies:
   - **Public Read**: Anyone can read (`SELECT`).
   - **Admin Write**: Only authenticated users (`authenticated` role) can write/update/delete (`INSERT`, `UPDATE`, `DELETE`).
3. For request tables (`quote_requests`, `installment_requests`, `sell_vehicle_requests`, `test_drive_requests`, `contacts`):
   - **Insert Policy**: Allow public (`anon`) and signed-in users to `INSERT`.
   - **Select/Update Policy**: Allow only authenticated users (`authenticated` role) to `SELECT` and `UPDATE`.

---

## 🔑 Step 6: Connect Your Next.js App

1. Go to **Project Settings** -> **API** in the Supabase dashboard.
2. Copy your **Project URL** and **API key (anon public)**.
3. In your Next.js project root, create a file named `.env.local` and add the keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart your development server (`npm run dev`). The server console should display:
   ```text
   [Database Client] Initialized in SUPABASE (Postgres) Mode.
   ```
