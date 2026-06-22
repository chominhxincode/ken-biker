import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import AdvisoryTool from '@/components/AdvisoryTool';

export const metadata: Metadata = {
  title: 'Tư Vấn Chọn Xe Máy Phù Hợp | Ken Motor',
  description: 'Công cụ tư vấn chọn xe máy thông minh dựa trên ngân sách, chiều cao chống chân, vóc dáng, mục đích sử dụng và tiết kiệm nhiên liệu.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function AdvisoryPage() {
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
  const hotline = settings.hotline || "0787990047";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Tư vấn chọn xe máy</span>
      </div>

      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Tư Vấn Chọn Xe
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Trả lời nhanh 4 câu hỏi trắc nghiệm dưới đây để được hệ thống tính toán gợi ý các mẫu xe phù hợp nhất.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Advisory wizard container */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-4xl mx-auto"></div>}>
        <AdvisoryTool 
          vehicles={vehicles} 
          brands={brands} 
          zaloLink={zaloLink} 
          hotline={hotline} 
        />
      </Suspense>
    </div>
  );
}
