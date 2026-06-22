'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Motorbike, Tags, Layers, FileText, Image as ImageIcon, 
  HelpCircle, Settings, LogOut, Lock, Mail, Key, UserCheck, Menu, X, ClipboardList,
  RefreshCw, CalendarRange, Sparkles, MessageSquare
} from 'lucide-react';
import db, { isSupabaseMode } from '@/lib/db';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const checkUser = async () => {
    try {
      const u = await db.getCurrentUser();
      setUser(u);
    } catch (e) {
      console.error('Error fetching admin session:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const { user: u, error } = await db.login(email.trim(), password.trim());
      if (error) {
        setLoginError(error);
      } else {
        setUser(u);
        router.refresh();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Đã xảy ra lỗi đăng nhập hệ thống.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await db.logout();
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push('/admin');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Quản lý xe máy', href: '/admin/vehicles', icon: Motorbike },
    { name: 'Hãng xe', href: '/admin/brands', icon: Tags },
    { name: 'Danh mục dòng', href: '/admin/categories', icon: Layers },
    { name: 'Bài viết Blog', href: '/admin/blog', icon: FileText },
    { name: 'Banners Slider', href: '/admin/sliders', icon: ImageIcon },
    { name: 'Yêu cầu Báo Giá', href: '/admin/quotes', icon: ClipboardList },
    { name: 'Yêu cầu Trả Góp', href: '/admin/installments', icon: RefreshCw },
    { name: 'Thu Mua Xe Cũ', href: '/admin/sells', icon: CalendarRange },
    { name: 'Lịch Hẹn Lái Thử', href: '/admin/test-drives', icon: ClipboardList },
    { name: 'Cấu hình Website', href: '/admin/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] bg-brand-light">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-red mb-3"></div>
        <span className="text-xs text-brand-gray font-semibold uppercase tracking-wider">Đang kiểm tra quyền truy cập...</span>
      </div>
    );
  }

  // 1. IF NOT LOGGED IN - Show Luxury Showroom Login View
  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center py-16 px-4 bg-brand-light">
        <div className="w-full max-w-md bg-brand-dark text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Header */}
          <div className="p-8 text-center bg-black/40 border-b border-white/5 space-y-3">
            <span className="inline-block bg-brand-red text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded uppercase">
              {isSupabaseMode ? 'Supabase Secure Mode' : 'Demo Mode (Local)'}
            </span>
            <h2 className="font-bevietnam font-extrabold text-2xl tracking-tight text-white uppercase">
              Admin Portal
            </h2>
            <p className="text-gray-400 text-xs">Hãy nhập thông tin đăng nhập hệ thống Ken Motor</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="p-8 space-y-5">
            {loginError && (
              <div className="bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-semibold p-3.5 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {!isSupabaseMode && (
              <div className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[11px] p-3 rounded-lg leading-relaxed">
                <strong>Thông tin đăng nhập Demo:</strong><br />
                Email: <span className="font-mono select-all">admin@kenmotor.vn</span><br />
                Mật khẩu: <span className="font-mono select-all">admin123</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Địa chỉ email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kenmotor.vn"
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-red rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none text-white placeholder-gray-600"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mật khẩu</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-red rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none text-white placeholder-gray-600"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-lg shadow-brand-red/10"
              style={{ minHeight: '44px' }}
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN - Show Split Admin dashboard layouts
  return (
    <div className="flex-grow flex flex-col lg:flex-row bg-brand-light min-h-[80vh]">
      
      {/* Mobile Top Header (Nav trigger) */}
      <div className="lg:hidden bg-brand-dark text-white p-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-2">
          <span className="font-bevietnam font-extrabold text-sm tracking-wider uppercase">
            Admin<span className="text-brand-red">CMS</span>
          </span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`w-full lg:w-64 bg-brand-dark text-white shrink-0 border-r border-white/5 lg:flex lg:flex-col transition-all duration-300 ${
        isMobileMenuOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* User profile brief */}
        <div className="p-6 bg-black/40 border-b border-white/5 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-gray-400 block tracking-wider uppercase">Đã đăng nhập</span>
            <span className="text-xs font-semibold block text-white truncate max-w-[150px]">{user.email}</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isAct = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                  isAct 
                    ? 'bg-brand-red text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold text-gray-400 hover:bg-brand-red hover:text-white transition-all w-full uppercase tracking-wider"
            style={{ minHeight: '44px' }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 lg:p-10 max-w-full overflow-x-auto">
        {children}
      </main>

    </div>
  );
}

// Simple internal icon warning wrapper to solve TS issues
function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
