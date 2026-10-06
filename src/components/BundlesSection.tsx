import React from 'react';
import { BundleOffer } from '../types';
import { Check, Star, Gift, Truck } from 'lucide-react';

interface BundlesSectionProps {
  bundles: BundleOffer[];
  selectedBundleId: string;
  onSelectBundle: (bundleId: string) => void;
}

export const BundlesSection: React.FC<BundlesSectionProps> = ({
  bundles,
  selectedBundleId,
  onSelectBundle,
}) => {
  return (
    <section id="offers" className="py-14 sm:py-20 bg-[#f4efe4] border-y border-[#e5dfd3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-2 tracking-wide font-cairo">
            اختر العرض المناسب لعائلتك
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-[#173c2f] mb-3">
            عروض وباقات أملو <span className="text-[#275c48]">HOBA</span> الخاصة
          </h2>
          <p className="text-sm sm:text-base text-[#4f6053]">
            استفد من التخفيضات الكبرى مع خدمة التوصيل المجاني والدفع عند استلام ومعاينة طلبك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {bundles.map((bundle) => {
            const isSelected = bundle.id === selectedBundleId;
            return (
              <div
                key={bundle.id}
                onClick={() => onSelectBundle(bundle.id)}
                className={`cursor-pointer relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-200 ${
                  bundle.isPopular
                    ? 'bg-white border-3 border-[#275c48] shadow-xl md:-translate-y-2'
                    : 'bg-[#fbf9f4] border-2 border-[#ded8cb] hover:border-[#275c48]/50 shadow-sm hover:shadow-md'
                } ${isSelected ? 'ring-4 ring-[#275c48]/20' : ''}`}
              >
                {/* Popular banner */}
                {bundle.isPopular && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-[#275c48] to-[#173c2f] text-white text-xs font-black font-cairo px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap border border-[#3b7861]">
                    <Star className="w-3.5 h-3.5 fill-[#e8b960] text-[#e8b960]" />
                    <span>العرض الأكثر طلباً وتوفيراً</span>
                  </div>
                )}

                <div>
                  {/* Top info */}
                  <div className="text-center pt-2 pb-4 border-b border-[#e8e2d6]">
                    <h3 className="text-xl font-black font-cairo text-[#173c2f] mb-1">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-[#576b5d] font-medium mb-3">
                      {bundle.subtitle}
                    </p>

                    {/* Price display with tabular-nums */}
                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="text-3xl sm:text-4xl font-black font-cairo text-[#173c2f] tabular-nums">
                        {bundle.price}{' '}
                        <span className="text-base sm:text-lg font-bold text-[#275c48]">درهم</span>
                      </div>
                      {bundle.originalPrice && (
                        <div className="text-sm sm:text-base text-[#9aa79d] line-through font-bold tabular-nums">
                          {bundle.originalPrice} درهم
                        </div>
                      )}
                    </div>

                    {/* Discount or perk tag */}
                    {bundle.discountBadge && (
                      <div className="inline-block text-xs font-bold font-cairo px-3 py-1 rounded-full bg-[#fcedea] text-[#c4573f] mt-1">
                        {bundle.discountBadge}
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="py-5 space-y-3 text-right">
                    {bundle.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2b3a30]">
                        <div className="w-5 h-5 rounded-full bg-[#eef5f0] text-[#275c48] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5ddd0]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-[#e8e2d6] mt-4">
                  <div className="flex items-center justify-between text-xs text-[#54685a] mb-3">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#275c48]" />
                      {bundle.freeShipping ? 'توصيل مجاني 100%' : 'توصيل: 20 درهم'}
                    </span>
                    {bundle.potsCount === 4 && (
                      <span className="flex items-center gap-1 text-[#c79544] font-bold">
                        <Gift className="w-3.5 h-3.5" />
                        هدية ملعقة خشبية
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBundle(bundle.id);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-black font-cairo text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#275c48] text-white shadow-md'
                        : bundle.isPopular
                        ? 'bg-gradient-to-r from-[#275c48] to-[#173c2f] text-white hover:opacity-95 shadow-md'
                        : 'bg-white hover:bg-[#275c48] text-[#275c48] hover:text-white border-2 border-[#275c48]'
                    }`}
                  >
                    <span>{isSelected ? '✓ الباقة المحددة حالياً' : 'اختر هذه الباقة'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
