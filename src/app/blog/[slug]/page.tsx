import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, BookOpen, ChevronRight, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import db from '@/lib/db';
import SafeImage from '@/components/SafeImage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await db.getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.seo_title || post.title} | Ken Motor Cẩm Nang`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      images: [{ url: post.image_url || '' }]
    }
  };
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '20/06/2026';
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  } catch {
    return '20/06/2026';
  }
};

// Basic HTML sanitization function
function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
    .replace(/href="javascript:[^"]*"/gi, '#')
    .replace(/href='javascript:[^']*'/gi, '#');
}

// Markdown blocks parsing function
function parseMarkdownBlocks(md: string): string {
  if (!md) return '';
  
  const blocks = md.split(/\n\n+/);
  const parsedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    
    // Headers
    if (trimmed.startsWith('# ')) {
      return `<h1>${parseInlineMarkdown(trimmed.substring(2))}</h1>`;
    }
    if (trimmed.startsWith('## ')) {
      return `<h2>${parseInlineMarkdown(trimmed.substring(3))}</h2>`;
    }
    if (trimmed.startsWith('### ')) {
      return `<h3>${parseInlineMarkdown(trimmed.substring(4))}</h3>`;
    }
    
    // Blockquote
    if (trimmed.startsWith('>')) {
      const lines = trimmed.split('\n').map(l => l.replace(/^>\s?/, '')).join('<br/>');
      return `<blockquote>${parseInlineMarkdown(lines)}</blockquote>`;
    }
    
    // Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n').map(item => {
        const content = item.replace(/^[\-\*]\s?/, '');
        return `<li>${parseInlineMarkdown(content)}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').map(item => {
        const content = item.replace(/^\d+\.\s?/, '');
        return `<li>${parseInlineMarkdown(content)}</li>`;
      }).join('');
      return `<ol>${items}</ol>`;
    }
    
    // Tables
    if (trimmed.startsWith('|')) {
      const rows = trimmed.split('\n');
      const tableRows = rows.map((row, rIdx) => {
        const cols = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cols.length === 0) return '';
        if (cols.every(c => /^:\-+:|^\-+:|^\-+|:\-+$/.test(c))) return '';
        
        const cellTag = rIdx === 0 ? 'th' : 'td';
        const cells = cols.map(c => `<${cellTag}>${parseInlineMarkdown(c)}</${cellTag}>`).join('');
        return `<tr>${cells}</tr>`;
      }).filter(Boolean).join('');
      
      return `<div class="overflow-x-auto"><table>${tableRows}</table></div>`;
    }
    
    // Inline Images / Block Images
    if (/^!\[(.*?)\]\((.*?)\)$/.test(trimmed)) {
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return `<img src="${match[2]}" alt="${match[1]}" />`;
      }
    }
    
    // Paragraph
    const paraLines = trimmed.split('\n').join('<br/>');
    return `<p>${parseInlineMarkdown(paraLines)}</p>`;
  });
  
  return parsedBlocks.filter(Boolean).join('\n');
}

function parseInlineMarkdown(text: string): string {
  let result = text;
  
  result = result
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '');
    
  result = result.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/__(.*?)__/g, '<strong>$1</strong>');
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  result = result.replace(/_(.*?)_/g, '<em>$1</em>');
  
  return result;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await db.getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Fetch settings & other details
  const [settings, allPosts] = await Promise.all([
    db.getSettings().catch(() => ({} as any)),
    db.getPosts({ isVisibleOnly: true }).catch(() => [])
  ]);

  const hotline = settings.hotline || '0787990047';
  const zaloLink = settings.zalo_link || 'https://zalo.me/0787990047';

  // Fetch related posts (exclude current)
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  // Get raw layout ready clean HTML content
  let contentHtml = '';
  if (post.content_type === 'html') {
    contentHtml = sanitizeHtml(post.content_html || post.content || '');
  } else {
    contentHtml = parseMarkdownBlocks(post.content_markdown || post.content || '');
  }

  return (
    <div className="bg-brand-light/30 min-h-screen pb-16">
      
      {/* 1. COVER PHOTO AND TITLE CONTAINER */}
      <div className="bg-white border-b border-brand-border">
        {/* Cover Photo */}
        <div className="relative h-64 md:h-[480px] w-full bg-brand-dark">
          <SafeImage
            src={post.image_url || '/demo/placeholder-blog.svg'}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-85"
            fallbackType="blog"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 font-bold uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4.5 h-4.5 text-brand-red" />
                  <span>{formatDate(post.created_at)}</span>
                </span>
                <span>•</span>
                <span>Tác giả: Ken Motor</span>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="bg-brand-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wide">
                      {post.tags[0]}
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-bevietnam font-extrabold text-2xl md:text-5xl text-white tracking-tight leading-tight uppercase drop-shadow-md">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
          <Link href="/blog" className="hover:text-brand-red flex items-center space-x-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Danh sách bài viết</span>
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-semibold truncate max-w-xs">{post.title}</span>
        </div>

        {/* 2. MAIN EDITORIAL ARTICLE CONTENT */}
        <article className="bg-white border border-brand-border rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          
          {/* Main typography container */}
          <div 
            className="blog-content" 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />

          {/* Tags list */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-brand-border/60 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">Tags:</span>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-brand-light text-brand-dark text-xs px-2.5 py-1 rounded border border-brand-border">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 3. CTA BOTTOM BANNER (Showroom luxury contact details) */}
          <div className="border-t border-brand-border pt-8 bg-brand-light/40 rounded-xl p-6 space-y-6">
            <div className="text-center md:text-left space-y-2">
              <h3 className="font-bevietnam font-extrabold text-lg text-brand-dark">Bạn Đang Quan Tâm Đến Các Dòng Xe Tại Ken Motor?</h3>
              <p className="text-brand-gray text-xs leading-relaxed">
                Liên hệ ngay với đội ngũ hỗ trợ trực tuyến để được tư vấn thông tin chi tiết, báo giá lăn bánh, lái thử thực tế và các chương trình ưu đãi trả góp.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${hotline}`}
                className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 px-6 rounded-lg text-center flex items-center justify-center space-x-2 text-sm tracking-wide shadow-md shadow-brand-red/10 cursor-pointer"
                style={{ minHeight: '44px' }}
              >
                <Phone className="w-4.5 h-4.5" />
                <span>Gọi Hotline: {hotline}</span>
              </a>
              <a 
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white border border-brand-border hover:border-brand-dark text-brand-dark font-bevietnam font-extrabold py-3.5 px-6 rounded-lg text-center flex items-center justify-center space-x-2 text-sm tracking-wide cursor-pointer"
                style={{ minHeight: '44px' }}
              >
                <MessageCircle className="w-4.5 h-4.5 text-blue-500" />
                <span>Nhắn tin Zalo</span>
              </a>
              <Link 
                href="/vehicles"
                className="flex-1 bg-brand-dark hover:bg-brand-dark/95 text-white font-bevietnam font-extrabold py-3.5 px-6 rounded-lg text-center flex items-center justify-center space-x-1.5 text-sm tracking-wide cursor-pointer"
                style={{ minHeight: '44px' }}
              >
                <span>Xem xe đang bán</span>
                <ArrowUpRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

        </article>

        {/* 4. RELATED ARTICLES LIST */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-brand-border">
            <h3 className="font-bevietnam font-bold text-lg lg:text-xl text-brand-dark tracking-tight uppercase">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div key={rPost.id} className="group bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow shadow-sm flex flex-col">
                  <Link href={`/blog/${rPost.slug}`} className="relative aspect-[16/10] w-full overflow-hidden block">
                    <SafeImage
                      src={rPost.image_url || '/demo/placeholder-blog.svg'}
                      alt={rPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackType="blog"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] text-brand-gray font-mono">{formatDate(rPost.created_at)}</span>
                      <Link href={`/blog/${rPost.slug}`} className="hover:text-brand-red font-bold text-xs lg:text-sm text-brand-dark line-clamp-2 leading-snug">
                        {rPost.title}
                      </Link>
                    </div>
                    <Link 
                      href={`/blog/${rPost.slug}`}
                      className="text-[10px] font-bold text-brand-red hover:underline inline-flex items-center space-x-1 mt-auto"
                    >
                      <span>Đọc tiếp</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
