# ⚙️ Ken Motor CMS Admin Console Guide

Welcome to the operator manual for the Ken Motor CMS Administration Dashboard. This guide will walk you through how to manage vehicle catalogs, process inbound customer leads, post articles, update hero sliders, and change store-wide settings.

---

## 🔑 1. Logging In

1. Navigate to `/admin` on your website (e.g. `https://kenmotor.vn/admin` or `http://localhost:3000/admin`).
2. Input your administrative email and password:
   - **Demo Mode Defaults**:
     - **Email**: `admin@kenmotor.vn`
     - **Password**: `admin123`
   - *In Supabase production mode, use the email/password credentials created within the Supabase Auth panel.*
3. Click **Đăng Nhập**. You will be redirected to the main dashboard workspace.

---

## 📊 2. Dashboard Overview

The landing page displays important statistical indicators:
- **Metrics Cards**: Quick count of Total Vehicles, Active Quotes, Loan/Installment Requests, Used Bike Appraisals, and Test Drive appointments.
- **Recent Leads Table**: Displays the newest incoming submissions across all services. Click any row or use the side nav to view specific tables.

---

## 🏍️ 3. Managing the Vehicle Catalog (`/admin/vehicles`)

Click **Sản phẩm (Xe máy)** in the sidebar to view all showroom models.

### Add a New Vehicle:
1. Click **+ Thêm xe mới**.
2. **Thông tin cơ bản**:
   - **Tên xe**: (e.g., `Honda SH Mode 125cc 2026`)
   - **Hãng & Danh mục**: Choose from dropdown list.
   - **Giá bán**: Price in VND.
   - **Giá khuyến mãi**: If applicable (leaves it as blank to hide promo badge).
   - **Tình trạng**: Select **Mới (New)** or **Đã qua sử dụng (Used)**.
     - *If "Đã qua sử dụng", fill in the Registration Year and Odometer (KM).*
3. **Thông số kỹ thuật & Tiêu thụ**:
   - Fill in details like color, brake type, fuel consumption (e.g., `1.85L/100km`), warranty period.
4. **Mô tả**:
   - Short description (shows in catalog page).
   - Rich detailed description.
5. **Thông số chi tiết (Dynamic Specs)**:
   - Under the specifications editor, click **+ Thêm dòng** to insert raw properties (e.g., `Dung tích bình xăng` - `5.6 lít`, `Khối lượng bản thân` - `116 kg`).
6. **Cam kết chất lượng (Used Bike Checklist)**:
   - For pre-owned bikes, customize the checklists (e.g., `Động cơ zin` - `Đạt`, `Không tai nạn` - `Đạt`).
7. **Trạng thái hiển thị**:
   - Toggle **Nổi bật (Featured)**, **Mới về (New Arrival)**, or **Đã bán (Sold)**.
   - Toggle **Hiển thị (Visible)** to control whether the bike is public.
8. Click **Lưu lại**.

### Managing Images & Cover:
- Inside the vehicle edit page, you can upload multiple pictures.
- **Cover Selector**: Select one image as the primary cover. This image is used as the cover on the catalog and details page.
- **Drag and Drop Reordering**: Drag uploads to define their carousel sort order.

---

## 📂 4. Brands & Categories (`/admin/brands` and `/admin/categories`)

- Keep logos and catalog thumbnails updated.
- Modify SEO Title and SEO Description for each Category or Brand page to optimize search engine ranking results.

---

## 📨 5. Processing Customer Leads & Requests

The admin console keeps individual folders for customer leads:
1. **Yêu cầu báo giá (Quotes)**: Lists inquiries for bulk quotes or vehicle purchases.
2. **Hồ sơ trả góp (Installment Loan Calculators)**: Lists details on the down payment, chosen term (e.g., 12 months), and interest rate.
3. **Thu mua xe cũ (Used Trade-ins)**: View used vehicles submitted by visitors, including photos, odometer readings, and desired prices.
4. **Đăng ký lái thử (Test Drives)**: Schedules for vehicle test drives.

### Changing Request Status:
- Select a row in any requests panel.
- Update the **Trạng thái (Status)** dropdown:
  - `Chờ xử lý (Pending)`
  - `Đã liên hệ (Contacted)`
  - `Đang tư vấn (Consulting)`
  - `Hoàn tất (Closed)`
  - `Đã hủy (Cancelled)`
- Type **Ghi chú nội bộ (Internal Notes)** to track negotiations, phone calls, or appointments. Click **Lưu ghi chú** to save.

---

## 📝 6. Writing Blog Posts (`/admin/blog`)

Keep customers engaged with maintenance advice, buying guides, and reviews.
1. Click **+ Viết bài mới**.
2. Add Title, Excerpt, Content (markdown/text), and upload a cover thumbnail.
3. Update specific SEO fields to help the post rank on search engines.
4. Click **Lưu bài viết**.

---

## 🖼️ 7. Cinematic Banner Sliders (`/admin/sliders`)

Update homepage banners for promotional campaigns.
- Upload **separate images for Desktop and Mobile viewports**:
  - **Desktop Recommended Aspect**: `16:9` or `1920x800`
  - **Mobile Recommended Aspect**: `4:5` or `800x1000` (prevents crop overflows on handheld layouts).
- Set the **CTA Link** (e.g., `/vehicles?brand=honda` or `/tra-gop`) and **CTA Button Text** (e.g., `Xem Ngay`).

---

## 🔧 8. Global Settings (`/admin/settings`)

Manage site settings in one place:
- **Hotline & Zalo Links**: Controls the phone calling features and the quick Zalo chat sharing integrations.
- **Store Address & Maps**: Insert raw iframe map embed codes (generated from Google Maps share panel).
- **Default SEO parameters**: Set the default site title and meta descriptions used when individual pages don't define them.
- **Logos & Icons**: Swap site header logo files or browser shortcut icon links.
