'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardList, RefreshCw, CalendarRange, Car, MessageSquare, 
  TrendingUp, Clock, CheckCircle2, ChevronRight, Phone, Calendar
} from 'lucide-react';
import db, { isSupabaseMode } from '@/lib/db';
import { QuoteRequest, InstallmentRequest, SellVehicleRequest, TestDriveRequest } from '@/lib/db/types';

interface Stats {
  totalVehicles: number;
  totalQuotes: number;
  totalInstallments: number;
  totalSells: number;
  totalTestDrives: number;
  totalContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [latestQuotes, setLatestQuotes] = useState<QuoteRequest[]>([]);
  const [latestInstallments, setLatestInstallments] = useState<InstallmentRequest[]>([]);
  const [latestSells, setLatestSells] = useState<SellVehicleRequest[]>([]);
  const [latestTestDrives, setLatestTestDrives] = useState<TestDriveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Combine and sort all recent requests for the feed
  const [recentFeed, setRecentFeed] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const s = await db.getAdminStats();
      setStats(s);

      const [quotes, installments, sells, testDrives] = await Promise.all([
        db.getQuoteRequests(),
        db.getInstallmentRequests(),
        db.getSellVehicleRequests(),
        db.getTestDriveRequests(),
      ]);

      setLatestQuotes(quotes.slice(0, 5));
      setLatestInstallments(installments.slice(0, 5));
      setLatestSells(sells.slice(0, 5));
      setLatestTestDrives(testDrives.slice(0, 5));

      // Combine feed items
      const feedItems: any[] = [
        ...quotes.map(q => ({ ...q, feedType: 'quote', title: 'Yêu cầu Báo giá' })),
        ...installments.map(i => ({ ...i, feedType: 'installment', title: 'Yêu cầu Trả góp' })),
        ...sells.map(s => ({ ...s, feedType: 'sell', title: 'Thu mua Xe cũ' })),
        ...testDrives.map(t => ({ ...t, feedType: 'testdrive', title: 'Đăng ký Lái thử' }))
      ];

      // Sort by date descending
      feedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentFeed(feedItems.slice(0, 8));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">Chờ xử lý</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Đã liên hệ</span>;
      case 'Consulting':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Đang tư vấn</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Thành công</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Đã hủy</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full">{status}</span>;
    }
  };

  const getFeedLink = (type: string) => {
    switch (type) {
      case 'quote': return '/admin/quotes';
      case 'installment': return '/admin/installments';
      case 'sell': return '/admin/sells';
      case 'testdrive': return '/admin/test-drives';
      default: return '/admin';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
        <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải dữ liệu dashboard...</span>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Quản lý Xe máy',
      value: stats?.totalVehicles || 0,
      icon: Car,
      color: 'from-blue-600 to-indigo-700',
      link: '/admin/vehicles',
      desc: 'xe trong showroom'
    },
    {
      title: 'Yêu cầu Báo Giá',
      value: stats?.totalQuotes || 0,
      icon: ClipboardList,
      color: 'from-amber-500 to-orange-600',
      link: '/admin/quotes',
      desc: 'lượt hỏi giá báo'
    },
    {
      title: 'Đăng ký Trả Góp',
      value: stats?.totalInstallments || 0,
      icon: RefreshCw,
      color: 'from-purple-600 to-pink-600',
      link: '/admin/installments',
      desc: 'hồ sơ tính toán trả góp'
    },
    {
      title: 'Thu Mua Xe Cũ',
      value: stats?.totalSells || 0,
      icon: CalendarRange,
      color: 'from-emerald-600 to-teal-600',
      link: '/admin/sells',
      desc: 'xe ký gửi bán lại'
    },
    {
      title: 'Hẹn Lịch Lái Thử',
      value: stats?.totalTestDrives || 0,
      icon: Clock,
      color: 'from-rose-600 to-red-700',
      link: '/admin/test-drives',
      desc: 'lịch hẹn đăng ký'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Title section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
            Hệ thống Quản Trị
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Tổng quan hiệu suất hoạt động & theo dõi phản hồi khách hàng Ken Motor.
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center space-x-2 bg-brand-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-white/10 hover:bg-brand-red transition-all cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <RefreshCw className="w-4 h-4 shrink-0" />
          <span>Tải lại số liệu</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link 
              key={idx} 
              href={card.link}
              className="bg-white rounded-xl shadow-sm border border-gray-150 p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">{card.title}</span>
                  <span className="text-3xl font-extrabold font-bevietnam tracking-tight text-brand-dark">{card.value}</span>
                </div>
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-sm shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-brand-gray">
                <span>{card.desc}</span>
                <span className="text-brand-red font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                  Quản lý <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Live Feed & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Combined Live Requests Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden lg:col-span-2">
          <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-gray-50">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-dark">
                Yêu cầu Khách Hàng Gần Đây
              </h3>
            </div>
            <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Thời gian thực
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {recentFeed.length === 0 ? (
              <div className="p-10 text-center text-brand-gray text-xs">
                Chưa có yêu cầu nào được gửi đến hệ thống.
              </div>
            ) : (
              recentFeed.map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <span className="font-bold text-xs text-brand-dark font-bevietnam">
                        {item.name}
                      </span>
                      <span className="text-[10px] bg-brand-light text-brand-dark px-2 py-0.5 rounded font-bold border border-gray-250">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-brand-gray flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-gray/60" />
                        <span>{formatDate(item.created_at)}</span>
                      </span>
                    </div>

                    <div className="text-xs text-brand-gray space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3 h-3 text-brand-gray/60" />
                        <a href={`tel:${item.phone}`} className="hover:underline font-mono text-brand-dark">{item.phone}</a>
                      </div>
                      {item.notes && (
                        <p className="italic text-gray-500 line-clamp-1">Ghi chú: "{item.notes}"</p>
                      )}
                      {item.status_description && (
                        <p className="italic text-gray-500 line-clamp-1">Tình trạng xe: "{item.status_description}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-stretch md:self-auto justify-between md:justify-end shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-gray-100">
                    <div>{getStatusBadge(item.status)}</div>
                    <Link 
                      href={getFeedLink(item.feedType)} 
                      className="p-1.5 hover:bg-brand-red/10 text-brand-gray hover:text-brand-red rounded transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links / Helper Cards */}
        <div className="space-y-6">
          {/* Quick System Check card */}
          <div className="bg-brand-dark text-white rounded-xl p-6 shadow-sm border border-white/5 space-y-4">
            <h4 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-3">
              Trạng Thái Hệ Thống
            </h4>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Database Engine:</span>
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                  {isSupabaseMode ? 'Supabase Production' : 'Local Demo Engine'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Chế độ kết nối:</span>
                <span className="text-xs font-bold text-emerald-400">ONLINE ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Cơ chế lưu trữ ảnh:</span>
                <span className="text-xs font-bold text-gray-200">
                  {isSupabaseMode ? 'Supabase Storage' : 'Base64 LocalFallback'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400 leading-relaxed">
              Hệ thống đang hoạt động ổn định. Để cấu hình thông tin hiển thị trên website chính thức (như Hotline, Zalo, Mã nhúng Google Maps), vui lòng truy cập mục <strong>Cấu hình Website</strong>.
            </div>

            <Link 
              href="/admin/settings"
              className="block w-full text-center bg-white/10 hover:bg-brand-red text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
              style={{ minHeight: '40px' }}
            >
              Cấu hình ngay
            </Link>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-5 space-y-4">
            <h4 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-dark border-b border-gray-100 pb-3">
              Thao tác Nhanh
            </h4>

            <div className="grid grid-cols-2 gap-3.5">
              <Link 
                href="/admin/vehicles?action=new" 
                className="flex flex-col items-center justify-center p-4 bg-brand-light rounded-lg border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-center space-y-1.5 group cursor-pointer"
              >
                <Car className="w-5 h-5 text-brand-dark group-hover:text-brand-red transition-colors" />
                <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider">Đăng bán xe mới</span>
              </Link>

              <Link 
                href="/admin/blog?action=new" 
                className="flex flex-col items-center justify-center p-4 bg-brand-light rounded-lg border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-center space-y-1.5 group cursor-pointer"
              >
                <ClipboardList className="w-5 h-5 text-brand-dark group-hover:text-brand-red transition-colors" />
                <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider">Viết bài blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
