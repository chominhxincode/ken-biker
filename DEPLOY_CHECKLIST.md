# 🚀 Ken Motor Production Launch Checklist

Before pointing your official domain (`kenmotor.vn`) to Vercel and opening the website to the public, complete these quality assurance and security verification checks.

---

## 🔒 1. Security & Database Validation

- [ ] **Auth Credentials**: Open the Supabase dashboard and change the default administrative emails and credentials. If you are using Supabase Auth, ensure you have set up proper admin accounts.
- [ ] **Table RLS Policies**: Enable Row Level Security (RLS) on all PostgreSQL tables. Check that `INSERT`, `UPDATE`, and `DELETE` access are blocked for the public (`anon`) role on content tables (`vehicles`, `brands`, `categories`, `posts`, `sliders`, `settings`, `faqs`).
- [ ] **Leads RLS Policies**: Verify that customers can insert into request tables (`quote_requests`, `installment_requests`, `sell_vehicle_requests`, `test_drive_requests`, `contacts`), but cannot read other customers' entries.
- [ ] **Storage RLS Policies**: Verify that the buckets (`vehicle-images`, `hero-sliders`, `brand-logos`, `categories`, `blog-posts`, `sell-requests`) are marked as **Public** so images resolve, but write permissions are restricted strictly to the `authenticated` role.

---

## ⚡ 2. Environment Variables & APIs

- [ ] **Vercel Env Injection**: Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are defined in the Vercel Production dashboard.
- [ ] **Database Connection Check**: Load the live page and verify it does NOT display the `[DEMO MODE]` warning banner (unless you explicitly choose to run the site offline).
- [ ] **Google Maps Embed**: Open the Admin Settings panel (`/admin/settings`), grab the custom Google Maps iframe embedding code for the new location, paste it, and verify the contact page map updates.

---

## 🔍 3. SEO & Crawlability Audits

- [ ] **Robots.txt**: Visit `https://kenmotor.vn/robots.txt` and verify it allows indexation of main paths while explicitly disallowing `/admin/` and `/cart/`.
- [ ] **Sitemap.xml**: Visit `https://kenmotor.vn/sitemap.xml`. Ensure it loads valid XML and lists all static routes, plus dynamic motorbikes (`/vehicles/honda-sh-125i`) and blog entries (`/blog/huong-dan-mua-xe-tra-gop`).
- [ ] **JSON-LD Schema**: Inspect the home page markup to verify the dynamic `AutoDealer` structured data block contains the correct telephone, email, and coordinates.
- [ ] **Metadata Fallbacks**: Test sharing a link on Zalo or Facebook to confirm the site titles, descriptions, and cover logo graphics display nicely in link preview bubbles.

---

## 📱 4. Responsive & Mobile Performance

- [ ] **Sticky bottom bar**: Emulate a mobile screen and check that the sticky footer with direct hotline calling, Zalo link sharing, and opening hours operates smoothly with clear touch targets.
- [ ] **Touch Target Sizing**: Ensure filters, tabs, comparison lists, and pagination controls have targets of at least `44px x 44px` for easy tap actions.
- [ ] **Installment simulator**: Test calculations using different input parameters (term months, interest rate, downpayment) on iOS and Android viewports.

---

## 📨 5. Functional End-to-End Leads Verification

Submit test submissions for each form:
- [ ] **Quote Inquiry**: Add 2 motorbikes to comparison/cart, click request price quote, fill in details, and submit.
- [ ] **Installment Plan**: Open a detail page, run the calculator, click send request, and verify submission.
- [ ] **Used Bike Trade-In**: Fill in the brand, year, odometer, and upload mock photos, then submit.
- [ ] **Test Drive Booking**: Choose a date, fill in notes, and submit.
- [ ] **CMS Admin Verification**: Log into `/admin`, navigate to the respective lists (Inquiries, Installments, Trade-ins, Test drives), and verify that all test leads display immediately with full customer details. Test changing their statuses to "Contacted", "Consulting", or "Closed" to ensure state saves.
