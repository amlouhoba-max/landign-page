import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/amlouData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#f4efe4] border-t border-[#e3dcce]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-1 font-cairo flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>إجابات واضحة لجميع تساؤلاتك</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-[#173c2f] mb-2">
            الأسئلة الشائعة
          </h2>
          <p className="text-xs sm:text-sm text-[#5a6d5f]">
            كل ما تود معرفته عن الطلب، التوصيل، وجودة أملو هوبا المغربي
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#ded7c8] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold font-cairo text-sm sm:text-base text-[#173c2f] hover:bg-[#faf7f0] transition-colors"
                >
                  <span className="flex-1 leading-snug">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#eef5f0] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#275c48] text-white' : 'text-[#275c48]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-right text-xs sm:text-sm text-[#4b5c4f] leading-relaxed border-t border-[#f0ebe0]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
