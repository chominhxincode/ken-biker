import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import CompareModule from '@/components/CompareModule';

export const metadata: Metadata = {
  title: 'So Sánh Thông Số Xe Máy | Ken Motor',
  description: 'So sánh chi tiết thông số kỹ thuật, giá bán lẻ, phanh ABS/CBS, độ cao yên và dung tích cốp của tối đa 3 chiếc xe cùng lúc tại Ken Motor.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ComparePage() {
  // Fetch vehicles and settings on server
  const [
    vehiclesRes,
    brands,
    settings
  ] = await Promise.all([
    db.getVehicles({ limit: 150 }).catch(() => ({ data: [], total: 0 })),
    db.getBrands().catch(() => []),
    db.getSettings().catch(() => ({} as any))
  ]);

  const vehicles = vehiclesRes.data;
  const zaloLink = settings.zalo_link || "https://zalo.me/0787990047";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">So sánh xe máy</span>
      </div>

      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          So Sánh Xe Máy
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Đối chiếu trực quan thông số kỹ thuật, tình trạng giấy tờ, giá thành và tiện ích đi kèm giữa các mẫu xe máy.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Main comparative component wrapper */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-4xl mx-auto"></div>}>
        <CompareModule 
          vehicles={vehicles} 
          brands={brands} 
          zaloLink={zaloLink} 
        />
      </Suspense>
    </div>
  );
}
