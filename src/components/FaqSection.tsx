'use client';

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ } from '@/lib/db/types';

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const toggleFAQ = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="relative max-w-md mx-auto mb-8">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-gray">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Tìm câu hỏi của bạn (ví dụ: trả góp, giấy tờ...)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-brand-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark shadow-sm"
        />
      </div>

      {/* FAQs List */}
      {filteredFaqs.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.slice(0, 10).map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-200"
              >
                {/* FAQ Question header click target */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-sm lg:text-base text-brand-dark hover:bg-brand-light/40 transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-red transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>

                {/* FAQ Answer container */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-brand-border/60' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="px-5 py-4 text-sm text-brand-gray leading-relaxed bg-brand-light/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
          
          {filteredFaqs.length > 10 && (
            <p className="text-center text-xs text-brand-gray pt-2">
              Nhập từ khóa tìm kiếm để lọc thêm {filteredFaqs.length - 10} câu hỏi khác...
            </p>
          )}
        </div>
      ) : (
        <div className="text-center text-brand-gray text-sm py-8">
          Không tìm thấy câu hỏi phù hợp. Vui lòng gọi Hotline để được hỗ trợ trực tiếp.
        </div>
      )}
    </div>
  );
}
