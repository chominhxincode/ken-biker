import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, BookOpen, Calendar, ChevronRight, Clock } from 'lucide-react';
import db from '@/lib/db';
import SafeImage from '@/components/SafeImage';

export const metadata: Metadata = {
  title: 'Tin Tức & Kinh Nghiệm Xe Máy | Ken Motor Showroom',
  description: 'Chuyên mục chia sẻ kinh nghiệm mua xe máy cũ, mẹo lựa chọn xe máy tiết kiệm nhiên liệu, thủ tục mua xe trả góp và hướng dẫn tự bảo dưỡng xe máy tại nhà từ các kỹ sư Ken Motor.',
};

export const revalidate = 0; // Fresh content lookup

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '20/06/2026';
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  } catch {
    return '20/06/2026';
  }
};

export default async function BlogPage() {
  const posts = await db.getPosts({ isVisibleOnly: true }).catch(() => []);

  // Find the featured post (fallback to first post if no featured is flagged)
  const featuredPost = posts.find(p => p.is_featured) || posts[0];
  const gridPosts = featuredPost ? posts.filter(p => p.id !== featuredPost.id) : posts;

  return (
    <div className="bg-brand-light/30 min-h-screen pb-16">
      
      {/* 1. LUXURY HERO BANNER */}
      <section className="relative bg-brand-dark text-white py-16 lg:py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4 text-center">
          <span className="inline-block bg-brand-red text-white text-[10px] lg:text-xs font-extrabold tracking-widest px-3 py-1 rounded uppercase">
            Tin Tức & Đánh Giá
          </span>
          <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-white tracking-tight leading-none uppercase">
            Tin Tức & Kinh Nghiệm Xe Máy
          </h1>
          <p className="text-gray-400 text-xs lg:text-base max-w-2xl mx-auto leading-relaxed">
            Nơi chia sẻ kinh nghiệm mua xe máy, cập nhật xu hướng thị trường xe máy mới nhất và hướng dẫn bảo dưỡng xe từ các kỹ thuật viên Ken Motor.
          </p>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-2"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
          <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
            <span>Trang chủ</span>
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-semibold">Tin tức & Kinh nghiệm</span>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-20 text-center shadow-sm max-w-4xl mx-auto">
            <BookOpen className="w-16 h-16 text-brand-gray mx-auto mb-4" />
            <h2 className="font-bevietnam font-bold text-lg text-brand-dark">Chưa có bài viết nào</h2>
            <p className="text-brand-gray text-sm mt-1">Nội dung đang được ban biên tập Ken Motor cập nhật liên tục.</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 2. FEATURED HERO POST (Largest card on top) */}
            {featuredPost && (
              <section className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <Link 
                    href={`/blog/${featuredPost.slug}`} 
                    className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full min-h-[300px] lg:min-h-[460px] overflow-hidden block"
                  >
                    <SafeImage
                      src={featuredPost.image_url || '/demo/placeholder-blog.svg'}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                      priority
                      fallbackType="blog"
                    />
                    <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded tracking-wider shadow">
                      Nổi bật
                    </div>
                  </Link>

                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="flex items-center space-x-4 text-xs text-brand-gray font-bold uppercase tracking-wider">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-brand-red" />
                        <span>{formatDate(featuredPost.created_at)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Tác giả: Ken Motor</span>
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-brand-red transition-colors block">
                        <h2 className="font-bevietnam font-extrabold text-2xl lg:text-3xl text-brand-dark leading-tight uppercase">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      <p className="text-brand-gray text-sm leading-relaxed line-clamp-4">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredPost.tags.slice(0, 4).map((tag, tIdx) => (
                          <span key={tIdx} className="bg-brand-light text-brand-dark text-[10px] font-semibold px-2 py-0.5 rounded border border-brand-border">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <Link 
                        href={`/blog/${featuredPost.slug}`}
                        className="bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-6 py-3 rounded-lg tracking-wider transition-all inline-flex items-center space-x-2 text-xs lg:text-sm shadow-md shadow-brand-red/10"
                        style={{ minHeight: '44px' }}
                      >
                        <span>Đọc tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 3. SUBSEQUENT POSTS GRID */}
            {gridPosts.length > 0 && (
              <section className="space-y-8">
                <div className="border-b border-brand-border pb-4">
                  <h3 className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-dark tracking-tight uppercase">
                    Bài viết cẩm nang khác
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="group flex flex-col bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] w-full overflow-hidden block">
                        <SafeImage
                          src={post.image_url || '/demo/placeholder-blog.svg'}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-550"
                          loading="lazy"
                          fallbackType="blog"
                        />
                        {post.tags && post.tags.length > 0 && (
                          <div className="absolute bottom-3 left-3 bg-brand-dark/85 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-white/10">
                            {post.tags[0]}
                          </div>
                        )}
                      </Link>
                      <div className="p-6 flex flex-col flex-grow space-y-3 justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-[10px] font-bold text-brand-gray uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5 text-brand-red" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors block">
                            <h4 className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark line-clamp-2 leading-snug uppercase">
                              {post.title}
                            </h4>
                          </Link>
                          <p className="text-brand-gray text-xs leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                          <span className="text-[10px] text-brand-gray font-semibold">Tác giả: Ken Motor</span>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-xs font-extrabold text-brand-red hover:underline inline-flex items-center space-x-1"
                          >
                            <span>Đọc tiếp</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
