import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, ShieldCheck, Award, Zap, HelpCircle, Sparkles, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import db from '@/lib/db';
import HeroSlider from '@/components/HeroSlider';
import VehicleCard from '@/components/VehicleCard';
import QuickCompareSelector from '@/components/QuickCompareSelector';
import QuickInstallmentCalculator from '@/components/QuickInstallmentCalculator';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FaqSection';
import SafeImage from '@/components/SafeImage';

// Enable SSR layout query revalidations
export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  // 1. Fetch content concurrently on the server side
  const [
    sliders,
    categories,
    brands,
    faqs,
    testimonials,
    blogRes,
    vehiclesRes,
    settings
  ] = await Promise.all([
    db.getSliders({ isVisibleOnly: true }).catch(() => []),
    db.getCategories().catch(() => []),
    db.getBrands().catch(() => []),
    db.getFAQs().catch(() => []),
    db.getTestimonials().catch(() => []),
    db.getPosts({ isVisibleOnly: true }).catch(() => []),
    db.getVehicles({ limit: 100 }).catch(() => ({ data: [], total: 0 })),
    db.getSettings().catch(() => ({} as any))
  ]);

  const allVehicles = vehiclesRes.data;
  const recentBlogs = blogRes.slice(0, 3);
  const zaloLink = settings.zalo_link || "https://zalo.me/0787990047";

  // Segment vehicles on the server to avoid query overhead
  const newArrivals = allVehicles.filter(v => v.is_new_arrival && !v.is_sold).slice(0, 4);
  const hotSellers = allVehicles.filter(v => v.is_featured && !v.is_sold).slice(0, 4);
  const usedVehicles = allVehicles.filter(v => !v.is_new && !v.is_sold).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* 1. HERO SLIDER */}
      <section className="relative">
        <HeroSlider sliders={sliders} settings={settings} />
      </section>

      {/* 2. ADVISORY CTA BANNER (Showroom luxury styling) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-brand-dark text-white border-l-4 border-brand-red p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="inline-block bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold tracking-widest px-3 py-1 rounded uppercase">
              Công cụ đặc biệt
            </span>
            <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight leading-tight uppercase">
              Hệ thống tư vấn chọn xe máy phù hợp
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Nhập ngân sách, mục đích di chuyển, chiều cao và sở thích. Thuật toán logic sẽ tự động lọc ra chiếc xe tối ưu nhất cho nhu cầu của bạn.
            </p>
          </div>
          <Link
            href={settings.cta_consult_link || "/tu-van-chon-xe"}
            className="w-full md:w-auto text-center bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-8 py-4 rounded-lg tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 text-sm lg:text-base shadow-lg shadow-brand-red/20 shrink-0"
            style={{ minHeight: '44px' }}
          >
            <span>{settings.cta_consult_text || "Bắt đầu khảo sát"}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 3. CATEGORIES LIST GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center md:text-left">
          <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight uppercase">
            {settings?.homepage_section_title || "Danh Mục Xe Máy Nổi Bật"}
          </h2>
          <div className="w-20 h-1 bg-brand-red mt-2.5 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.slice(0, 7).map((cat) => (
            <Link 
              key={cat.id} 
              href={`/vehicles?category=${cat.slug}`}
              className="group flex flex-col items-center bg-white border border-brand-border hover:border-brand-red p-4 rounded-xl text-center hover-scale shadow-sm transition-all"
            >
              <div className="w-12 h-12 relative overflow-hidden bg-brand-light rounded-full mb-3 flex items-center justify-center p-2.5">
                <SafeImage 
                  src={cat.image_url || '/demo/categories/xe-tay-ga.svg'}
                  alt={cat.name}
                  width={40}
                  height={40}
                  className="object-cover"
                  fallbackType="logo"
                />
              </div>
              <span className="font-bevietnam font-bold text-xs lg:text-sm text-brand-dark group-hover:text-brand-red transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3.5 INTRODUCTION SECTION (Giới thiệu showroom) */}
      {(settings.intro_content || settings.intro_image) && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-brand-border p-6 md:p-10 rounded-2xl shadow-sm">
            <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-inner border border-gray-100 bg-brand-light">
              <SafeImage
                src={settings.intro_image || '/demo/placeholder-banner.svg'}
                alt="Ken Motor Showroom Intro"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                fallbackType="banner"
              />
            </div>
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded uppercase">
                Về Chúng Tôi
              </span>
              <h2 className="font-bevietnam font-extrabold text-2xl md:text-3xl tracking-tight leading-tight text-brand-dark uppercase">
                Chào mừng bạn đến với Ken Motor
              </h2>
              <div className="w-12 h-1 bg-brand-red"></div>
              <p className="text-brand-gray text-xs md:text-sm leading-relaxed whitespace-pre-line text-justify">
                {settings.intro_content || "Ken Motor tự hào là hệ thống mua bán xe máy mới và cũ uy tín, chất lượng hàng đầu tại tỉnh Đồng Tháp. Chúng tôi không chỉ cung cấp đa dạng các mẫu xe tay ga, xe số, xe côn tay và xe máy điện từ các thương hiệu lớn như Honda, Yamaha, Suzuki, Vespa mà còn đem lại chính sách hỗ trợ trả góp tối ưu và thủ tục nhanh gọn."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. NEW ARRIVALS (Xe Mới Về) */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
            <div>
              <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight">
                Dòng Xe Mới Về
              </h2>
              <p className="text-brand-gray text-xs md:text-sm mt-1">Cập nhật nhanh các mẫu xe máy vừa gia nhập showroom</p>
            </div>
            <Link 
              href="/vehicles?status=new" 
              className="text-brand-red hover:underline font-bold text-sm flex items-center space-x-1"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((vehicle) => {
              const brand = brands.find(b => b.id === vehicle.brand_id);
              return (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  brandName={brand?.name}
                  zaloLink={zaloLink}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* 5. HOT SELLERS (Xe Bán Chạy) */}
      {hotSellers.length > 0 && (
        <section className="bg-brand-dark py-16 lg:py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight">
                  Dòng Xe Bán Chạy Nhất
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Sản phẩm bán chạy được người dùng đánh giá cao và đặt mua nhiều</p>
              </div>
              <Link 
                href="/vehicles?featured=true" 
                className="text-brand-red hover:underline font-bold text-sm flex items-center space-x-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotSellers.map((vehicle) => {
                const brand = brands.find(b => b.id === vehicle.brand_id);
                return (
                  <div key={vehicle.id} className="text-brand-dark">
                    <VehicleCard 
                      vehicle={vehicle} 
                      brandName={brand?.name}
                      zaloLink={zaloLink}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. QUICK COMPARE SELECTOR BOX */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-bevietnam font-extrabold text-2xl md:text-3xl tracking-tight">
            So Sánh Xe Máy Tiện Lợi
          </h2>
          <p className="text-brand-gray text-xs md:text-sm leading-relaxed">
            Chọn hai dòng xe máy bất kỳ trong danh mục để đối chiếu giá bán lẻ, dung tích xi-lanh, và chi tiết thông số kỹ thuật side-by-side.
          </p>
        </div>
        <QuickCompareSelector vehicles={allVehicles} />
      </section>

      {/* 7. HANDPICKED USED VEHICLES (Xe Cũ Tuyển Chọn) */}
      {usedVehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
            <div>
              <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight">
                Xe Máy Cũ Tuyển Chọn
              </h2>
              <p className="text-brand-gray text-xs md:text-sm mt-1">Đầy đủ giấy tờ, máy móc nguyên bản, kiểm định minh bạch 100%</p>
            </div>
            <Link 
              href="/vehicles?category=xe-cu-tuyen-chon" 
              className="text-brand-red hover:underline font-bold text-sm flex items-center space-x-1"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usedVehicles.map((vehicle) => {
              const brand = brands.find(b => b.id === vehicle.brand_id);
              return (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  brandName={brand?.name}
                  zaloLink={zaloLink}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* 8. QUICK INSTALLMENT CALCULATOR & USED VEHICLE VALUATION */}
      <section className="bg-brand-light/40 py-16 border-t border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-bevietnam font-extrabold text-2xl md:text-3xl tracking-tight">
              Ước Tính Chi Phí Trả Góp
            </h2>
            <p className="text-brand-gray text-xs md:text-sm leading-relaxed">
              Công cụ hỗ trợ tính toán khoản tiền vay, số tiền trả góp hàng tháng dựa trên nhu cầu trả trước và kỳ hạn thanh toán (chỉ mang tính tham khảo).
            </p>
          </div>
          
          {/* Live calculator block */}
          <QuickInstallmentCalculator vehicles={allVehicles} />

          {/* Dynamic Installment CTA */}
          <div className="text-center pt-2">
            <Link
              href={settings.cta_installment_link || "/tra-gop"}
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-8 py-3.5 rounded-lg text-sm shadow-lg shadow-brand-red/10 transition-all duration-300"
              style={{ minHeight: '44px' }}
            >
              <span>{settings.cta_installment_text || "Đăng ký trả góp trực tuyến"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Used vehicle trade-in and Test Drive double cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            
            {/* Valuation Old Vehicle */}
            <div className="bg-white border border-brand-border p-8 rounded-xl shadow-sm space-y-4 flex flex-col justify-between hover:border-brand-red transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">Định giá xe cũ</span>
                <h3 className="font-bevietnam font-bold text-lg text-brand-dark">Ký gửi / Bán xe cũ của bạn</h3>
                <p className="text-brand-gray text-xs leading-relaxed">
                  Gửi thông tin đời xe, số km và hình ảnh thực tế. Đội ngũ Ken Motor sẽ thẩm định giá trực tuyến và đề xuất mức giá thu mua cao nhất.
                </p>
              </div>
              <Link
                href="/ban-xe-cu"
                className="w-full md:w-auto text-center bg-brand-dark hover:bg-brand-red text-white font-bold py-3 px-4 rounded transition-colors text-xs inline-flex items-center justify-center space-x-1.5"
                style={{ minHeight: '44px' }}
              >
                <span>Đăng ký bán xe cũ</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Test Drive Card */}
            <div className="bg-white border border-brand-border p-8 rounded-xl shadow-sm space-y-4 flex flex-col justify-between hover:border-brand-red transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">Trải nghiệm thực tế</span>
                <h3 className="font-bevietnam font-bold text-lg text-brand-dark">Đặt lịch lái thử xe miễn phí</h3>
                <p className="text-brand-gray text-xs leading-relaxed">
                  Lựa chọn dòng xe yêu thích (SH, Air Blade, Winner X, Exciter...) và ngày rảnh. Chúng tôi sẽ chuẩn bị sẵn xe để bạn lái thử trải nghiệm tại showroom.
                </p>
              </div>
              <Link
                href="/lai-thu"
                className="w-full md:w-auto text-center bg-brand-dark hover:bg-brand-red text-white font-bold py-3 px-4 rounded transition-colors text-xs inline-flex items-center justify-center space-x-1.5"
                style={{ minHeight: '44px' }}
              >
                <span>Đặt lịch hẹn ngay</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 9. RECENT BLOG POSTS */}
      {recentBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
            <div>
              <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight">
                Kinh Nghiệm Mua Xe Máy
              </h2>
              <p className="text-brand-gray text-xs md:text-sm mt-1">Cập nhật tin tức, đánh giá dòng xe, mẹo bảo dưỡng từ các kỹ sư</p>
            </div>
            <Link 
              href="/blog" 
              className="text-brand-red hover:underline font-bold text-sm flex items-center space-x-1"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((post) => (
              <article key={post.id} className="group flex flex-col bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} className="relative h-48 w-full overflow-hidden block">
                  <SafeImage
                    src={post.image_url || '/demo/placeholder-blog.svg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    fallbackType="blog"
                  />
                </Link>
                <div className="p-5 flex flex-col flex-grow space-y-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors block">
                    <h3 className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-brand-gray text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1 pt-2 mt-auto"
                  >
                    <span>Đọc tiếp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 10. CUSTOMER TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="bg-brand-light/30 py-16 border-t border-b border-brand-border/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <div className="text-center md:text-left">
              <h2 className="font-bevietnam font-extrabold text-2xl md:text-4xl tracking-tight">
                Ý Kiến Khách Hàng
              </h2>
              <div className="w-20 h-1 bg-brand-red mt-2.5 mx-auto md:mx-0"></div>
            </div>

            <TestimonialsSection testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* 11. FAQ ACCORDION SECTION */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-bevietnam font-extrabold text-2xl md:text-3xl tracking-tight">
              Câu Hỏi Thường Gặp (FAQs)
            </h2>
            <div className="w-20 h-1 bg-brand-red mt-2.5 mx-auto"></div>
          </div>

          <FAQSection faqs={faqs} />
        </section>
      )}

    </div>
  );
}
