// TypeScript Types matching database schema

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
}

export interface Vehicle {
  id: string;
  brand_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  promo_price: number | null;
  is_new: boolean;
  registration_year: number | null;
  odometer: number;
  engine_capacity: string | null;
  color: string | null;
  brake_type: string | null;
  fuel_consumption: string | null;
  warranty: string | null;
  short_desc: string | null;
  detail_desc: string | null;
  specs_json: Record<string, string>; // Parse or JSON direct
  used_checklist_json: Record<string, string>; // Checklists
  is_featured: boolean;
  is_new_arrival: boolean;
  is_sold: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image?: string | null;
  is_visible: boolean;
  created_at?: string;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  sort_order: number;
  is_cover: boolean;
  created_at?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  content_markdown?: string | null;
  content_html?: string | null;
  content_type?: 'markdown' | 'html';
  image_url: string | null;
  excerpt: string | null;
  tags?: string[] | null;
  is_featured?: boolean;
  is_visible?: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Slider {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url?: string | null;
  image_desktop_url: string;
  image_mobile_url: string | null;
  cta_link: string | null;
  cta_text: string | null;
  sort_order: number;
  is_visible?: boolean;
  created_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string | null;
  comment: string;
  rating: number;
  sort_order: number;
  created_at?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  vehicle_ids: string[]; // parsed from jsonb
  total_price: number;
  status: string; // Pending, Contacted, Consulting, Closed, Cancelled
  internal_notes?: string | null;
  created_at?: string;
}

export interface InstallmentRequest {
  id: string;
  name: string;
  phone: string;
  vehicle_id: string | null;
  price: number;
  downpayment: number;
  term_months: number;
  interest_rate: number;
  status: string;
  internal_notes?: string | null;
  created_at?: string;
}

export interface SellVehicleRequest {
  id: string;
  name: string;
  phone: string;
  brand_name: string;
  model_name: string;
  year: number | null;
  license_plate: string | null;
  odometer: number | null;
  status_description: string | null;
  image_urls: string[]; // parsed from jsonb
  desired_price: number | null;
  status: string;
  internal_notes?: string | null;
  created_at?: string;
}

export interface TestDriveRequest {
  id: string;
  name: string;
  phone: string;
  vehicle_id: string | null;
  desired_date: string;
  notes: string | null;
  status: string;
  internal_notes?: string | null;
  created_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string;
  created_at?: string;
}

export interface GeneralSettings {
  site_name: string;
  hotline: string;
  zalo_link: string;
  email: string;
  address: string;
  facebook_link?: string;
  tiktok_link?: string;
  youtube_link?: string;
  google_maps_iframe?: string;
  seo_default_title?: string;
  seo_default_description?: string;
  logo_url?: string;
  favicon_url?: string;
  // homepage configurations:
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_text?: string;
  hero_cta_link?: string;
  hero_image_desktop?: string;
  hero_image_mobile?: string;
  homepage_section_title?: string;
  intro_content?: string;
  intro_image?: string;
  cta_consult_text?: string;
  cta_consult_link?: string;
  cta_installment_text?: string;
  cta_installment_link?: string;
  footer_text?: string;
  og_image_url?: string;
}
