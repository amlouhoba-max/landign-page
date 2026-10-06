import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, Star, Award } from 'lucide-react';

interface HeroProps {
  onScrollToOrder: () => void;
  onScrollToOffers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToOrder, onScrollToOffers }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 bg-[#fbf9f4]">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c79544]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#275c48]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Text content (RTL Right side) */}
          <div className="lg:col-span-7 text-right">
            {/* Trust Kicker - Zero pill clean metadata */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#275c48] mb-3">
              <span className="flex items-center gap-1 text-[#c79544]">
                <Star className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
                <Star className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
                <Star className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
                <Star className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
                <Star className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
              </span>
              <span>4.9 / 5 تقييم ممتاز</span>
              <span className="text-[#a4b4a9]" aria-hidden="true">·</span>
              <span className="text-[#526456]">أكثر من 1,480 طلب موثق في المغرب</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black font-cairo text-[#173c2f] leading-[1.25] tracking-tight mb-4 text-balance">
              أملو <span className="text-[#275c48]">HOBA</span> التقليدي المغربي الأصيل
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#394a3e] leading-relaxed mb-6 font-medium max-w-2xl">
              المذاق السوسي الأصيل بمكونات نقية 100%: <strong className="text-[#173c2f] font-bold">لوز بلدي محمر بعناية</strong>، <strong className="text-[#173c2f] font-bold">زيت أركان أصلي معصور على البارد</strong>، و<strong className="text-[#173c2f] font-bold">عسل زهور طبيعي حر</strong>. خالٍ تماماً من زيت النخيل والمواد الحافظة والسكر المكرر.
            </p>

            {/* Core guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#e2dbce] shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#275c48] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#173c2f]">افحص قبل الدفع</div>
                  <div className="text-[#687a6d]">حق معاينة الطرد أولاً</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#e2dbce] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#c79544] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#173c2f]">100% طبيعي</div>
                  <div className="text-[#687a6d]">بدون قطرة زيت نخيل</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#e2dbce] shadow-xs">
                <Award className="w-5 h-5 text-[#275c48] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#173c2f]">جودة سوسية معتمدة</div>
                  <div className="text-[#687a6d]">وصفة تقليدية أصلية</div>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onScrollToOrder}
                type="button"
                className="px-8 py-4 text-base sm:text-lg font-black font-cairo text-white bg-gradient-to-r from-[#275c48] to-[#173c2f] hover:from-[#1e4939] hover:to-[#112d23] rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-[#3b7861]"
              >
                <span>اطلب الآن — الدفع عند الاستلام</span>
                <span className="text-xs bg-[#c79544] text-white px-2 py-0.5 rounded-md font-bold">129 درهم</span>
              </button>

              <button
                onClick={onScrollToOffers}
                type="button"
                className="px-6 py-4 text-sm sm:text-base font-bold font-cairo text-[#275c48] bg-white hover:bg-[#f3ede1] rounded-2xl border-2 border-[#275c48]/30 transition-colors flex items-center justify-center gap-2"
              >
                <span>شاهد باقات التوفير والتخفيض</span>
                <ArrowDown className="w-4 h-4 text-[#275c48]" />
              </button>
            </div>

            {/* Quiet reassurance text */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6e7f73]">
              <CheckCircle2 className="w-4 h-4 text-[#275c48] shrink-0" />
              <span>التوصيل متاح إلى جميع مدن وقرى المغرب · الدفع نقدًا عند باب منزلك</span>
            </div>
          </div>

          {/* Right / Visual Product Showcase (RTL Left side) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product main frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#eef5f0]">
                <img
                  src="/hoba.png"
                  alt="أملو هوبا التقليدي المغربي بزيت الأركان واللوز والعسل"
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11]"
                  referrerPolicy="no-referrer"
                />

                {/* Promotional tag */}
                <div className="absolute top-4 right-4 bg-[#c4573f] text-white font-cairo font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span>عرض محدود</span>
                  <span className="opacity-75">·</span>
                  <span>توصيل مجاني للباقات</span>
                </div>

                {/* Fresh artisanal badge bottom left */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-[#173c2f] font-cairo font-bold text-xs p-2.5 rounded-xl shadow-lg border border-[#e4ded2]">
                  <div className="flex items-center gap-1.5 text-[#275c48]">
                    <div className="w-2 h-2 rounded-full bg-[#275c48] animate-pulse" />
                    <span>دفعة طازجة محضرة هذا الأسبوع</span>
                  </div>
                </div>
              </div>

              {/* Overlapping secondary small feature card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#e7e1d4] max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#e4ded2] shrink-0">
                    <img
                      src="/hoba.png"
                      alt="علبة أملو هوبا"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#173c2f]">قوام كريمي غني</div>
                    <div className="text-[11px] text-[#637667]">مطحون بالرحى التقليدية</div>
                    <div className="text-[11px] font-bold text-[#c79544] mt-0.5">250 غرام صافي</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
