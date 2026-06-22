'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import db from '@/lib/db';
import { Vehicle, Brand, Category } from '@/lib/db/types';

interface SearchBarProps {
  vehicles?: Vehicle[];
  placeholder?: string;
  compact?: boolean;
}

export default function SearchBar({ vehicles: propVehicles, placeholder = "Tìm xe, hãng xe, dòng xe...", compact = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(propVehicles || []);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Debounce handle for input queries
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load data if not provided as props
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Always fetch brands and categories to map names for searching
        const [brandData, catData] = await Promise.all([
          db.getBrands().catch(() => []),
          db.getCategories().catch(() => [])
        ]);
        setBrands(brandData);
        setCategories(catData);

        if (!propVehicles) {
          const res = await db.getVehicles({ limit: 250 }).catch(() => ({ data: [], total: 0 }));
          setVehicles(res.data);
        }
      } catch (e) {
        console.error('Error loading search data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propVehicles]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeDiacritics = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (!val.trim()) {
        setSuggestions([]);
        return;
      }

      const normalizedQuery = removeDiacritics(val.trim());

      const filtered = vehicles.filter(v => {
        const brand = brands.find(b => b.id === v.brand_id);
        const category = categories.find(c => c.id === v.category_id);

        const nameMatch = removeDiacritics(v.name).includes(normalizedQuery);
        const skuMatch = v.sku ? removeDiacritics(v.sku).includes(normalizedQuery) : false;
        const brandMatch = brand ? removeDiacritics(brand.name).includes(normalizedQuery) : false;
        const catMatch = category ? removeDiacritics(category.name).includes(normalizedQuery) : false;
        const capacityMatch = v.engine_capacity ? removeDiacritics(v.engine_capacity).includes(normalizedQuery) : false;
        const colorMatch = v.color ? removeDiacritics(v.color).includes(normalizedQuery) : false;

        return nameMatch || skuMatch || brandMatch || catMatch || capacityMatch || colorMatch;
      });

      // Limit suggestions to 5-8 items
      setSuggestions(filtered.slice(0, 7));
    }, 200); // Debounce 200ms
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/vehicles?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const formatPrice = (value: number) => {
    if (!value || value <= 0) return 'Liên hệ';
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + ' tỷ';
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + ' triệu';
    }
    return value.toLocaleString('vi-VN') + ' đ';
  };

  const handleSuggestionClick = (slug: string) => {
    setShowDropdown(false);
    setQuery('');
    router.push(`/vehicles/${slug}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-brand-dark border border-white/20 focus:border-brand-red rounded-lg pl-10 pr-4 py-2 text-xs lg:text-sm focus:outline-none transition-all duration-300 placeholder:text-gray-400"
          style={{ minHeight: compact ? '40px' : '44px' }}
        />
        <button 
          type="submit" 
          className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Submit search"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Suggestion Dropdown */}
      {showDropdown && query.trim() !== '' && (
        <div className="absolute left-0 right-0 mt-2 bg-brand-dark border border-white/15 rounded-xl shadow-2xl py-2 z-50 overflow-hidden max-h-[380px] overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="space-y-0.5">
              <div className="px-4 py-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-white/5 mb-1">
                Gợi ý xe phù hợp ({suggestions.length})
              </div>
              {suggestions.map((v) => {
                const brand = brands.find(b => b.id === v.brand_id);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSuggestionClick(v.slug)}
                    className="w-full px-4 py-2 hover:bg-white/5 transition-colors flex items-center gap-3 text-left border-b border-white/5 last:border-b-0 cursor-pointer focus:outline-none"
                  >
                    {/* Image Preview */}
                    <div className="w-12 h-12 rounded bg-brand-light overflow-hidden shrink-0 border border-white/10 relative">
                      {v.og_image || v.specs_json?.image_url ? (
                        <img 
                          src={v.og_image || v.specs_json?.image_url || ''} 
                          alt={v.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-light flex items-center justify-center text-gray-400 text-[10px]">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-white truncate leading-tight">
                        {v.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {brand && (
                          <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/25 px-1.5 py-0.2 rounded font-bold">
                            {brand.name}
                          </span>
                        )}
                        {v.engine_capacity && (
                          <span className="text-[10px] text-gray-400">
                            {v.engine_capacity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-brand-red">
                        {v.promo_price ? formatPrice(Number(v.promo_price)) : (v.price > 0 ? formatPrice(Number(v.price)) : 'Liên hệ')}
                      </span>
                      {v.promo_price && v.price > 0 && (
                        <div className="text-[9px] text-gray-400 line-through">
                          {formatPrice(Number(v.price))}
                        </div>
                      )}
                    </div>

                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-xs text-gray-400">
              Không tìm thấy xe phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
}
