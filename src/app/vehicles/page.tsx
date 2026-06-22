import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import db from '@/lib/db';
import VehicleCard from '@/components/VehicleCard';
import VehiclesFilterSidebar from '@/components/VehiclesFilterSidebar';
import VehiclesPageHeaderWrapper from '@/components/VehiclesPageHeaderWrapper';

interface PageProps {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    condition?: 'new' | 'old' | 'all';
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: 'price_asc' | 'price_desc' | 'latest';
    page?: string;
  }>;
}

export const revalidate = 0; // Dynamic rendering based on URL query parameters

export default async function VehiclesPage({ searchParams }: PageProps) {
  // Await search parameters as required by Next.js 15
  const params = await searchParams;
  
  const brandSlug = params.brand || '';
  const categorySlug = params.category || '';
  const condition = params.condition || 'all';
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const search = params.search || '';
  const sort = params.sort || 'latest';
  const page = params.page ? Number(params.page) : 1;
  const limit = 12;

  // Fetch data from database
  const [
    vehiclesRes,
    brands,
    categories,
    settings
  ] = await Promise.all([
    db.getVehicles({
      brandSlug,
      categorySlug,
      condition,
      minPrice,
      maxPrice,
      search,
      sort,
      page,
      limit
    }).catch(() => ({ data: [], total: 0 })),
    db.getBrands().catch(() => []),
    db.getCategories().catch(() => []),
    db.getSettings().catch(() => ({} as any))
  ]);

  const vehicles = vehiclesRes.data;
  const total = vehiclesRes.total;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const zaloLink = settings.zalo_link || "https://zalo.me/0787990047";

  // Create paginated URLs
  const getPageUrl = (pageNumber: number) => {
    const queryParams = new URLSearchParams();
    if (brandSlug) queryParams.set('brand', brandSlug);
    if (categorySlug) queryParams.set('category', categorySlug);
    if (condition && condition !== 'all') queryParams.set('condition', condition);
    if (minPrice !== undefined) queryParams.set('minPrice', String(minPrice));
    if (maxPrice !== undefined) queryParams.set('maxPrice', String(maxPrice));
    if (search) queryParams.set('search', search);
    if (sort && sort !== 'latest') queryParams.set('sort', sort);
    queryParams.set('page', String(pageNumber));
    return `/vehicles?${queryParams.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs / Back button */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Danh sách xe máy</span>
      </div>

      {/* Catalog Title */}
      <div>
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight">
          Showroom Xe Máy
        </h1>
        <div className="w-16 h-1 bg-brand-red mt-2"></div>
      </div>

      {/* Search and Sort controls */}
      <Suspense fallback={<div className="h-16 bg-white animate-pulse rounded-xl border border-brand-border"></div>}>
        <VehiclesPageHeaderWrapper 
          totalResults={total} 
          brands={brands}
          categories={categories}
        />
      </Suspense>

      {/* Main content split (Sidebar on the left, Grid of cards on the right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Suspense fallback={<div className="h-96 bg-white animate-pulse rounded-xl border border-brand-border"></div>}>
            <VehiclesFilterSidebar brands={brands} categories={categories} />
          </Suspense>
        </div>

        {/* Right column: Grids of motorbikes */}
        <div className="lg:col-span-3 space-y-12">
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((v) => {
                const brand = brands.find(b => b.id === v.brand_id);
                return (
                  <VehicleCard 
                    key={v.id} 
                    vehicle={v} 
                    brandName={brand?.name} 
                    zaloLink={zaloLink}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-brand-border rounded-xl p-16 text-center shadow-sm space-y-4">
              <p className="text-brand-gray text-base leading-relaxed">
                Không tìm thấy chiếc xe nào khớp với điều kiện lọc hiện tại.
              </p>
              <Link 
                href="/vehicles" 
                className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold py-3 px-6 rounded transition-colors inline-block"
                style={{ minHeight: '44px' }}
              >
                Xem tất cả xe máy
              </Link>
            </div>
          )}

          {/* Dynamic SEO Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 pt-6">
              {/* Previous page link */}
              {page > 1 ? (
                <Link
                  href={getPageUrl(page - 1)}
                  className="p-2 border border-brand-border hover:border-brand-red rounded bg-white text-brand-dark transition-colors flex items-center justify-center"
                  aria-label="Previous page"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              ) : (
                <div className="p-2 border border-brand-border rounded bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center" style={{ minHeight: '44px', minWidth: '44px' }}>
                  <ChevronLeft className="w-5 h-5" />
                </div>
              )}

              {/* Page numbers index */}
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === page;
                return (
                  <Link
                    key={pageNum}
                    href={getPageUrl(pageNum)}
                    className={`font-semibold text-sm rounded flex items-center justify-center border transition-all ${
                      isCurrent
                        ? 'bg-brand-red border-brand-red text-white'
                        : 'bg-white border-brand-border hover:border-brand-red text-brand-dark'
                    }`}
                    style={{ minHeight: '44px', minWidth: '44px' }}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {/* Next page link */}
              {page < totalPages ? (
                <Link
                  href={getPageUrl(page + 1)}
                  className="p-2 border border-brand-border hover:border-brand-red rounded bg-white text-brand-dark transition-colors flex items-center justify-center"
                  aria-label="Next page"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <div className="p-2 border border-brand-border rounded bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center" style={{ minHeight: '44px', minWidth: '44px' }}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
