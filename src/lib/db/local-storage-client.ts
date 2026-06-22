import {
  Brand, Category, Vehicle, VehicleImage, Post, Slider, FAQ, Testimonial,
  QuoteRequest, InstallmentRequest, SellVehicleRequest, TestDriveRequest, Contact, GeneralSettings
} from './types';
import * as defaults from './seed-defaults';

// Helper to check if running on browser (Client-Side)
const isBrowser = typeof window !== 'undefined';

// Parse default vehicles lazy JSON strings
const PARSED_DEFAULT_VEHICLES: Vehicle[] = defaults.DEFAULT_VEHICLES.map(v => ({
  ...v,
  specs_json: typeof v.specs_json === 'string' ? JSON.parse(v.specs_json) : (v.specs_json || {}),
  used_checklist_json: typeof v.used_checklist_json === 'string' ? JSON.parse(v.used_checklist_json) : (v.used_checklist_json || {})
}));

// Parse default quote requests
const PARSED_DEFAULT_QUOTE_REQUESTS: QuoteRequest[] = defaults.DEFAULT_QUOTE_REQUESTS.map(q => ({
  ...q,
  vehicle_ids: typeof q.vehicle_ids === 'string' ? JSON.parse(q.vehicle_ids) : (Array.isArray(q.vehicle_ids) ? q.vehicle_ids : [])
}));

// Parse default sell requests
const PARSED_DEFAULT_SELL_REQUESTS: SellVehicleRequest[] = defaults.DEFAULT_SELL_VEHICLE_REQUESTS.map(s => ({
  ...s,
  image_urls: typeof s.image_urls === 'string' ? JSON.parse(s.image_urls) : (Array.isArray(s.image_urls) ? s.image_urls : [])
}));

// In-memory cache fallback for Server-Side Rendering (SSR)
class InMemoryDb {
  brands: Brand[] = [...defaults.DEFAULT_BRANDS];
  categories: Category[] = [...defaults.DEFAULT_CATEGORIES];
  vehicles: Vehicle[] = [...PARSED_DEFAULT_VEHICLES];
  vehicleImages: VehicleImage[] = [...defaults.DEFAULT_VEHICLE_IMAGES];
  posts: Post[] = [...defaults.DEFAULT_POSTS];
  sliders: Slider[] = [...defaults.DEFAULT_SLIDERS];
  faqs: FAQ[] = [...defaults.DEFAULT_FAQS];
  testimonials: Testimonial[] = [...defaults.DEFAULT_TESTIMONIALS];
  settings: GeneralSettings = { ...defaults.DEFAULT_SETTINGS };
  quoteRequests: QuoteRequest[] = [...PARSED_DEFAULT_QUOTE_REQUESTS];
  installmentRequests: InstallmentRequest[] = [...defaults.DEFAULT_INSTALLMENT_REQUESTS];
  sellRequests: SellVehicleRequest[] = [...PARSED_DEFAULT_SELL_REQUESTS];
  testDriveRequests: TestDriveRequest[] = [...defaults.DEFAULT_TEST_DRIVE_REQUESTS];
  contacts: Contact[] = [];
  adminUser: any = null;
}

const memoryDb = new InMemoryDb();

// Load or initialize key in local storage
const getStore = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser) {
    // Return server memory cache
    return (memoryDb as any)[key.replace('km_', '')] || defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading localStorage key ${key}:`, error);
    return defaultValue;
  }
};

const setStore = <T>(key: string, value: T): void => {
  if (isBrowser) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing localStorage key ${key}:`, e);
    }
  } else {
    (memoryDb as any)[key.replace('km_', '')] = value;
  }
};

// Merge seed data into localStorage without duplicates and preserving custom changes
const mergeLocalStorageDb = <T extends { slug?: string; id?: string; image_url?: string | null; logo_url?: string | null; og_image?: string | null; image_desktop_url?: string; image_mobile_url?: string | null }>(
  key: string,
  defaults: T[]
) => {
  if (!isBrowser) return;
  const existing = getStore<T[]>(key, []);
  if (existing.length === 0) {
    setStore(key, defaults);
    return;
  }
  
  let updated = [...existing];
  let changed = false;
  
  for (const def of defaults) {
    const existingIndex = existing.findIndex(item => 
      (def.slug && item.slug === def.slug) || 
      (def.id && item.id === def.id)
    );
    
    if (existingIndex === -1) {
      updated.push(def);
      changed = true;
    } else {
      const existingItem = existing[existingIndex];
      let itemChanged = false;
      const merged = { ...def, ...existingItem };
      
      const checkAndMergeImage = (field: 'image_url' | 'logo_url' | 'og_image' | 'image_desktop_url' | 'image_mobile_url') => {
        const val = existingItem[field] as string | undefined;
        if (
          val === undefined || 
          val === null || 
          val === '' || 
          val.includes('unsplash.com') || 
          val.includes('/images/brands/')
        ) {
          (merged as any)[field] = def[field];
          itemChanged = true;
        }
      };
      
      if ('image_url' in def) checkAndMergeImage('image_url');
      if ('logo_url' in def) checkAndMergeImage('logo_url');
      if ('og_image' in def) checkAndMergeImage('og_image');
      if ('image_desktop_url' in def) checkAndMergeImage('image_desktop_url');
      if ('image_mobile_url' in def) checkAndMergeImage('image_mobile_url');
      
      if (itemChanged) {
        updated[existingIndex] = merged;
        changed = true;
      }
    }
  }
  
  if (changed) {
    setStore(key, updated);
  }
};

const mergeSettingsDb = () => {
  if (!isBrowser) return;
  const existing = getStore<any>('km_settings', null);
  if (!existing) {
    setStore('km_settings', defaults.DEFAULT_SETTINGS);
    return;
  }
  const merged = { ...defaults.DEFAULT_SETTINGS, ...existing };
  setStore('km_settings', merged);
};

// Initialize DB keys with seed data safely
const initLocalStorageDb = () => {
  if (!isBrowser) return;
  mergeLocalStorageDb('km_brands', defaults.DEFAULT_BRANDS);
  mergeLocalStorageDb('km_categories', defaults.DEFAULT_CATEGORIES);
  mergeLocalStorageDb('km_vehicles', PARSED_DEFAULT_VEHICLES);
  mergeLocalStorageDb('km_vehicleImages', defaults.DEFAULT_VEHICLE_IMAGES);
  mergeLocalStorageDb('km_posts', defaults.DEFAULT_POSTS);
  mergeLocalStorageDb('km_sliders', defaults.DEFAULT_SLIDERS);
  
  // Other arrays can use getStore defaults directly as they are not subject to image edits/conflicts
  getStore('km_faqs', defaults.DEFAULT_FAQS);
  getStore('km_testimonials', defaults.DEFAULT_TESTIMONIALS);
  mergeSettingsDb();
  getStore('km_quoteRequests', PARSED_DEFAULT_QUOTE_REQUESTS);
  getStore('km_installmentRequests', defaults.DEFAULT_INSTALLMENT_REQUESTS);
  getStore('km_sellRequests', PARSED_DEFAULT_SELL_REQUESTS);
  getStore('km_testDriveRequests', defaults.DEFAULT_TEST_DRIVE_REQUESTS);
  getStore('km_contacts', []);
};

// Initialize on import
initLocalStorageDb();

// Define LocalStorage API matching our interface
export const localStorageClient = {
  // --- BRANDS ---
  async getBrands(): Promise<Brand[]> {
    return getStore('km_brands', defaults.DEFAULT_BRANDS);
  },
  async saveBrand(brand: Omit<Brand, 'id'> & { id?: string }): Promise<Brand> {
    const list = await this.getBrands();
    const newBrand: Brand = {
      id: brand.id || Math.random().toString(36).substring(2, 9),
      name: brand.name,
      slug: brand.slug || brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      logo_url: brand.logo_url,
      seo_title: brand.seo_title,
      seo_description: brand.seo_description
    };
    const index = list.findIndex(b => b.id === newBrand.id);
    if (index >= 0) {
      list[index] = newBrand;
    } else {
      list.push(newBrand);
    }
    setStore('km_brands', list);
    return newBrand;
  },
  async deleteBrand(id: string): Promise<boolean> {
    const list = await this.getBrands();
    const filtered = list.filter(b => b.id !== id);
    setStore('km_brands', filtered);
    return true;
  },

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    return getStore('km_categories', defaults.DEFAULT_CATEGORIES);
  },
  async saveCategory(category: Omit<Category, 'id'> & { id?: string }): Promise<Category> {
    const list = await this.getCategories();
    const newCat: Category = {
      id: category.id || Math.random().toString(36).substring(2, 9),
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      image_url: category.image_url,
      sort_order: Number(category.sort_order || 0),
      seo_title: category.seo_title,
      seo_description: category.seo_description
    };
    const index = list.findIndex(c => c.id === newCat.id);
    if (index >= 0) {
      list[index] = newCat;
    } else {
      list.push(newCat);
    }
    setStore('km_categories', list);
    return newCat;
  },
  async deleteCategory(id: string): Promise<boolean> {
    const list = await this.getCategories();
    const filtered = list.filter(c => c.id !== id);
    setStore('km_categories', filtered);
    return true;
  },

  // --- VEHICLES ---
  async getVehicles(filters?: {
    brandSlug?: string;
    categorySlug?: string;
    condition?: 'new' | 'old' | 'all';
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isSold?: boolean;
    sort?: 'price_asc' | 'price_desc' | 'latest';
    page?: number;
    limit?: number;
  }): Promise<{ data: Vehicle[]; total: number }> {
    let vehicles = getStore('km_vehicles', PARSED_DEFAULT_VEHICLES);
    const brandsList = await this.getBrands();
    const catsList = await this.getCategories();

    // Filters
    if (filters?.brandSlug) {
      const brand = brandsList.find(b => b.slug === filters.brandSlug);
      if (brand) {
        vehicles = vehicles.filter(v => v.brand_id === brand.id);
      } else {
        vehicles = [];
      }
    }
    if (filters?.categorySlug) {
      const cat = catsList.find(c => c.slug === filters.categorySlug);
      if (cat) {
        vehicles = vehicles.filter(v => v.category_id === cat.id);
      } else {
        vehicles = [];
      }
    }
    if (filters?.condition && filters.condition !== 'all') {
      const isNew = filters.condition === 'new';
      vehicles = vehicles.filter(v => v.is_new === isNew);
    }
    if (filters?.minPrice !== undefined) {
      vehicles = vehicles.filter(v => v.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      vehicles = vehicles.filter(v => v.price <= filters.maxPrice!);
    }
    if (filters?.isFeatured !== undefined) {
      vehicles = vehicles.filter(v => v.is_featured === filters.isFeatured);
    }
    if (filters?.isNewArrival !== undefined) {
      vehicles = vehicles.filter(v => v.is_new_arrival === filters.isNewArrival);
    }
    if (filters?.isSold !== undefined) {
      vehicles = vehicles.filter(v => v.is_sold === filters.isSold);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      vehicles = vehicles.filter(v => v.name.toLowerCase().includes(query) || (v.sku && v.sku.toLowerCase().includes(query)));
    }

    // Sort
    if (filters?.sort === 'price_asc') {
      vehicles.sort((a, b) => a.price - b.price);
    } else if (filters?.sort === 'price_desc') {
      vehicles.sort((a, b) => b.price - a.price);
    } else {
      // default: latest (featured/new_arrival priority or custom chronological sort)
      vehicles.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    const total = vehicles.length;
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const start = (page - 1) * limit;
    const data = vehicles.slice(start, start + limit);

    return { data, total };
  },

  async getVehicleBySlug(slug: string): Promise<{ vehicle: Vehicle; images: VehicleImage[] } | null> {
    const list = getStore('km_vehicles', PARSED_DEFAULT_VEHICLES);
    const vehicle = list.find(v => v.slug === slug);
    if (!vehicle) return null;

    const allImages = getStore('km_vehicleImages', defaults.DEFAULT_VEHICLE_IMAGES);
    const images = allImages.filter(img => img.vehicle_id === vehicle.id).sort((a, b) => a.sort_order - b.sort_order);

    return { vehicle, images };
  },

  async saveVehicle(
    vehicle: Omit<Vehicle, 'id'> & { id?: string },
    images: { id?: string; image_url: string; sort_order: number; is_cover: boolean }[]
  ): Promise<Vehicle> {
    const list = getStore('km_vehicles', PARSED_DEFAULT_VEHICLES);
    const vId = vehicle.id || Math.random().toString(36).substring(2, 9);
    
    const formattedVehicle: Vehicle = {
      id: vId,
      brand_id: vehicle.brand_id,
      category_id: vehicle.category_id,
      name: vehicle.name,
      slug: vehicle.slug || vehicle.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      sku: vehicle.sku || `SKU-${vId.substring(0, 5).toUpperCase()}`,
      price: Number(vehicle.price || 0),
      promo_price: vehicle.promo_price ? Number(vehicle.promo_price) : null,
      is_new: Boolean(vehicle.is_new),
      registration_year: vehicle.registration_year ? Number(vehicle.registration_year) : null,
      odometer: Number(vehicle.odometer || 0),
      engine_capacity: vehicle.engine_capacity,
      color: vehicle.color,
      brake_type: vehicle.brake_type,
      fuel_consumption: vehicle.fuel_consumption,
      warranty: vehicle.warranty,
      short_desc: vehicle.short_desc,
      detail_desc: vehicle.detail_desc,
      specs_json: vehicle.specs_json || {},
      used_checklist_json: vehicle.used_checklist_json || {},
      is_featured: Boolean(vehicle.is_featured),
      is_new_arrival: Boolean(vehicle.is_new_arrival),
      is_sold: Boolean(vehicle.is_sold),
      seo_title: vehicle.seo_title || `${vehicle.name} chính hãng | Ken Motor`,
      seo_description: vehicle.seo_description || vehicle.short_desc,
      og_image: vehicle.og_image || images.find(img => img.is_cover)?.image_url || images[0]?.image_url || '',
      is_visible: Boolean(vehicle.is_visible !== false)
    };

    // Update vehicle
    const index = list.findIndex(v => v.id === formattedVehicle.id);
    if (index >= 0) {
      list[index] = formattedVehicle;
    } else {
      list.push(formattedVehicle);
    }
    setStore('km_vehicles', list);

    // Update images
    const allImages = getStore('km_vehicleImages', defaults.DEFAULT_VEHICLE_IMAGES);
    const remainingImages = allImages.filter(img => img.vehicle_id !== vId);
    
    const formattedImages: VehicleImage[] = images.map((img, idx) => ({
      id: img.id || Math.random().toString(36).substring(2, 9),
      vehicle_id: vId,
      image_url: img.image_url,
      sort_order: Number(img.sort_order || idx),
      is_cover: Boolean(img.is_cover)
    }));

    setStore('km_vehicleImages', [...remainingImages, ...formattedImages]);
    return formattedVehicle;
  },

  async deleteVehicle(id: string): Promise<boolean> {
    const list = getStore('km_vehicles', PARSED_DEFAULT_VEHICLES);
    const filtered = list.filter(v => v.id !== id);
    setStore('km_vehicles', filtered);

    const allImages = getStore('km_vehicleImages', defaults.DEFAULT_VEHICLE_IMAGES);
    const filteredImages = allImages.filter(img => img.vehicle_id !== id);
    setStore('km_vehicleImages', filteredImages);
    return true;
  },

  // --- BLOG POSTS ---
  async getPosts(filters?: { isVisibleOnly?: boolean; isFeaturedOnly?: boolean }): Promise<Post[]> {
    let posts = getStore('km_posts', defaults.DEFAULT_POSTS);
    if (filters?.isVisibleOnly) {
      posts = posts.filter(p => p.is_visible !== false);
    }
    if (filters?.isFeaturedOnly) {
      posts = posts.filter(p => p.is_featured === true);
    }
    return posts;
  },
  async getPostBySlug(slug: string): Promise<Post | null> {
    const list = await this.getPosts();
    return list.find(p => p.slug === slug) || null;
  },
  async savePost(post: Omit<Post, 'id'> & { id?: string }): Promise<Post> {
    const list = await this.getPosts();
    const newPost: Post = {
      id: post.id || Math.random().toString(36).substring(2, 9),
      title: post.title,
      slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      excerpt: post.excerpt,
      content: post.content,
      content_markdown: post.content_markdown,
      content_html: post.content_html,
      content_type: post.content_type || 'markdown',
      image_url: post.image_url,
      tags: post.tags || [],
      is_featured: post.is_featured ?? false,
      is_visible: post.is_visible ?? true,
      seo_title: post.seo_title,
      seo_description: post.seo_description,
      created_at: post.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const index = list.findIndex(p => p.id === newPost.id);
    if (index >= 0) {
      list[index] = newPost;
    } else {
      list.push(newPost);
    }
    setStore('km_posts', list);
    return newPost;
  },
  async deletePost(id: string): Promise<boolean> {
    const list = await this.getPosts();
    const filtered = list.filter(p => p.id !== id);
    setStore('km_posts', filtered);
    return true;
  },

  // --- SLIDERS ---
  async getSliders(filters?: { isVisibleOnly?: boolean }): Promise<Slider[]> {
    let sliders = getStore('km_sliders', defaults.DEFAULT_SLIDERS);
    if (filters?.isVisibleOnly) {
      sliders = sliders.filter(s => s.is_visible !== false);
    }
    return sliders;
  },
  async saveSlider(slider: Omit<Slider, 'id'> & { id?: string }): Promise<Slider> {
    const list = await this.getSliders();
    const newSlider: Slider = {
      id: slider.id || Math.random().toString(36).substring(2, 9),
      title: slider.title,
      subtitle: slider.subtitle,
      image_url: slider.image_desktop_url,
      image_desktop_url: slider.image_desktop_url,
      image_mobile_url: slider.image_mobile_url,
      cta_link: slider.cta_link,
      cta_text: slider.cta_text,
      sort_order: Number(slider.sort_order || 0),
      is_visible: slider.is_visible ?? true
    };
    const index = list.findIndex(s => s.id === newSlider.id);
    if (index >= 0) {
      list[index] = newSlider;
    } else {
      list.push(newSlider);
    }
    setStore('km_sliders', list);
    return newSlider;
  },
  async deleteSlider(id: string): Promise<boolean> {
    const list = await this.getSliders();
    const filtered = list.filter(s => s.id !== id);
    setStore('km_sliders', filtered);
    return true;
  },

  // --- FAQS ---
  async getFAQs(): Promise<FAQ[]> {
    return getStore('km_faqs', defaults.DEFAULT_FAQS);
  },
  async saveFAQ(faq: Omit<FAQ, 'id'> & { id?: string }): Promise<FAQ> {
    const list = await this.getFAQs();
    const newFaq: FAQ = {
      id: faq.id || Math.random().toString(36).substring(2, 9),
      question: faq.question,
      answer: faq.answer,
      sort_order: Number(faq.sort_order || 0)
    };
    const index = list.findIndex(f => f.id === newFaq.id);
    if (index >= 0) {
      list[index] = newFaq;
    } else {
      list.push(newFaq);
    }
    setStore('km_faqs', list);
    return newFaq;
  },
  async deleteFAQ(id: string): Promise<boolean> {
    const list = await this.getFAQs();
    const filtered = list.filter(f => f.id !== id);
    setStore('km_faqs', filtered);
    return true;
  },

  // --- TESTIMONIALS ---
  async getTestimonials(): Promise<Testimonial[]> {
    return getStore('km_testimonials', defaults.DEFAULT_TESTIMONIALS);
  },

  // --- SETTINGS ---
  async getSettings(): Promise<GeneralSettings> {
    return getStore('km_settings', defaults.DEFAULT_SETTINGS);
  },
  async saveSettings(settings: GeneralSettings): Promise<GeneralSettings> {
    setStore('km_settings', settings);
    return settings;
  },

  // --- LEADS INTAKE ---
  async submitQuoteRequest(req: Omit<QuoteRequest, 'id' | 'status' | 'created_at'>): Promise<QuoteRequest> {
    const list = getStore('km_quoteRequests', PARSED_DEFAULT_QUOTE_REQUESTS);
    const newReq: QuoteRequest = {
      id: Math.random().toString(36).substring(2, 9),
      name: req.name,
      phone: req.phone,
      email: req.email,
      notes: req.notes,
      vehicle_ids: req.vehicle_ids,
      total_price: req.total_price,
      status: 'Pending',
      internal_notes: '',
      created_at: new Date().toISOString()
    };
    list.unshift(newReq);
    setStore('km_quoteRequests', list);
    return newReq;
  },
  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return getStore('km_quoteRequests', PARSED_DEFAULT_QUOTE_REQUESTS);
  },
  async updateQuoteRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    const list = await this.getQuoteRequests();
    const idx = list.findIndex(q => q.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      if (internalNotes !== undefined) list[idx].internal_notes = internalNotes;
      setStore('km_quoteRequests', list);
      return true;
    }
    return false;
  },

  async submitInstallmentRequest(req: Omit<InstallmentRequest, 'id' | 'status' | 'created_at'>): Promise<InstallmentRequest> {
    const list = getStore('km_installmentRequests', defaults.DEFAULT_INSTALLMENT_REQUESTS);
    const newReq: InstallmentRequest = {
      id: Math.random().toString(36).substring(2, 9),
      name: req.name,
      phone: req.phone,
      vehicle_id: req.vehicle_id,
      price: req.price,
      downpayment: req.downpayment,
      term_months: req.term_months,
      interest_rate: req.interest_rate,
      status: 'Pending',
      internal_notes: '',
      created_at: new Date().toISOString()
    };
    list.unshift(newReq);
    setStore('km_installmentRequests', list);
    return newReq;
  },
  async getInstallmentRequests(): Promise<InstallmentRequest[]> {
    return getStore('km_installmentRequests', defaults.DEFAULT_INSTALLMENT_REQUESTS);
  },
  async updateInstallmentRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    const list = await this.getInstallmentRequests();
    const idx = list.findIndex(ins => ins.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      if (internalNotes !== undefined) list[idx].internal_notes = internalNotes;
      setStore('km_installmentRequests', list);
      return true;
    }
    return false;
  },

  async submitSellRequest(req: Omit<SellVehicleRequest, 'id' | 'status' | 'created_at'>): Promise<SellVehicleRequest> {
    const list = getStore('km_sellRequests', PARSED_DEFAULT_SELL_REQUESTS);
    const newReq: SellVehicleRequest = {
      id: Math.random().toString(36).substring(2, 9),
      name: req.name,
      phone: req.phone,
      brand_name: req.brand_name,
      model_name: req.model_name,
      year: req.year,
      license_plate: req.license_plate,
      odometer: req.odometer,
      status_description: req.status_description,
      image_urls: req.image_urls,
      desired_price: req.desired_price,
      status: 'Pending',
      internal_notes: '',
      created_at: new Date().toISOString()
    };
    list.unshift(newReq);
    setStore('km_sellRequests', list);
    return newReq;
  },
  async getSellVehicleRequests(): Promise<SellVehicleRequest[]> {
    return getStore('km_sellRequests', PARSED_DEFAULT_SELL_REQUESTS);
  },
  async updateSellRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    const list = await this.getSellVehicleRequests();
    const idx = list.findIndex(s => s.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      if (internalNotes !== undefined) list[idx].internal_notes = internalNotes;
      setStore('km_sellRequests', list);
      return true;
    }
    return false;
  },

  async submitTestDriveRequest(req: Omit<TestDriveRequest, 'id' | 'status' | 'created_at'>): Promise<TestDriveRequest> {
    const list = getStore('km_testDriveRequests', defaults.DEFAULT_TEST_DRIVE_REQUESTS);
    const newReq: TestDriveRequest = {
      id: Math.random().toString(36).substring(2, 9),
      name: req.name,
      phone: req.phone,
      vehicle_id: req.vehicle_id,
      desired_date: req.desired_date,
      notes: req.notes,
      status: 'Pending',
      internal_notes: '',
      created_at: new Date().toISOString()
    };
    list.unshift(newReq);
    setStore('km_testDriveRequests', list);
    return newReq;
  },
  async getTestDriveRequests(): Promise<TestDriveRequest[]> {
    return getStore('km_testDriveRequests', defaults.DEFAULT_TEST_DRIVE_REQUESTS);
  },
  async updateTestDriveRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    const list = await this.getTestDriveRequests();
    const idx = list.findIndex(td => td.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      if (internalNotes !== undefined) list[idx].internal_notes = internalNotes;
      setStore('km_testDriveRequests', list);
      return true;
    }
    return false;
  },

  async submitContact(req: Omit<Contact, 'id' | 'status' | 'created_at'>): Promise<Contact> {
    const list = getStore<Contact[]>('km_contacts', []);
    const newReq: Contact = {
      id: Math.random().toString(36).substring(2, 9),
      name: req.name,
      phone: req.phone,
      email: req.email,
      message: req.message,
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    list.unshift(newReq);
    setStore('km_contacts', list);
    return newReq;
  },
  async getContacts(): Promise<Contact[]> {
    return getStore<Contact[]>('km_contacts', []);
  },
  async updateContactStatus(id: string, status: string): Promise<boolean> {
    const list = await this.getContacts();
    const idx = list.findIndex(c => c.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      setStore('km_contacts', list);
      return true;
    }
    return false;
  },

  // --- STATS ---
  async getAdminStats(): Promise<{
    totalVehicles: number;
    totalQuotes: number;
    totalInstallments: number;
    totalSells: number;
    totalTestDrives: number;
    totalContacts: number;
  }> {
    const vehicles = getStore('km_vehicles', PARSED_DEFAULT_VEHICLES);
    const quotes = getStore('km_quoteRequests', PARSED_DEFAULT_QUOTE_REQUESTS);
    const installments = getStore('km_installmentRequests', defaults.DEFAULT_INSTALLMENT_REQUESTS);
    const sells = getStore('km_sellRequests', PARSED_DEFAULT_SELL_REQUESTS);
    const testDrives = getStore('km_testDriveRequests', defaults.DEFAULT_TEST_DRIVE_REQUESTS);
    const contacts = getStore('km_contacts', []);
    
    return {
      totalVehicles: vehicles.length,
      totalQuotes: quotes.length,
      totalInstallments: installments.length,
      totalSells: sells.length,
      totalTestDrives: testDrives.length,
      totalContacts: contacts.length
    };
  },

  // --- AUTH MOCK ---
  async login(email: string, password: string): Promise<{ user: any; error: string | null }> {
    if (email === 'admin@kenmotor.vn' && password === 'admin123') {
      const user = { email, role: 'admin', id: 'admin-uuid' };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('demo_admin_session', JSON.stringify(user));
      }
      memoryDb.adminUser = user;
      return { user, error: null };
    }
    return { user: null, error: 'Email hoặc mật khẩu không đúng' };
  },
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('demo_admin_session');
    }
    memoryDb.adminUser = null;
  },
  async getCurrentUser(): Promise<any | null> {
    if (typeof window !== 'undefined') {
      const val = window.localStorage.getItem('demo_admin_session');
      try {
        return val ? JSON.parse(val) : null;
      } catch {
        return null;
      }
    }
    return memoryDb.adminUser;
  }
};
