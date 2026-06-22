'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { HelpCircle, ChevronRight, ChevronLeft, RefreshCw, Star, Info, MessageCircle, Phone, ShoppingCart } from 'lucide-react';
import { Vehicle, Brand } from '@/lib/db/types';
import { useCart } from '@/context/CartContext';
import VehicleCard from './VehicleCard';

interface AdvisoryToolProps {
  vehicles: Vehicle[];
  brands: Brand[];
  zaloLink: string;
  hotline: string;
}

export default function AdvisoryTool({ vehicles, brands, zaloLink, hotline }: AdvisoryToolProps) {
  const { addToCart, cart } = useCart();
  const [step, setStep] = useState(1);

  // Quiz States
  const [budget, setBudget] = useState<string>(''); // under_25, 25_50, 50_100, over_100
  const [usage, setUsage] = useState<string>(''); // work, study, service, tour, fuel
  const [style, setStyle] = useState<string>(''); // xe-tay-ga, xe-so, xe-con-tay, xe-dien, xe-phan-khoi-lon
  const [height, setHeight] = useState<string>(''); // under_1m55, 1m55_1m70, over_1m70

  // Results State
  const [matches, setMatches] = useState<{ vehicle: Vehicle; reason: string }[]>([]);
  const [alternatives, setAlternatives] = useState<Vehicle[]>([]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);
  
  const handleReset = () => {
    setBudget('');
    setUsage('');
    setStyle('');
    setHeight('');
    setStep(1);
    setMatches([]);
    setAlternatives([]);
  };

  // Run Rule Engine
  const evaluateRules = () => {
    let filtered = [...vehicles].filter(v => !v.is_sold && v.is_visible);

    // 1. Budget Rule
    if (budget === 'under_25') {
      filtered = filtered.filter(v => v.price < 25000000);
    } else if (budget === '25_50') {
      filtered = filtered.filter(v => v.price >= 25000000 && v.price <= 50000000);
    } else if (budget === '50_100') {
      filtered = filtered.filter(v => v.price > 50000000 && v.price <= 100000000);
    } else if (budget === 'over_100') {
      filtered = filtered.filter(v => v.price > 100000000);
    }

    // 2. Style Rule
    if (style) {
      // Map categories
      filtered = filtered.filter(v => {
        // Handle categories
        if (style === 'xe-tay-ga') return v.category_id === 'category-1' || v.name.toLowerCase().includes('vision') || v.name.toLowerCase().includes('sh') || v.name.toLowerCase().includes('lead') || v.name.toLowerCase().includes('grande') || v.name.toLowerCase().includes('janus') || v.name.toLowerCase().includes('nvx');
        if (style === 'xe-so') return v.name.toLowerCase().includes('wave') || v.name.toLowerCase().includes('sirius') || v.name.toLowerCase().includes('future') || v.name.toLowerCase().includes('elegant');
        if (style === 'xe-con-tay') return v.name.toLowerCase().includes('winner') || v.name.toLowerCase().includes('exciter') || v.name.toLowerCase().includes('raider') || v.name.toLowerCase().includes('satria');
        if (style === 'xe-dien') return v.engine_capacity?.toLowerCase().includes('điện') || v.name.toLowerCase().includes('evo') || v.name.toLowerCase().includes('feliz') || v.name.toLowerCase().includes('klara') || v.name.toLowerCase().includes('vento') || v.name.toLowerCase().includes('theon');
        if (style === 'xe-phan-khoi-lon') return v.price > 120000000 || v.engine_capacity?.toLowerCase().includes('cc') && parseInt(v.engine_capacity) >= 250;
        return true;
      });
    }

    // 3. Height Rule (checking seat heights in specs)
    if (height) {
      filtered = filtered.filter(v => {
        const seatHeightStr = v.specs_json['Độ cao yên'] || v.specs_json['Chiều cao yên'];
        if (!seatHeightStr) return true; // Pass if spec is not specified
        const seatHeight = parseInt(seatHeightStr);
        if (isNaN(seatHeight)) return true;

        if (height === 'under_1m55') {
          return seatHeight <= 765;
        } else if (height === '1m55_1m70') {
          return seatHeight <= 790;
        }
        return true; // over 1m70 can ride anything
      });
    }

    // 4. Usage Rules & Rationale
    const scoredMatches = filtered.map(v => {
      let score = 0;
      let reasons: string[] = [];

      // Check if price fits budget
      reasons.push(`Giá bán ${v.promo_price ? v.promo_price.toLocaleString() : v.price.toLocaleString()}đ phù hợp với tài chính của bạn.`);

      // Height check
      const seatHeight = v.specs_json['Độ cao yên'] || v.specs_json['Chiều cao yên'];
      if (seatHeight) {
        reasons.push(`Chiều cao yên ${seatHeight} thoải mái, tôn vóc dáng lái xe của bạn.`);
      }

      // Usage specific score modifiers and reasons
      if (usage === 'study') {
        if (v.price < 35000000 && (v.is_new || !v.is_new)) {
          score += 2;
        }
        if (v.name.toLowerCase().includes('evo200') || v.name.toLowerCase().includes('lite') || v.name.toLowerCase().includes('50cc')) {
          score += 5;
          reasons.push("Mẫu xe dung tích 50cc hoặc xe điện nhẹ nhàng, KHÔNG cần bằng lái xe cho học sinh.");
        }
      } else if (usage === 'fuel') {
        const consumption = v.fuel_consumption;
        if (consumption && parseFloat(consumption) <= 2.0) {
          score += 4;
          reasons.push(`Động cơ siêu tiết kiệm nhiên liệu (${consumption}), giúp bạn tiết kiệm tối đa chi phí vận hành.`);
        }
      } else if (usage === 'service') {
        if (v.name.toLowerCase().includes('wave') || v.name.toLowerCase().includes('sirius') || v.name.toLowerCase().includes('evo')) {
          score += 5;
          reasons.push("Dòng xe số / xe điện siêu bền bỉ, dễ bảo dưỡng thay phụ tùng, phù hợp chạy dịch vụ công nghệ.");
        }
      } else if (usage === 'tour') {
        if (v.name.toLowerCase().includes('winner') || v.name.toLowerCase().includes('exciter') || v.price > 100000000) {
          score += 5;
          reasons.push("Động cơ côn tay / phân khối lớn khỏe khoắn, phuộc đầm, an tâm chinh phục các cung đường phượt xa.");
        }
      }

      return {
        vehicle: v,
        score,
        reason: reasons.join(' ')
      };
    });

    // Sort by suitability score desc
    scoredMatches.sort((a, b) => b.score - a.score);

    // Pick top 3 matches
    const topMatches = scoredMatches.slice(0, 3);
    setMatches(topMatches);

    // Pick alternatives (other bikes that match budget but didn't make top 3)
    const topIds = topMatches.map(m => m.vehicle.id);
    const altBikes = vehicles
      .filter(v => !v.is_sold && !topIds.includes(v.id) && (budget ? (budget === 'under_25' ? v.price < 25000000 : budget === '25_50' ? v.price >= 25000000 && v.price <= 50000000 : budget === '50_100' ? v.price > 50000000 && v.price <= 100000000 : v.price > 100000000) : true))
      .slice(0, 4);
    setAlternatives(altBikes);
    setStep(5);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-brand-border rounded-2xl p-6 lg:p-8 shadow-sm">
      
      {/* Wizard Progress Header */}
      {step < 5 && (
        <div className="mb-8 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-brand-gray uppercase tracking-wider">
            <span>Câu hỏi {step} / 4</span>
            <span>Hoàn thành {Math.round(((step - 1) / 4) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-brand-light rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-red transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* STEP 1: BUDGET */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <HelpCircle className="w-12 h-12 text-brand-red mx-auto" />
            <h2 className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-dark">Ngân sách của bạn khoảng bao nhiêu?</h2>
            <p className="text-brand-gray text-xs lg:text-sm">Hãy chọn mức giá dự kiến để chúng tôi giới hạn xe phù hợp tài chính</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              { id: 'under_25', title: 'Dưới 25 Triệu', desc: 'Các dòng xe số kinh tế, xe điện học sinh.' },
              { id: '25_50', title: 'Từ 25 - 50 Triệu', desc: 'Vision, Air Blade, Sirius FI, Exciter, Evo200.' },
              { id: '50_100', title: 'Từ 50 - 100 Triệu', desc: 'SH Mode, SH 125i, Vespa Sprint, Liberty, PKL nhỏ.' },
              { id: 'over_100', title: 'Trên 100 Triệu', desc: 'SH 160i/350i, xe phân khối lớn Ducati, Kawasaki, KTM.' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => { setBudget(opt.id); handleNext(); }}
                className={`text-left p-5 border rounded-xl hover:border-brand-red transition-all ${
                  budget === opt.id ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' : 'border-brand-border'
                }`}
                style={{ minHeight: '80px' }}
              >
                <span className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark block">{opt.title}</span>
                <span className="text-xs text-brand-gray mt-1 block">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: USAGE PURPOSE */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <HelpCircle className="w-12 h-12 text-brand-red mx-auto" />
            <h2 className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-dark">Mục đích sử dụng chính là gì?</h2>
            <p className="text-brand-gray text-xs lg:text-sm">Chúng tôi sẽ chấm điểm xe phù hợp đặc tính vận hành mong muốn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              { id: 'work', title: 'Đi làm công sở', desc: 'Xe tay ga thời trang, lịch sự, cốp rộng để đồ.' },
              { id: 'study', title: 'Đi học (Học sinh / Sinh viên)', desc: 'Tiêu chí gọn nhẹ, dễ đi, không cần bằng lái (50cc, xe điện).' },
              { id: 'service', title: 'Chạy dịch vụ / Giao hàng', desc: 'Xe số siêu bền, ít hao xăng, phụ tùng rẻ.' },
              { id: 'tour', title: 'Đi phượt / Đi tour đi xa', desc: 'Xe côn tay thể thao hoặc PKL đầm chắc mạnh mẽ.' },
              { id: 'fuel', title: 'Tiết kiệm xăng hàng đầu', desc: 'Lọc các dòng xe Blue Core, Fi phun xăng điện tử cực lợi xăng.' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => { setUsage(opt.id); handleNext(); }}
                className={`text-left p-5 border rounded-xl hover:border-brand-red transition-all ${
                  usage === opt.id ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' : 'border-brand-border'
                }`}
                style={{ minHeight: '80px' }}
              >
                <span className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark block">{opt.title}</span>
                <span className="text-xs text-brand-gray mt-1 block">{opt.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t border-brand-border/40">
            <button 
              onClick={handlePrev}
              className="flex items-center space-x-1 text-xs font-bold text-brand-gray hover:text-brand-dark"
              style={{ minHeight: '44px' }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREFERRED STYLE */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <HelpCircle className="w-12 h-12 text-brand-red mx-auto" />
            <h2 className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-dark">Kiểu dáng xe yêu thích?</h2>
            <p className="text-brand-gray text-xs lg:text-sm">Bạn ưa chuộng xe tay ga, xe số hay naked/sport côn tay?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              { id: 'xe-tay-ga', title: 'Xe Tay Ga (Scooter)', desc: 'Thoải mái, sang trọng, cốp xe lớn đựng đồ.' },
              { id: 'xe-so', title: 'Xe Số (Underbone)', desc: 'Bền bỉ, gọn nhẹ, leo dốc khỏe, giá kinh tế.' },
              { id: 'xe-con-tay', title: 'Xe Côn Tay (Clutch)', desc: 'Thể thao năng động, kiểm soát lực kéo chủ động.' },
              { id: 'xe-dien', title: 'Xe Máy Điện (Electric)', desc: 'Hiện đại, bảo vệ môi trường, không tốn tiền xăng.' },
              { id: 'xe-phan-khoi-lon', title: 'Xe Phân Khối Lớn (PKL)', desc: 'Cruiser, Superbike, Adventure đầy uy lực phấn khích.' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => { setStyle(opt.id); handleNext(); }}
                className={`text-left p-5 border rounded-xl hover:border-brand-red transition-all ${
                  style === opt.id ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' : 'border-brand-border'
                }`}
                style={{ minHeight: '80px' }}
              >
                <span className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark block">{opt.title}</span>
                <span className="text-xs text-brand-gray mt-1 block">{opt.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t border-brand-border/40">
            <button 
              onClick={handlePrev}
              className="flex items-center space-x-1 text-xs font-bold text-brand-gray hover:text-brand-dark"
              style={{ minHeight: '44px' }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RIDER HEIGHT */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <HelpCircle className="w-12 h-12 text-brand-red mx-auto" />
            <h2 className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-dark">Chiều cao của người lái xe?</h2>
            <p className="text-brand-gray text-xs lg:text-sm">Giúp chúng tôi chọn dòng xe có chiều cao yên xe chống chân an toàn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[
              { id: 'under_1m55', title: 'Dưới 1m55', desc: 'Ưu tiên xe yên thấp (<= 765mm) như Vision, Lead, Janus, Evo200 để chống chân vững vàng.' },
              { id: '1m55_1m70', title: 'Từ 1m55 - 1m70', desc: 'Thoải mái với các dòng xe yên tầm trung như Air Blade, SH Mode, Grande, Winner X.' },
              { id: 'over_1m70', title: 'Trên 1m70', desc: 'Thích hợp mọi dòng xe kể cả xe cao như SH 150/160i, Vespa GTS, các dòng mô tô PKL.' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => { setHeight(opt.id); }}
                className={`text-left p-5 border rounded-xl hover:border-brand-red transition-all flex flex-col justify-between ${
                  height === opt.id ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' : 'border-brand-border'
                }`}
                style={{ minHeight: '120px' }}
              >
                <span className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark block">{opt.title}</span>
                <span className="text-xs text-brand-gray mt-2 block leading-relaxed">{opt.desc}</span>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between pt-6 border-t border-brand-border/40">
            <button 
              onClick={handlePrev}
              className="flex items-center space-x-1 text-xs font-bold text-brand-gray hover:text-brand-dark"
              style={{ minHeight: '44px' }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
            <button
              onClick={evaluateRules}
              disabled={!height}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold px-6 py-2.5 rounded text-xs uppercase tracking-wider disabled:bg-gray-200 disabled:text-gray-400"
              style={{ minHeight: '44px' }}
            >
              Xem kết quả gợi ý
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS */}
      {step === 5 && (
        <div className="space-y-12">
          
          {/* Headline results */}
          <div className="text-center space-y-3 border-b border-brand-border pb-6">
            <h2 className="font-bevietnam font-extrabold text-2xl lg:text-3xl text-brand-dark tracking-tight">
              Xe Máy Gợi Ý Cho Bạn
            </h2>
            <p className="text-brand-gray text-xs lg:text-sm">Dựa trên bộ luật chấm điểm showroom, đây là những mẫu xe tương thích nhất</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1 text-xs font-bold text-brand-red hover:underline pt-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thực hiện lại bài trắc nghiệm</span>
            </button>
          </div>

          {/* Primary Matches list */}
          {matches.length > 0 ? (
            <div className="space-y-8">
              {matches.map((item, idx) => {
                const displayPrice = item.vehicle.promo_price || item.vehicle.price;
                const brand = brands.find(b => b.id === item.vehicle.brand_id);
                return (
                  <div 
                    key={item.vehicle.id}
                    className="bg-brand-light/30 border border-brand-border rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center hover:shadow-md transition-shadow relative"
                  >
                    {/* Rank Badge */}
                    <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-extrabold px-2.5 py-1 rounded shadow">
                      GỢI Ý #{idx + 1}
                    </div>

                    {/* Bike image */}
                    <div className="relative h-48 rounded-xl overflow-hidden bg-white border border-brand-border">
                    <SafeImage
                      src={item.vehicle.og_image}
                      alt={item.vehicle.name}
                      fill
                      fallbackType="vehicle"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    </div>

                    {/* Suitability detail details */}
                    <div className="md:col-span-2 space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">{brand?.name || 'Chính hãng'}</span>
                        <Link href={`/vehicles/${item.vehicle.slug}`} className="hover:text-brand-red transition-colors block">
                          <h3 className="font-bevietnam font-bold text-lg text-brand-dark leading-tight">{item.vehicle.name}</h3>
                        </Link>
                        <span className="font-bevietnam font-extrabold text-sm text-brand-red block">
                          Mức giá dự kiến: {displayPrice > 0 ? displayPrice.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                        </span>
                      </div>

                      {/* Rationale reason box */}
                      <div className="bg-white border border-brand-border rounded-lg p-3 text-xs text-brand-gray leading-relaxed flex items-start space-x-2">
                        <Info className="w-4.5 h-4.5 text-brand-red shrink-0 mt-0.5" />
                        <p>{item.reason}</p>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Link
                          href={`/vehicles/${item.vehicle.slug}`}
                          className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold py-2.5 px-4 rounded-md transition-colors"
                          style={{ minHeight: '44px' }}
                        >
                          Xem chi tiết
                        </Link>
                        <a
                          href={`${zaloLink}?text=${encodeURIComponent(`Chào Ken Motor, tôi đã thực hiện khảo sát chọn xe và muốn tư vấn cụ thể về mẫu: ${item.vehicle.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-md flex items-center space-x-1 transition-colors"
                          style={{ minHeight: '44px' }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat Zalo tư vấn</span>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-brand-border rounded-xl">
              <p className="text-brand-gray text-sm">Rất tiếc, không tìm thấy xe nào đáp ứng hoàn toàn bộ lọc của bạn.</p>
              <button 
                onClick={handleReset}
                className="mt-4 bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold py-3 px-6 rounded uppercase"
                style={{ minHeight: '44px' }}
              >
                Làm lại khảo sát
              </button>
            </div>
          )}

          {/* Alternative selections */}
          {alternatives.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-brand-border">
              <div>
                <h3 className="font-bevietnam font-bold text-lg text-brand-dark">Xe thay thế tương tự có thể quan tâm</h3>
                <p className="text-brand-gray text-xs mt-0.5">Các dòng xe phù hợp với phân khúc giá tài chính của bạn</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {alternatives.map((v) => {
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
            </div>
          )}

        </div>
      )}

    </div>
  );
}
