'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GitCompare } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';

interface QuickCompareSelectorProps {
  vehicles: Vehicle[];
}

export default function QuickCompareSelector({ vehicles }: QuickCompareSelectorProps) {
  const router = useRouter();
  const [vehicle1, setVehicle1] = useState('');
  const [vehicle2, setVehicle2] = useState('');

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle1 || !vehicle2) return;
    
    // Redirect to /so-sanh page with query params
    router.push(`/so-sanh?v1=${vehicle1}&v2=${vehicle2}`);
  };

  // Sort vehicles alphabetically for clean selector list
  const sortedVehicles = [...vehicles].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <form 
      onSubmit={handleCompare}
      className="bg-brand-dark text-white rounded-xl p-6 border border-white/10 shadow-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 items-center"
    >
      <div className="md:col-span-3">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Xe thứ nhất</label>
        <select
          value={vehicle1}
          onChange={(e) => setVehicle1(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-white"
          style={{ minHeight: '44px' }}
          required
        >
          <option value="" className="text-brand-dark">-- Chọn xe thứ nhất --</option>
          {sortedVehicles.map(v => (
            <option key={v.id} value={v.slug} className="text-brand-dark">
              {v.name} ({v.is_new ? 'Mới' : 'Cũ'})
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-1 flex justify-center text-brand-red">
        <GitCompare className="w-6 h-6 animate-pulse rotate-90 md:rotate-0" />
      </div>

      <div className="md:col-span-3">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Xe thứ hai</label>
        <select
          value={vehicle2}
          onChange={(e) => setVehicle2(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-white"
          style={{ minHeight: '44px' }}
          required
        >
          <option value="" className="text-brand-dark">-- Chọn xe thứ hai --</option>
          {sortedVehicles.filter(v => v.slug !== vehicle1).map(v => (
            <option key={v.id} value={v.slug} className="text-brand-dark">
              {v.name} ({v.is_new ? 'Mới' : 'Cũ'})
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-7 flex justify-center pt-2">
        <button
          type="submit"
          disabled={!vehicle1 || !vehicle2}
          className="w-full md:w-auto bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-8 py-3 rounded-lg text-sm transition-all shadow-md disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed uppercase tracking-wider"
          style={{ minHeight: '44px' }}
        >
          So sánh chi tiết
        </button>
      </div>
    </form>
  );
}
