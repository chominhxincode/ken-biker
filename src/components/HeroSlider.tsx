'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Slider, GeneralSettings } from '@/lib/db/types';

import { safeImageUrl, getFallbackUrl } from '@/lib/image-utils';

interface HeroSliderProps {
  sliders: Slider[];
  settings: GeneralSettings;
}

interface HeroSlideItemProps {
  slide: Slider;
  current: number;
  idx: number;
  settings: GeneralSettings;
}

function HeroSlideItem({ slide, current, idx, settings }: HeroSlideItemProps) {
  const [desktopSrc, setDesktopSrc] = useState(safeImageUrl(slide.image_desktop_url || slide.image_url, 'banner'));
  const [mobileSrc, setMobileSrc] = useState(safeImageUrl(slide.image_mobile_url || slide.image_desktop_url || slide.image_url, 'banner'));

  useEffect(() => {
    setDesktopSrc(safeImageUrl(slide.image_desktop_url || slide.image_url, 'banner'));
    setMobileSrc(safeImageUrl(slide.image_mobile_url || slide.image_desktop_url || slide.image_url, 'banner'));
  }, [slide.image_desktop_url, slide.image_mobile_url, slide.image_url]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
    >
      {/* Dark background dim layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
      
      {/* Desktop Background Image */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={desktopSrc}
          alt={slide.title || 'Banner'}
          fill
          sizes="100vw"
          priority={idx === 0}
          className="object-cover object-center"
          onError={() => setDesktopSrc(getFallbackUrl('banner'))}
        />
      </div>

      {/* Mobile Background Image */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={mobileSrc}
          alt={slide.title || 'Banner'}
          fill
          sizes="100vw"
          priority={idx === 0}
          className="object-cover object-center"
          onError={() => setMobileSrc(getFallbackUrl('banner'))}
        />
      </div>

      {/* Content overlay inside slider container */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full text-white">
          <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-6">
            {slide.subtitle && (
              <span className="inline-block bg-brand-red text-white text-[9px] sm:text-xs font-extrabold tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 rounded uppercase">
                Ken Motor Showroom
              </span>
            )}
            {slide.title && (
              <h1 className="font-bevietnam font-extrabold text-xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-md text-balance uppercase">
                {slide.title}
              </h1>
            )}
            {slide.subtitle && (
              <p className="text-gray-300 text-xs sm:text-sm md:text-lg drop-shadow-md leading-relaxed line-clamp-2 sm:line-clamp-none">
                {slide.subtitle}
              </p>
            )}
            {slide.cta_link && slide.cta_text && (
              <div className="pt-2 sm:pt-4 flex items-center space-x-4">
                <Link
                  href={slide.cta_link}
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-md transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 text-xs sm:text-sm lg:text-base shadow-lg shadow-brand-red/20"
                >
                  <span>{slide.cta_text}</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSlider({ sliders, settings }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter visible sliders
  let activeSliders = (sliders || []).filter(s => s.is_visible !== false);

  // If no sliders are visible or configured, fallback to page settings or standard assets
  if (activeSliders.length === 0) {
    activeSliders = [
      {
        id: 'settings-fallback-hero',
        title: settings.hero_title || 'Ken Motor Showroom',
        subtitle: settings.hero_subtitle || 'Hệ thống mua bán xe máy mới & cũ uy tín hàng đầu Đồng Tháp',
        image_desktop_url: settings.hero_image_desktop || '/demo/placeholder-banner.svg',
        image_mobile_url: settings.hero_image_mobile || settings.hero_image_desktop || '/demo/placeholder-banner.svg',
        cta_text: settings.hero_cta_text || 'Xem xe đang bán',
        cta_link: settings.hero_cta_link || '/vehicles',
        sort_order: 0,
        is_visible: true
      }
    ];
  }

  const total = activeSliders.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // Effect to auto cycle
  useEffect(() => {
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, current, total]);

  return (
    <div className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[85vh] bg-brand-dark overflow-hidden group">
      
      {/* Slides wrapper */}
      <div className="w-full h-full relative">
        {activeSliders.map((slide, idx) => (
          <HeroSlideItem
            key={slide.id}
            slide={slide}
            current={current}
            idx={idx}
            settings={settings}
          />
        ))}
      </div>

      {total > 1 && (
        <>
          {/* Manual Arrow Controls (hover visible) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-brand-red text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-brand-red text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause & Indicators panel */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
            
            {/* Toggle auto-play */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isPlaying ? "Tạm dừng" : "Tự động chạy"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {activeSliders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === current ? 'bg-brand-red w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
