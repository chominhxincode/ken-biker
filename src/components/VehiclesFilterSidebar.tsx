'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brand, Category } from '@/lib/db/types';

interface FilterSidebarProps {
  brands: Brand[];
  categories: Category[];
}

export default function VehiclesFilterSidebar({ brands, categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load initial filter states from URL query parameters
  const currentBrand = searchParams.get('brand') || '';
  const currentCat = searchParams.get('category') || '';
  const currentCondition = searchParams.get('condition') || 'all';
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Helper to build URL with updated search params
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset page to 1 when changing filters
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push('/vehicles');
  };

  return (
    <aside className="space-y-6 bg-white border border-brand-border rounded-xl p-6 shadow-sm sticky top-24">
      {/* Reset filters header */}
      <div className="flex justify-between items-center border-b border-brand-border pb-3">
        <h3 className="font-bevietnam font-bold text-sm tracking-wider uppercase text-brand-dark">Bộ lọc tìm kiếm</h3>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-brand-red hover:underline"
        >
          Đặt lại
        </button>
      </div>

      {/* 1. Condition Filter */}
      <div className="space-y-2">
        <h4 className="font-bevietnam font-bold text-xs text-brand-dark uppercase tracking-wider">Tình trạng xe</h4>
        <div className="flex flex-col space-y-2">
          {['all', 'new', 'old'].map((cond) => (
            <label key={cond} className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
              <input
                type="radio"
                name="condition"
                checked={currentCondition === cond}
                onChange={() => updateQuery('condition', cond === 'all' ? '' : cond)}
                className="w-4 h-4 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
              />
              <span className="text-brand-dark capitalize">
                {cond === 'all' ? 'Tất cả xe' : cond === 'new' ? 'Xe máy mới' : 'Xe đã sử dụng (Cũ)'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Brand Filter */}
      <div className="space-y-2 border-t border-brand-border/60 pt-4">
        <h4 className="font-bevietnam font-bold text-xs text-brand-dark uppercase tracking-wider">Hãng xe</h4>
        <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
            <input
              type="radio"
              name="brand"
              checked={currentBrand === ''}
              onChange={() => updateQuery('brand', '')}
              className="w-4 h-4 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
            />
            <span className="text-brand-dark">Tất cả hãng</span>
          </label>
          {brands.map((b) => (
            <label key={b.id} className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
              <input
                type="radio"
                name="brand"
                checked={currentBrand === b.slug}
                onChange={() => updateQuery('brand', b.slug)}
                className="w-4 h-4 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
              />
              <span className="text-brand-dark">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Category Filter */}
      <div className="space-y-2 border-t border-brand-border/60 pt-4">
        <h4 className="font-bevietnam font-bold text-xs text-brand-dark uppercase tracking-wider">Danh mục dòng xe</h4>
        <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
            <input
              type="radio"
              name="category"
              checked={currentCat === ''}
              onChange={() => updateQuery('category', '')}
              className="w-4 h-4 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
            />
            <span className="text-brand-dark">Tất cả danh mục</span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
              <input
                type="radio"
                name="category"
                checked={currentCat === c.slug}
                onChange={() => updateQuery('category', c.slug)}
                className="w-4 h-4 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
              />
              <span className="text-brand-dark">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Price range filter */}
      <div className="space-y-2 border-t border-brand-border/60 pt-4">
        <h4 className="font-bevietnam font-bold text-xs text-brand-dark uppercase tracking-wider">Khoảng giá (VNĐ)</h4>
        <form onSubmit={handlePriceApply} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Từ giá"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-brand-light border border-brand-border rounded px-2.5 py-1.5 text-xs text-brand-dark focus:outline-none focus:border-brand-red"
              style={{ minHeight: '44px' }}
            />
            <input
              type="number"
              placeholder="Đến giá"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-brand-light border border-brand-border rounded px-2.5 py-1.5 text-xs text-brand-dark focus:outline-none focus:border-brand-red"
              style={{ minHeight: '44px' }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-dark hover:bg-brand-red text-white py-2 rounded text-xs font-bold transition-colors"
            style={{ minHeight: '44px' }}
          >
            Áp dụng
          </button>
        </form>
      </div>

    </aside>
  );
}
