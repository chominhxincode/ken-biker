'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Brand, Category } from '@/lib/db/types';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brands: Brand[];
  categories: Category[];
}

export default function VehiclesMobileFilterDrawer({ isOpen, onClose, brands, categories }: MobileFilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get('brand') || '';
  const currentCat = searchParams.get('category') || '';
  const currentCondition = searchParams.get('condition') || 'all';
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
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
    onClose();
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push('/vehicles');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer panel */}
      <div className="fixed bottom-0 top-0 right-0 w-80 max-w-[85vw] bg-white text-brand-dark flex flex-col shadow-2xl z-50">
        
        {/* Header */}
        <div className="p-4 border-b border-brand-border flex justify-between items-center bg-brand-light/30">
          <h3 className="font-bevietnam font-bold text-sm tracking-wider uppercase">Bộ lọc nâng cao</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-light text-brand-dark">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable filters list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* 1. Condition */}
          <div className="space-y-2">
            <h4 className="font-bevietnam font-bold text-xs uppercase tracking-wider text-brand-red">Tình trạng xe</h4>
            <div className="flex flex-col space-y-2">
              {['all', 'new', 'old'].map((cond) => (
                <label key={cond} className="flex items-center space-x-2 text-sm">
                  <input
                    type="radio"
                    name="mobile-condition"
                    checked={currentCondition === cond}
                    onChange={() => updateQuery('condition', cond === 'all' ? '' : cond)}
                    className="w-4 h-4 text-brand-red accent-brand-red"
                  />
                  <span className="capitalize">{cond === 'all' ? 'Tất cả' : cond === 'new' ? 'Xe mới' : 'Xe cũ'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Brands */}
          <div className="space-y-2 border-t border-brand-border pt-4">
            <h4 className="font-bevietnam font-bold text-xs uppercase tracking-wider text-brand-red">Hãng xe</h4>
            <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto pr-1">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="mobile-brand"
                  checked={currentBrand === ''}
                  onChange={() => updateQuery('brand', '')}
                  className="w-4 h-4 text-brand-red accent-brand-red"
                />
                <span>Tất cả</span>
              </label>
              {brands.map((b) => (
                <label key={b.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="radio"
                    name="mobile-brand"
                    checked={currentBrand === b.slug}
                    onChange={() => updateQuery('brand', b.slug)}
                    className="w-4 h-4 text-brand-red accent-brand-red"
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Categories */}
          <div className="space-y-2 border-t border-brand-border pt-4">
            <h4 className="font-bevietnam font-bold text-xs uppercase tracking-wider text-brand-red">Dòng xe</h4>
            <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto pr-1">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="mobile-category"
                  checked={currentCat === ''}
                  onChange={() => updateQuery('category', '')}
                  className="w-4 h-4 text-brand-red accent-brand-red"
                />
                <span>Tất cả</span>
              </label>
              {categories.map((c) => (
                <label key={c.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="radio"
                    name="mobile-category"
                    checked={currentCat === c.slug}
                    onChange={() => updateQuery('category', c.slug)}
                    className="w-4 h-4 text-brand-red accent-brand-red"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Price values */}
          <div className="space-y-2 border-t border-brand-border pt-4">
            <h4 className="font-bevietnam font-bold text-xs uppercase tracking-wider text-brand-red">Khoảng giá</h4>
            <form onSubmit={handlePriceApply} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-brand-light border border-brand-border rounded px-2 py-1.5 text-xs text-brand-dark focus:outline-none"
                  style={{ minHeight: '44px' }}
                />
                <input
                  type="number"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-brand-light border border-brand-border rounded px-2 py-1.5 text-xs text-brand-dark focus:outline-none"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-red text-white py-2.5 rounded font-bold text-xs uppercase"
                style={{ minHeight: '44px' }}
              >
                Áp dụng bộ lọc
              </button>
            </form>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-brand-border bg-brand-light/30 grid grid-cols-2 gap-2">
          <button
            onClick={handleReset}
            className="border border-brand-border hover:border-brand-red bg-white text-brand-dark font-bold py-3 text-xs rounded uppercase"
            style={{ minHeight: '44px' }}
          >
            Đặt lại
          </button>
          <button
            onClick={onClose}
            className="bg-brand-dark text-white font-bold py-3 text-xs rounded uppercase"
            style={{ minHeight: '44px' }}
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
