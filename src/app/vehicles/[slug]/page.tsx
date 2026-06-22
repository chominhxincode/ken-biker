import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Check, Sparkles, AlertCircle, FileText, Settings, Star } from 'lucide-react';
import db from '@/lib/db';
import { safeImageUrl } from '@/lib/image-utils';
import VehicleCard from '@/components/VehicleCard';
import VehicleImagesGallery from '@/components/VehicleImagesGallery';
import VehicleActions from '@/components/VehicleActions';
import VehicleInstallmentBox from '@/components/VehicleInstallmentBox';
import VehicleLeadForm from '@/components/VehicleLeadForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata per motorbike
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await db.getVehicleBySlug(slug);
  if (!data) return {};

  const { vehicle } = data;
  const title = `${vehicle.name} chính hãng | Ken Motor`;
  const description = vehicle.short_desc || `Khám phá xe máy ${vehicle.name} tại Ken Motor Đồng Tháp. Giá lăn bánh, hỗ trợ trả góp lãi suất cực thấp.`;
  const image = vehicle.og_image || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: 'website'
    }
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  
  // Fetch details
  const detailData = await db.getVehicleBySlug(slug);
  if (!detailData) {
    notFound();
  }

  const { vehicle, images } = detailData;

  // Fetch parallel dependencies
  const [
    brands,
    settings,
    similarRes
  ] = await Promise.all([
    db.getBrands().catch(() => []),
    db.getSettings().catch(() => ({} as any)),
    db.getVehicles({ categorySlug: vehicle.category_id ? undefined : undefined, limit: 5 }).catch(() => ({ data: [], total: 0 }))
  ]);

  const brand = brands.find(b => b.id === vehicle.brand_id);
  const hotline = settings.hotline || "0787990047";
  const zaloUrl = settings.zalo_link || "https://zalo.me/0787990047";

  // Filter similar vehicles (exclude current one)
  const similarVehicles = similarRes.data
    .filter(v => v.id !== vehicle.id && v.category_id === vehicle.category_id && !v.is_sold)
    .slice(0, 4);

  // Format price helper
  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  const hasDiscount = !!vehicle.promo_price;
  const displayPrice = vehicle.promo_price || vehicle.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-12">
      {/* 1. Breadcrumbs / Back */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/vehicles" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Showroom</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold truncate max-w-xs">{vehicle.name}</span>
      </div>

      {/* 2. Main Product Hero split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side: Images Gallery */}
        <div>
          <VehicleImagesGallery 
            images={images} 
            vehicleName={vehicle.name} 
            defaultCoverUrl={safeImageUrl(vehicle.og_image, 'vehicle')} 
          />
        </div>

        {/* Right Side: Primary Info & Quick CTAs */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Tag state labels */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded text-white shadow-sm uppercase ${
                vehicle.is_new ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {vehicle.is_new ? 'Xe mới 100%' : 'Xe cũ tuyển chọn'}
              </span>
              {!vehicle.is_new && vehicle.registration_year && (
                <span className="bg-brand-light text-brand-dark border border-brand-border text-[10px] font-bold px-2 py-0.5 rounded">
                  Đăng ký: {vehicle.registration_year}
                </span>
              )}
              {vehicle.sku && (
                <span className="text-brand-gray text-xs font-mono">SKU: {vehicle.sku}</span>
              )}
            </div>

            {/* Main title */}
            <h1 className="font-bevietnam font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-dark tracking-tight leading-tight">
              {vehicle.name}
            </h1>

            {/* Brand Logo & Name */}
            <div className="flex items-center space-x-2 text-xs text-brand-gray font-bold uppercase tracking-wider">
              <span>Hãng sản xuất:</span>
              <span className="text-brand-red font-extrabold">{brand?.name || 'Chính Hãng'}</span>
            </div>

            {/* Retail prices block */}
            <div className="bg-white border border-brand-border rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block mb-1">Giá bán đề xuất</span>
                {hasDiscount ? (
                  <div className="flex items-baseline space-x-3">
                    <span className="text-xl lg:text-2xl font-bevietnam font-extrabold text-brand-red">
                      {formatPrice(vehicle.promo_price!)}
                    </span>
                    <span className="text-sm text-brand-gray line-through">
                      {formatPrice(vehicle.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl lg:text-2xl font-bevietnam font-extrabold text-brand-dark">
                    {vehicle.price > 0 ? formatPrice(vehicle.price) : 'Liên hệ Hotline'}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <span className="bg-brand-red text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm animate-pulse">
                  Tiết kiệm {Math.round(((vehicle.price - vehicle.promo_price!) / vehicle.price) * 100)}%
                </span>
              )}
            </div>

            {/* Core specs highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white border border-brand-border p-3 rounded-lg text-center space-y-1 shadow-sm">
                <span className="text-[10px] text-brand-gray font-bold uppercase tracking-wider block">Động cơ</span>
                <span className="font-bold text-xs lg:text-sm text-brand-dark">{vehicle.engine_capacity || 'N/A'}</span>
              </div>
              <div className="bg-white border border-brand-border p-3 rounded-lg text-center space-y-1 shadow-sm">
                <span className="text-[10px] text-brand-gray font-bold uppercase tracking-wider block">Mức tiêu thụ</span>
                <span className="font-bold text-xs lg:text-sm text-brand-dark">{vehicle.fuel_consumption || 'N/A'}</span>
              </div>
              <div className="bg-white border border-brand-border p-3 rounded-lg text-center space-y-1 shadow-sm">
                <span className="text-[10px] text-brand-gray font-bold uppercase tracking-wider block">Bảo hành</span>
                <span className="font-bold text-xs lg:text-sm text-brand-dark">{vehicle.warranty || 'N/A'}</span>
              </div>
            </div>

          </div>

          {/* Interactive actions for Cart, Zalo & call */}
          <Suspense fallback={<div className="h-20 bg-gray-200 animate-pulse rounded-lg"></div>}>
            <VehicleActions vehicle={vehicle} hotline={hotline} zaloUrl={zaloUrl} />
          </Suspense>

        </div>
      </div>

      {/* 3. Lower layout grid: Specs checklists & simulators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        
        {/* Left Side: Descriptions, checklists, specs table (Col-span 2) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Detailed description */}
          {vehicle.detail_desc && (
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="font-bevietnam font-bold text-lg text-brand-dark tracking-tight border-b border-brand-border pb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-brand-red" />
                <span>Mô tả chi tiết</span>
              </h2>
              <div 
                className="prose prose-sm max-w-none text-brand-gray leading-relaxed text-sm space-y-3"
                dangerouslySetInnerHTML={{ __html: vehicle.detail_desc }}
              ></div>
            </div>
          )}

          {/* Transparent USED Motorbike checklist (if xe cu) */}
          {!vehicle.is_new && vehicle.used_checklist_json && Object.keys(vehicle.used_checklist_json).length > 0 && (
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-brand-border pb-4">
                <div className="space-y-1">
                  <h2 className="font-bevietnam font-bold text-lg text-brand-dark tracking-tight flex items-center space-x-2">
                    <ShieldCheck className="w-5.5 h-5.5 text-brand-red" />
                    <span>Cam kết tình trạng xe cũ minh bạch</span>
                  </h2>
                  <p className="text-brand-gray text-xs">Mọi bộ phận của xe cũ đều được đội ngũ kỹ sư kiểm định nghiêm ngặt</p>
                </div>
                {/* Score badge */}
                <div className="bg-brand-red text-white py-2 px-4 rounded-xl flex items-center space-x-1.5 shadow-md self-start sm:self-auto">
                  <Star className="w-5.5 h-5.5 fill-white text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Đánh giá chung</span>
                    <span className="font-bevietnam font-extrabold text-base leading-none">
                      {vehicle.used_checklist_json['Điểm đánh giá'] || '9/10'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist details matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(vehicle.used_checklist_json).map(([key, val]) => {
                  // Exclude the score itself from lists
                  if (key === 'Điểm đánh giá') return null;
                  return (
                    <div key={key} className="flex items-start space-x-3 p-3 bg-brand-light/35 rounded-lg border border-brand-border/40">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-dark block uppercase tracking-wider mb-0.5">{key}</span>
                        <p className="text-xs text-brand-gray">{val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legal Warning Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3 text-xs text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="leading-relaxed">
                  <strong>Cam kết pháp lý tại Ken Motor:</strong> Tất cả xe máy cũ đều bảo hành máy móc động cơ trong vòng 6 tháng. Giấy tờ mua bán công chứng trong ngày, bao tranh chấp trọn đời toàn quốc.
                </p>
              </div>

            </div>
          )}

          {/* Specifications table */}
          {vehicle.specs_json && Object.keys(vehicle.specs_json).length > 0 && (
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="font-bevietnam font-bold text-lg text-brand-dark tracking-tight border-b border-brand-border pb-3 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-brand-red" />
                <span>Thông số kỹ thuật</span>
              </h2>
              
              <div className="border border-brand-border rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs lg:text-sm">
                  <tbody>
                    {Object.entries(vehicle.specs_json).map(([key, val], idx) => (
                      <tr 
                        key={key} 
                        className={`border-b border-brand-border last:border-0 ${
                          idx % 2 === 0 ? 'bg-brand-light/30' : 'bg-white'
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-brand-dark w-1/3 border-r border-brand-border/60">{key}</td>
                        <td className="px-4 py-3 text-brand-gray w-2/3">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Installment Box & Contact Lead Form (Col-span 1) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Quick Installment Simulate */}
          {vehicle.price > 0 && (
            <Suspense fallback={<div className="h-48 bg-white animate-pulse border rounded-xl"></div>}>
              <VehicleInstallmentBox vehicle={vehicle} />
            </Suspense>
          )}

          {/* Lead consultation Form */}
          <Suspense fallback={<div className="h-64 bg-white animate-pulse border rounded-xl"></div>}>
            <VehicleLeadForm vehicle={vehicle} />
          </Suspense>
        </div>

      </div>

      {/* 4. Similar motorbikes */}
      {similarVehicles.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-brand-border">
          <div>
            <h2 className="font-bevietnam font-extrabold text-2xl lg:text-3xl text-brand-dark tracking-tight">
              Sản Phẩm Tương Tự
            </h2>
            <div className="w-16 h-1 bg-brand-red mt-2.5"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarVehicles.map((similar) => {
              const simBrand = brands.find(b => b.id === similar.brand_id);
              return (
                <VehicleCard 
                  key={similar.id} 
                  vehicle={similar} 
                  brandName={simBrand?.name} 
                  zaloLink={zaloUrl}
                />
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
