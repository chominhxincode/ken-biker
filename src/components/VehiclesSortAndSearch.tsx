'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SortAndSearchProps {
  totalResults: number;
  onMobileFilterOpen: () => void;
}

export default function VehiclesSortAndSearch({ totalResults, onMobileFilterOpen }: SortAndSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const currentSort = searchParams.get('sort') || 'latest';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val && val !== 'latest') {
      params.set('sort', val);
    } else {
      params.delete('sort');
    }
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-brand-border rounded-xl p-4 shadow-sm w-full">
      {/* Count Indicator */}
      <div className="text-xs md:text-sm text-brand-gray font-semibold order-3 md:order-1">
        Hiển thị <span className="text-brand-dark font-bold">{totalResults}</span> xe máy tại showroom
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 order-1 md:order-2 flex-grow md:max-w-xl justify-end">
        {/* Mobile Filter Toggle */}
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center justify-center space-x-1 border border-brand-border hover:border-brand-red rounded-lg px-3 py-2 text-xs font-bold text-brand-dark bg-brand-light/30 shrink-0"
          style={{ minHeight: '44px' }}
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-red" />
          <span>Bộ lọc</span>
        </button>

        {/* Text Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-xs md:max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm dòng xe, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-light border border-brand-border focus:border-brand-red rounded-lg pl-9 pr-4 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
          <button 
            type="submit" 
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-gray hover:text-brand-red"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Sort Selection dropdown */}
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="bg-brand-light border border-brand-border rounded-lg px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red shrink-0"
          style={{ minHeight: '44px' }}
        >
          <option value="latest">Mới nhất</option>
          <option value="price_asc">Giá: Thấp đến Cao</option>
          <option value="price_desc">Giá: Cao đến Thấp</option>
        </select>
      </div>
    </div>
  );
}
