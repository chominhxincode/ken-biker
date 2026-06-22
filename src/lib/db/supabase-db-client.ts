import { supabase, hasSupabaseConfig } from './supabase-client';
import { localStorageClient } from './local-storage-client';
import * as defaults from './seed-defaults';
import {
  Brand, Category, Vehicle, VehicleImage, Post, Slider, FAQ, Testimonial,
  QuoteRequest, InstallmentRequest, SellVehicleRequest, TestDriveRequest, Contact, GeneralSettings
} from './types';

export const supabaseDbClient = {
  // --- BRANDS ---
  async getBrands(): Promise<Brand[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getBrands();
    try {
      const { data, error } = await supabase!.from('brands').select('*').order('name');
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching brands from Supabase:', e);
      throw e;
    }
  },

  async saveBrand(brand: Omit<Brand, 'id'> & { id?: string }): Promise<Brand> {
    if (!hasSupabaseConfig()) return localStorageClient.saveBrand(brand);
    try {
      const { data, error } = await supabase!
        .from('brands')
        .upsert({
          id: brand.id || undefined,
          name: brand.name,
          slug: brand.slug,
          logo_url: brand.logo_url,
          seo_title: brand.seo_title,
          seo_description: brand.seo_description
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error saving brand to Supabase:', e);
      throw e;
    }
  },

  async deleteBrand(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deleteBrand(id);
    try {
      const { error } = await supabase!.from('brands').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting brand from Supabase:', e);
      throw e;
    }
  },

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getCategories();
    try {
      const { data, error } = await supabase!.from('categories').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching categories from Supabase:', e);
      throw e;
    }
  },

  async saveCategory(category: Omit<Category, 'id'> & { id?: string }): Promise<Category> {
    if (!hasSupabaseConfig()) return localStorageClient.saveCategory(category);
    try {
      const { data, error } = await supabase!
        .from('categories')
        .upsert({
          id: category.id || undefined,
          name: category.name,
          slug: category.slug,
          image_url: category.image_url,
          sort_order: Number(category.sort_order),
          seo_title: category.seo_title,
          seo_description: category.seo_description
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error saving category to Supabase:', e);
      throw e;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deleteCategory(id);
    try {
      const { error } = await supabase!.from('categories').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting category from Supabase:', e);
      throw e;
    }
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
    if (!hasSupabaseConfig()) return localStorageClient.getVehicles(filters);
    try {
      let query = supabase!.from('vehicles').select('*', { count: 'exact' });

      // Joins/Lookups for slug filters
      if (filters?.brandSlug) {
        const { data: brand, error: bErr } = await supabase!.from('brands').select('id').eq('slug', filters.brandSlug).single();
        if (bErr || !brand) {
          console.warn('Brand slug query returned error or not found:', bErr);
        } else {
          query = query.eq('brand_id', brand.id);
        }
      }
      if (filters?.categorySlug) {
        const { data: cat, error: cErr } = await supabase!.from('categories').select('id').eq('slug', filters.categorySlug).single();
        if (cErr || !cat) {
          console.warn('Category slug query returned error or not found:', cErr);
        } else {
          query = query.eq('category_id', cat.id);
        }
      }

      if (filters?.condition && filters.condition !== 'all') {
        query = query.eq('is_new', filters.condition === 'new');
      }
      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.isFeatured !== undefined) {
        query = query.eq('is_featured', filters.isFeatured);
      }
      if (filters?.isNewArrival !== undefined) {
        query = query.eq('is_new_arrival', filters.isNewArrival);
      }
      if (filters?.isSold !== undefined) {
        query = query.eq('is_sold', filters.isSold);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }

      // Sort order
      if (filters?.sort === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (filters?.sort === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
      }

      // Pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 12;
      const fromIndex = (page - 1) * limit;
      const toIndex = fromIndex + limit - 1;
      
      query = query.range(fromIndex, toIndex);

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], total: count || 0 };
    } catch (e) {
      console.error('Error fetching vehicles from Supabase:', e);
      throw e;
    }
  },

  async getVehicleBySlug(slug: string): Promise<{ vehicle: Vehicle; images: VehicleImage[] } | null> {
    if (!hasSupabaseConfig()) return localStorageClient.getVehicleBySlug(slug);
    try {
      const { data: vehicle, error: vError } = await supabase!
        .from('vehicles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (vError) throw vError;

      const { data: images, error: iError } = await supabase!
        .from('vehicle_images')
        .select('*')
        .eq('vehicle_id', vehicle.id)
        .order('sort_order', { ascending: true });

      if (iError) throw iError;

      return {
        vehicle,
        images: images || []
      };
    } catch (e) {
      console.error('Error fetching vehicle by slug from Supabase:', e);
      throw e;
    }
  },

  async saveVehicle(
    vehicle: Omit<Vehicle, 'id'> & { id?: string },
    images: { id?: string; image_url: string; sort_order: number; is_cover: boolean }[]
  ): Promise<Vehicle> {
    if (!hasSupabaseConfig()) return localStorageClient.saveVehicle(vehicle, images);
    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .upsert({
          id: vehicle.id || undefined,
          brand_id: vehicle.brand_id,
          category_id: vehicle.category_id,
          name: vehicle.name,
          slug: vehicle.slug,
          sku: vehicle.sku,
          price: Number(vehicle.price),
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
          specs_json: vehicle.specs_json,
          used_checklist_json: vehicle.used_checklist_json,
          is_featured: Boolean(vehicle.is_featured),
          is_new_arrival: Boolean(vehicle.is_new_arrival),
          is_sold: Boolean(vehicle.is_sold),
          seo_title: vehicle.seo_title,
          seo_description: vehicle.seo_description,
          og_image: vehicle.og_image || images.find(img => img.is_cover)?.image_url || images[0]?.image_url || '',
          is_visible: Boolean(vehicle.is_visible !== false)
        })
        .select()
        .single();

      if (error) throw error;
      const vId = data.id;

      // Delete old images not in the new set
      const savedImgIds = images.filter(img => img.id).map(img => img.id);
      if (savedImgIds.length > 0) {
        const { error: delErr } = await supabase!.from('vehicle_images').delete().eq('vehicle_id', vId).not('id', 'in', `(${savedImgIds.join(',')})`);
        if (delErr) throw delErr;
      } else {
        const { error: delErr } = await supabase!.from('vehicle_images').delete().eq('vehicle_id', vId);
        if (delErr) throw delErr;
      }

      // Upsert images
      if (images.length > 0) {
        const { error: imgError } = await supabase!.from('vehicle_images').upsert(
          images.map((img, idx) => ({
            id: img.id || undefined,
            vehicle_id: vId,
            image_url: img.image_url,
            sort_order: Number(img.sort_order || idx),
            is_cover: Boolean(img.is_cover)
          }))
        );
        if (imgError) throw imgError;
      }

      return data;
    } catch (e) {
      console.error('Error saving vehicle on Supabase:', e);
      throw e;
    }
  },

  async deleteVehicle(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deleteVehicle(id);
    try {
      const { error } = await supabase!.from('vehicles').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting vehicle from Supabase:', e);
      throw e;
    }
  },

  // --- BLOG POSTS ---
  async getPosts(filters?: { isVisibleOnly?: boolean; isFeaturedOnly?: boolean }): Promise<Post[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getPosts(filters);
    try {
      let query = supabase!.from('posts').select('*');
      if (filters?.isVisibleOnly) {
        query = query.eq('is_visible', true);
      }
      if (filters?.isFeaturedOnly) {
        query = query.eq('is_featured', true);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching blog posts from Supabase:', e);
      throw e;
    }
  },

  async getPostBySlug(slug: string): Promise<Post | null> {
    if (!hasSupabaseConfig()) return localStorageClient.getPostBySlug(slug);
    try {
      const { data, error } = await supabase!.from('posts').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error fetching post by slug from Supabase:', e);
      throw e;
    }
  },

  async savePost(post: Omit<Post, 'id'> & { id?: string }): Promise<Post> {
    if (!hasSupabaseConfig()) return localStorageClient.savePost(post);
    try {
      const { data, error } = await supabase!
        .from('posts')
        .upsert({
          id: post.id || undefined,
          title: post.title,
          slug: post.slug,
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
          seo_description: post.seo_description
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error saving post to Supabase:', e);
      throw e;
    }
  },

  async deletePost(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deletePost(id);
    try {
      const { error } = await supabase!.from('posts').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting post from Supabase:', e);
      throw e;
    }
  },

  // --- SLIDERS ---
  async getSliders(filters?: { isVisibleOnly?: boolean }): Promise<Slider[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getSliders(filters);
    try {
      const { data, error } = await supabase!.from('sliders').select('*');
      if (error) throw error;
      
      let sliders: any[] = [...(data || [])];
      
      // 1. Filter by is_visible if column exists and filtering requested
      if (filters?.isVisibleOnly) {
        sliders = sliders.filter(item => {
          if ('is_visible' in item) {
            return item.is_visible === true;
          }
          return true; // default to true if the column doesn't exist
        });
      }
      
      // 2. Sort by sort_order or fallback to order_index
      sliders.sort((a, b) => {
        const orderA = a.sort_order !== undefined ? Number(a.sort_order) : (a.order_index !== undefined ? Number(a.order_index) : 0);
        const orderB = b.sort_order !== undefined ? Number(b.sort_order) : (b.order_index !== undefined ? Number(b.order_index) : 0);
        return orderA - orderB;
      });
      
      return sliders as Slider[];
    } catch (e) {
      console.error('Error fetching sliders from Supabase:', e);
      throw e;
    }
  },

  async saveSlider(slider: Omit<Slider, 'id'> & { id?: string }): Promise<Slider> {
    if (!hasSupabaseConfig()) return localStorageClient.saveSlider(slider);
    try {
      const { data, error } = await supabase!
        .from('sliders')
        .upsert({
          id: slider.id || undefined,
          title: slider.title,
          subtitle: slider.subtitle,
          image_url: slider.image_desktop_url,
          image_desktop_url: slider.image_desktop_url,
          image_mobile_url: slider.image_mobile_url,
          cta_link: slider.cta_link,
          cta_text: slider.cta_text,
          sort_order: Number(slider.sort_order || 0),
          is_visible: slider.is_visible ?? true
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error saving slider on Supabase:', e);
      throw e;
    }
  },

  async deleteSlider(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deleteSlider(id);
    try {
      const { error } = await supabase!.from('sliders').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting slider from Supabase:', e);
      throw e;
    }
  },

  // --- FAQS ---
  async getFAQs(): Promise<FAQ[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getFAQs();
    try {
      const { data, error } = await supabase!.from('faqs').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching FAQs from Supabase:', e);
      throw e;
    }
  },

  async saveFAQ(faq: Omit<FAQ, 'id'> & { id?: string }): Promise<FAQ> {
    if (!hasSupabaseConfig()) return localStorageClient.saveFAQ(faq);
    try {
      const { data, error } = await supabase!
        .from('faqs')
        .upsert({
          id: faq.id || undefined,
          question: faq.question,
          answer: faq.answer,
          sort_order: Number(faq.sort_order || 0)
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error saving FAQ on Supabase:', e);
      throw e;
    }
  },

  async deleteFAQ(id: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.deleteFAQ(id);
    try {
      const { error } = await supabase!.from('faqs').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting FAQ from Supabase:', e);
      throw e;
    }
  },

  // --- TESTIMONIALS ---
  async getTestimonials(): Promise<Testimonial[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getTestimonials();
    try {
      const { data, error } = await supabase!.from('testimonials').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching testimonials from Supabase:', e);
      throw e;
    }
  },

  // --- SETTINGS ---
  async getSettings(): Promise<GeneralSettings> {
    if (!hasSupabaseConfig()) return localStorageClient.getSettings();
    try {
      const { data, error } = await supabase!.from('settings').select('*').eq('key', 'general_settings').single();
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is single row not found, which is fine
      
      const val = data?.value || {};
      return {
        ...defaults.DEFAULT_SETTINGS,
        ...val
      };
    } catch (e) {
      console.error('Error fetching settings from Supabase:', e);
      throw e;
    }
  },

  async saveSettings(settings: GeneralSettings): Promise<GeneralSettings> {
    if (!hasSupabaseConfig()) return localStorageClient.saveSettings(settings);
    try {
      const { error } = await supabase!
        .from('settings')
        .upsert({
          key: 'general_settings',
          value: settings
        });
      if (error) throw error;
      return settings;
    } catch (e) {
      console.error('Error saving settings to Supabase:', e);
      throw e;
    }
  },

  // --- LEADS INTAKE ---
  async submitQuoteRequest(req: Omit<QuoteRequest, 'id' | 'status' | 'created_at'>): Promise<QuoteRequest> {
    if (!hasSupabaseConfig()) return localStorageClient.submitQuoteRequest(req);
    try {
      const { data, error } = await supabase!
        .from('quote_requests')
        .insert({
          name: req.name,
          phone: req.phone,
          email: req.email,
          notes: req.notes,
          vehicle_ids: req.vehicle_ids,
          total_price: req.total_price,
          status: 'Pending',
          internal_notes: ''
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error submitting quote request to Supabase:', e);
      throw e;
    }
  },

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getQuoteRequests();
    try {
      const { data, error } = await supabase!.from('quote_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching quote requests from Supabase:', e);
      throw e;
    }
  },

  async updateQuoteRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.updateQuoteRequestStatus(id, status, internalNotes);
    try {
      const updates: any = { status };
      if (internalNotes !== undefined) updates.internal_notes = internalNotes;
      const { error } = await supabase!.from('quote_requests').update(updates).eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating quote request status on Supabase:', e);
      throw e;
    }
  },

  async submitInstallmentRequest(req: Omit<InstallmentRequest, 'id' | 'status' | 'created_at'>): Promise<InstallmentRequest> {
    if (!hasSupabaseConfig()) return localStorageClient.submitInstallmentRequest(req);
    try {
      const { data, error } = await supabase!
        .from('installment_requests')
        .insert({
          name: req.name,
          phone: req.phone,
          vehicle_id: req.vehicle_id,
          price: req.price,
          downpayment: req.downpayment,
          term_months: req.term_months,
          interest_rate: req.interest_rate,
          status: 'Pending',
          internal_notes: ''
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error submitting installment request to Supabase:', e);
      throw e;
    }
  },

  async getInstallmentRequests(): Promise<InstallmentRequest[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getInstallmentRequests();
    try {
      const { data, error } = await supabase!.from('installment_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching installment requests from Supabase:', e);
      throw e;
    }
  },

  async updateInstallmentRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.updateInstallmentRequestStatus(id, status, internalNotes);
    try {
      const updates: any = { status };
      if (internalNotes !== undefined) updates.internal_notes = internalNotes;
      const { error } = await supabase!.from('installment_requests').update(updates).eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating installment request status on Supabase:', e);
      throw e;
    }
  },

  async submitSellRequest(req: Omit<SellVehicleRequest, 'id' | 'status' | 'created_at'>): Promise<SellVehicleRequest> {
    if (!hasSupabaseConfig()) return localStorageClient.submitSellRequest(req);
    try {
      const { data, error } = await supabase!
        .from('sell_vehicle_requests')
        .insert({
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
          internal_notes: ''
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error submitting sell request to Supabase:', e);
      throw e;
    }
  },

  async getSellVehicleRequests(): Promise<SellVehicleRequest[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getSellVehicleRequests();
    try {
      const { data, error } = await supabase!.from('sell_vehicle_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching sell requests from Supabase:', e);
      throw e;
    }
  },

  async updateSellRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.updateSellRequestStatus(id, status, internalNotes);
    try {
      const updates: any = { status };
      if (internalNotes !== undefined) updates.internal_notes = internalNotes;
      const { error } = await supabase!.from('sell_vehicle_requests').update(updates).eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating sell request status on Supabase:', e);
      throw e;
    }
  },

  async submitTestDriveRequest(req: Omit<TestDriveRequest, 'id' | 'status' | 'created_at'>): Promise<TestDriveRequest> {
    if (!hasSupabaseConfig()) return localStorageClient.submitTestDriveRequest(req);
    try {
      const { data, error } = await supabase!
        .from('test_drive_requests')
        .insert({
          name: req.name,
          phone: req.phone,
          vehicle_id: req.vehicle_id,
          desired_date: req.desired_date,
          notes: req.notes,
          status: 'Pending',
          internal_notes: ''
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error submitting test drive request to Supabase:', e);
      throw e;
    }
  },

  async getTestDriveRequests(): Promise<TestDriveRequest[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getTestDriveRequests();
    try {
      const { data, error } = await supabase!.from('test_drive_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching test drive requests from Supabase:', e);
      throw e;
    }
  },

  async updateTestDriveRequestStatus(id: string, status: string, internalNotes?: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.updateTestDriveRequestStatus(id, status, internalNotes);
    try {
      const updates: any = { status };
      if (internalNotes !== undefined) updates.internal_notes = internalNotes;
      const { error } = await supabase!.from('test_drive_requests').update(updates).eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating test drive request status on Supabase:', e);
      throw e;
    }
  },

  async submitContact(req: Omit<Contact, 'id' | 'status' | 'created_at'>): Promise<Contact> {
    if (!hasSupabaseConfig()) return localStorageClient.submitContact(req);
    try {
      const { data, error } = await supabase!
        .from('contacts')
        .insert({
          name: req.name,
          phone: req.phone,
          email: req.email,
          message: req.message,
          status: 'Pending'
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error submitting contact to Supabase:', e);
      throw e;
    }
  },

  async getContacts(): Promise<Contact[]> {
    if (!hasSupabaseConfig()) return localStorageClient.getContacts();
    try {
      const { data, error } = await supabase!.from('contacts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Error fetching contacts from Supabase:', e);
      throw e;
    }
  },

  async updateContactStatus(id: string, status: string): Promise<boolean> {
    if (!hasSupabaseConfig()) return localStorageClient.updateContactStatus(id, status);
    try {
      const { error } = await supabase!.from('contacts').update({ status }).eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating contact status on Supabase:', e);
      throw e;
    }
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
    if (!hasSupabaseConfig()) return localStorageClient.getAdminStats();
    try {
      const [vehiclesRes, quotesRes, installmentsRes, sellsRes, testDrivesRes, contactsRes] = await Promise.all([
        supabase!.from('vehicles').select('*', { count: 'exact', head: true }),
        supabase!.from('quote_requests').select('*', { count: 'exact', head: true }),
        supabase!.from('installment_requests').select('*', { count: 'exact', head: true }),
        supabase!.from('sell_vehicle_requests').select('*', { count: 'exact', head: true }),
        supabase!.from('test_drive_requests').select('*', { count: 'exact', head: true }),
        supabase!.from('contacts').select('*', { count: 'exact', head: true })
      ]);

      if (vehiclesRes.error) throw vehiclesRes.error;
      if (quotesRes.error) throw quotesRes.error;
      if (installmentsRes.error) throw installmentsRes.error;
      if (sellsRes.error) throw sellsRes.error;
      if (testDrivesRes.error) throw testDrivesRes.error;
      if (contactsRes.error) throw contactsRes.error;

      return {
        totalVehicles: vehiclesRes.count || 0,
        totalQuotes: quotesRes.count || 0,
        totalInstallments: installmentsRes.count || 0,
        totalSells: sellsRes.count || 0,
        totalTestDrives: testDrivesRes.count || 0,
        totalContacts: contactsRes.count || 0
      };
    } catch (e) {
      console.error('Error fetching admin stats from Supabase:', e);
      throw e;
    }
  },

  // --- AUTH REAL (via Supabase Auth) ---
  async login(email: string, password: string): Promise<{ user: any; error: string | null }> {
    // If it's the demo account, log in locally immediately and bypass calling Supabase Auth
    if (email === 'admin@kenmotor.vn' && password === 'admin123') {
      return localStorageClient.login(email, password);
    }

    try {
      if (!supabase) {
        return { user: null, error: 'Email hoặc mật khẩu không đúng' };
      }
      
      // Temporarily override console.error to prevent any Supabase library logging
      const originalConsoleError = console.error;
      console.error = () => {};
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.error = originalConsoleError; // restore
        
        if (error) {
          return { user: null, error: 'Email hoặc mật khẩu không đúng' };
        }
        return { user: data.user, error: null };
      } catch (innerErr) {
        console.error = originalConsoleError; // restore
        return { user: null, error: 'Email hoặc mật khẩu không đúng' };
      }
    } catch (e) {
      return { user: null, error: 'Email hoặc mật khẩu không đúng' };
    }
  },

  async logout(): Promise<void> {
    await localStorageClient.logout();
    try {
      if (supabase) {
        const originalConsoleError = console.error;
        console.error = () => {};
        try {
          await supabase.auth.signOut();
        } finally {
          console.error = originalConsoleError;
        }
      }
    } catch (e) {
      // ignore
    }
  },

  async getCurrentUser(): Promise<any | null> {
    // Always check the demo session first so demo user stays logged in
    const demoUser = await localStorageClient.getCurrentUser();
    if (demoUser) return demoUser;

    try {
      if (!supabase) return null;
      
      const originalConsoleError = console.error;
      console.error = () => {};
      try {
        const { data, error } = await supabase.auth.getUser();
        console.error = originalConsoleError; // restore
        if (error || !data || !data.user) {
          return null;
        }
        return data.user;
      } catch (innerErr) {
        console.error = originalConsoleError; // restore
        return null;
      }
    } catch (e) {
      return null;
    }
  }
};
