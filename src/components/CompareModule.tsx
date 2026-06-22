'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { X, RefreshCw, AlertCircle, ShoppingCart, MessageCircle, Info } from 'lucide-react';
import { Vehicle, Brand } from '@/lib/db/types';
import { useCart } from '@/context/CartContext';

interface CompareModuleProps {
  vehicles: Vehicle[];
  brands: Brand[];
  zaloLink: string;
}

export default function CompareModule({ vehicles, brands, zaloLink }: CompareModuleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, cart } = useCart();

  // Selected vehicle slugs states
  const [selectedSlugs, setSelectedSlugs] = useState<(string | null)[]>([null, null, null]);

  // Sync state from query params on mount/change
  useEffect(() => {
    const v1 = searchParams.get('v1');
    const v2 = searchParams.get('v2');
    const v3 = searchParams.get('v3');
    setSelectedSlugs([v1, v2, v3]);
  }, [searchParams]);

  // Update query params helper
  const updateQuery = (newSlugs: (string | null)[]) => {
    const params = new URLSearchParams();
    if (newSlugs[0]) params.set('v1', newSlugs[0]);
    if (newSlugs[1]) params.set('v2', newSlugs[1]);
    if (newSlugs[2]) params.set('v2', newSlugs[2]); // Wait, make sure we use v3 for column 3!
    if (newSlugs[2]) params.set('v3', newSlugs[2]);
    router.push(`/so-sanh?${params.toString()}`, { scroll: false });
  };

  const handleSelectChange = (index: number, slug: string) => {
    const updated = [...selectedSlugs];
    updated[index] = slug || null;
    setSelectedSlugs(updated);
    updateQuery(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...selectedSlugs];
    updated[index] = null;
    setSelectedSlugs(updated);
    updateQuery(updated);
  };

  // Map slugs to actual vehicle objects
  const selectedVehicles = selectedSlugs.map(slug => 
    slug ? vehicles.find(v => v.slug === slug) || null : null
  );

  // Alphabetically sorted motorbikes for clean selector list
  const sortedVehicles = [...vehicles].sort((a, b) => a.name.localeCompare(b.name));

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  // Define compare rows
  const specRows = [
    { label: 'Tình trạng', getValue: (v: Vehicle) => v.is_new ? 'Xe mới 100%' : 'Xe cũ đã kiểm định' },
    { label: 'Năm đăng ký', getValue: (v: Vehicle) => v.registration_year || 'N/A' },
    { label: 'Số Odo (km)', getValue: (v: Vehicle) => v.is_new ? '0 km' : `${v.odometer.toLocaleString()} km` },
    { label: 'Động cơ / Dung tích', getValue: (v: Vehicle) => v.engine_capacity || 'N/A' },
    { label: 'Tiêu hao nhiên liệu', getValue: (v: Vehicle) => v.fuel_consumption || 'N/A' },
    { label: 'Loại phanh', getValue: (v: Vehicle) => v.brake_type || 'N/A' },
    { label: 'Màu sắc', getValue: (v: Vehicle) => v.color || 'N/A' },
    { label: 'Bảo hành', getValue: (v: Vehicle) => v.warranty || 'N/A' },
    
    // Key specs parsed from JSON
    { label: 'Trọng lượng', getValue: (v: Vehicle) => v.specs_json['Trọng lượng'] || v.specs_json['Khối lượng bản thân'] || 'N/A' },
    { label: 'Chiều cao yên', getValue: (v: Vehicle) => v.specs_json['Độ cao yên'] || v.specs_json['Chiều cao yên'] || 'N/A' },
    { label: 'Dung tích cốp', getValue: (v: Vehicle) => v.specs_json['Dung tích cốp'] || v.specs_json['Ngăn chứa đồ'] || 'N/A' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Selection row dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedSlugs.map((slug, idx) => (
          <div key={idx} className="bg-white border border-brand-border rounded-xl p-4 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
              Chọn Xe Thứ {idx + 1}
            </label>
            <select
              value={slug || ''}
              onChange={(e) => handleSelectChange(idx, e.target.value)}
              className="w-full bg-brand-light border border-brand-border rounded-lg px-3 py-2.5 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red"
              style={{ minHeight: '44px' }}
            >
              <option value="">-- Chọn xe --</option>
              {sortedVehicles.map(v => (
                <option key={v.id} value={v.slug}>
                  {v.name} ({v.is_new ? 'Mới' : 'Cũ'})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Grid Table */}
      {selectedVehicles.some(v => v !== null) ? (
        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          {/* Mobile Swipe Indicator Banner */}
          <div className="md:hidden bg-brand-red/10 border-b border-brand-border/20 text-brand-red text-center py-2.5 px-4 text-xs font-bold flex items-center justify-center space-x-1.5 animate-pulse">
            <span>↔ Vuốt sang ngang để xem toàn bộ thông số</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Table Header: Photo, Name, Price, CTAs */}
              <thead>
                <tr className="border-b border-brand-border bg-brand-light/30">
                  <th className="p-4 w-1/4 text-brand-gray text-xs font-bold uppercase tracking-wider">Thông tin so sánh</th>
                  {selectedVehicles.map((vehicle, idx) => (
                    <th key={idx} className="p-4 w-1/4 border-l border-brand-border/60 relative">
                      {vehicle ? (
                        <div className="space-y-4">
                          {/* Close / Remove button */}
                          <button
                            onClick={() => handleRemove(idx)}
                            className="absolute top-2 right-2 p-1 bg-gray-100 hover:bg-brand-red hover:text-white rounded-full transition-colors text-brand-gray"
                            title="Xóa cột"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {/* Image */}
                          <div className="relative h-28 w-full rounded-lg overflow-hidden bg-white border border-brand-border">
                            <SafeImage
                              src={vehicle.og_image}
                              alt={vehicle.name}
                              fill
                              fallbackType="vehicle"
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                          </div>

                          {/* Brand & Name */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-brand-red uppercase tracking-wider block">
                              {brands.find(b => b.id === vehicle.brand_id)?.name || 'Chính hãng'}
                            </span>
                            <Link href={`/vehicles/${vehicle.slug}`} className="hover:text-brand-red hover:underline transition-colors block text-xs lg:text-sm font-bold text-brand-dark leading-tight line-clamp-2">
                              {vehicle.name}
                            </Link>
                          </div>

                          {/* Price */}
                          <div className="font-bevietnam font-extrabold text-sm lg:text-base text-brand-dark">
                            {vehicle.promo_price ? (
                              <div className="flex flex-col">
                                <span className="text-[10px] text-brand-gray line-through leading-none mb-0.5">{formatPrice(vehicle.price)}</span>
                                <span className="text-brand-red">{formatPrice(vehicle.promo_price)}</span>
                              </div>
                            ) : (
                              vehicle.price > 0 ? formatPrice(vehicle.price) : 'Liên hệ'
                            )}
                          </div>

                          {/* Action button triggers */}
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => !vehicle.is_sold && addToCart(vehicle)}
                              disabled={vehicle.is_sold}
                              className="w-full bg-brand-dark hover:bg-brand-red text-white py-2 rounded text-[10px] font-bold uppercase transition-colors flex items-center justify-center space-x-1 disabled:bg-gray-200 disabled:text-gray-400"
                              style={{ minHeight: '36px' }}
                            >
                              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                              <span>Báo giá</span>
                            </button>
                            <a
                              href={`${zaloLink}?text=${encodeURIComponent(`Tôi muốn tư vấn so sánh chi tiết xe: ${vehicle.name}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-[10px] font-bold uppercase transition-colors flex items-center justify-center space-x-1"
                              style={{ minHeight: '36px' }}
                            >
                              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>Zalo</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-brand-gray space-y-2 border-2 border-dashed border-brand-border rounded-xl">
                          <AlertCircle className="w-6 h-6 text-brand-border" />
                          <span className="text-xs text-center">Chưa chọn xe</span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body rows */}
              <tbody>
                {specRows.map((row, rIdx) => (
                  <tr 
                    key={row.label}
                    className={`border-b border-brand-border last:border-0 ${
                      rIdx % 2 === 0 ? 'bg-brand-light/20' : 'bg-white'
                    }`}
                  >
                    {/* Spec Key Name */}
                    <td className="p-4 font-semibold text-brand-dark text-xs lg:text-sm">{row.label}</td>
                    
                    {/* Selections values */}
                    {selectedVehicles.map((vehicle, colIdx) => (
                      <td key={colIdx} className="p-4 text-brand-gray text-xs lg:text-sm border-l border-brand-border/60">
                        {vehicle ? row.getValue(vehicle) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-brand-border rounded-2xl p-16 text-center shadow-sm space-y-4">
          <p className="text-brand-gray text-base">
            Hãy chọn ít nhất 1 hoặc tối đa 3 chiếc xe máy ở thanh lựa chọn trên để bắt đầu so sánh thông số kỹ thuật.
          </p>
        </div>
      )}

    </div>
  );
}
