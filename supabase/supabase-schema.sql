-- Ken Motor Database Schema
-- Production Ready with UUIDs and re-run safety

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BRANDS
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. VEHICLES
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES brands(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    promo_price NUMERIC(15, 2),
    is_new BOOLEAN NOT NULL DEFAULT TRUE,
    registration_year INT,
    odometer INT DEFAULT 0,
    engine_capacity VARCHAR(50),
    color VARCHAR(100),
    brake_type VARCHAR(100),
    fuel_consumption VARCHAR(100),
    warranty VARCHAR(100),
    short_desc TEXT,
    detail_desc TEXT,
    specs_json JSONB DEFAULT '{}'::jsonb,
    used_checklist_json JSONB DEFAULT '{}'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_sold BOOLEAN DEFAULT FALSE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    og_image TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. VEHICLE IMAGES
CREATE TABLE IF NOT EXISTS vehicle_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. POSTS (Blog)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    content_markdown TEXT,
    content_html TEXT,
    content_type VARCHAR(50) DEFAULT 'markdown',
    image_url TEXT,
    excerpt TEXT,
    tags TEXT[] DEFAULT '{}'::text[],
    is_featured BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. SLIDERS (Hero Banner)
CREATE TABLE IF NOT EXISTS sliders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    subtitle TEXT,
    image_url TEXT,
    image_desktop_url TEXT NOT NULL,
    image_mobile_url TEXT,
    cta_link VARCHAR(255),
    cta_text VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 7. SETTINGS
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB DEFAULT '{}'::jsonb NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. PAGE CONTENTS
CREATE TABLE IF NOT EXISTS page_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name VARCHAR(100) UNIQUE NOT NULL,
    content_json JSONB DEFAULT '{}'::jsonb NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. QUOTE REQUESTS
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    notes TEXT,
    vehicle_ids JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of vehicle IDs
    total_price NUMERIC(15, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- Pending, Contacted, Consulting, Closed, Cancelled
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 10. INSTALLMENT REQUESTS
CREATE TABLE IF NOT EXISTS installment_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    price NUMERIC(15, 2) NOT NULL,
    downpayment NUMERIC(15, 2) NOT NULL,
    term_months INT NOT NULL,
    interest_rate NUMERIC(5, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- Pending, Contacted, Consulting, Closed, Cancelled
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 11. SELL VEHICLE REQUESTS
CREATE TABLE IF NOT EXISTS sell_vehicle_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    brand_name VARCHAR(255) NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    year INT,
    license_plate VARCHAR(50),
    odometer INT,
    status_description TEXT,
    image_urls JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of image URLs
    desired_price NUMERIC(15, 2),
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- Pending, Contacted, Consulting, Closed, Cancelled
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 12. TEST DRIVE REQUESTS
CREATE TABLE IF NOT EXISTS test_drive_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    desired_date DATE NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- Pending, Contacted, Consulting, Closed, Cancelled
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 13. CONTACTS
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- Pending, Contacted, Consulting, Closed, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 14. FAQS
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 15. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(255),
    comment TEXT NOT NULL,
    rating INT DEFAULT 5 NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle ON vehicle_images(vehicle_id);

-- Trigger for updated_at in settings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_page_contents_updated_at ON page_contents;
CREATE TRIGGER update_page_contents_updated_at
    BEFORE UPDATE ON page_contents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Safe migrations for existing databases (can run multiple times safely)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_markdown TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_html TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_type VARCHAR(50) DEFAULT 'markdown';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'::text[];
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE sliders ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS image_desktop_url TEXT;
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS image_mobile_url TEXT;
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sliders_updated_at ON sliders;
CREATE TRIGGER update_sliders_updated_at
    BEFORE UPDATE ON sliders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

