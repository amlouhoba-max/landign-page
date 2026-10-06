import React from 'react';
import { HEALTH_BENEFITS } from '../data/amlouData';
import { Zap, Heart, ShieldCheck, Sparkles, UtensilsCrossed, Coffee } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-[#c79544]" />,
  Heart: <Heart className="w-5 h-5 text-[#c4573f]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#275c48]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#275c48]" />,
};

export const PairingSection: React.FC = () => {
  return (
    <section id="pairings" className="py-14 sm:py-20 bg-[#f4efe4] border-t border-[#e2dbce]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breakfast Table & Pairings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 text-right">
            <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-2 font-cairo flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span>المائدة المغربية الأصيلة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-[#173c2f] mb-4">
              كيف تستمتع بأملو HOBA؟
            </h2>
            <p className="text-sm sm:text-base text-[#4c5e50] leading-relaxed mb-6">
              الأملو هو الرفيق الدائم للمائدة المغربية الأصيلة، يمنحك بداية يوم مفعمة بالحيوية والدفء:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#dfd7c7]">
                <div className="font-bold text-[#173c2f] text-sm mb-1 font-cairo">
                  🥖 مع الخبز الساخن والحرشة
                </div>
                <div className="text-xs text-[#637768]">
                  تغمس فيه قطعة خبز شعير أو قمح بلدي ساخنة طازجة من الفرن.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#dfd7c7]">
                <div className="font-bold text-[#173c2f] text-sm mb-1 font-cairo">
                  🥞 مع المسمن والبغرير
                </div>
                <div className="text-xs text-[#637768]">
                  يُدهن مباشرة فوق المسمن المقرمش أو البغرير المورق بدلاً من المربى.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#dfd7c7]">
                <div className="font-bold text-[#173c2f] text-sm mb-1 font-cairo">
                  🌴 مع التمر والشوفان
                </div>
                <div className="text-xs text-[#637768]">
                  حشو حبات التمر بالأملو كوجبة سريعة ومغذية للرياضيين والأطفال.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#dfd7c7]">
                <div className="font-bold text-[#173c2f] text-sm mb-1 font-cairo">
                  ☕ بجانب الشاي بالنعناع
                </div>
                <div className="text-xs text-[#637768]">
                  براد شاي مغربي مشحر بالنعناع يكمل التجربة النوستالجية للمذاق السوسي.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#eef5f0]">
              <img
                src="/hoba.png"
                alt="فطور مغربي تقليدي مع أملو هوبا ومسمن وشاي بالنعناع"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Health Benefits Section */}
        <div id="benefits" className="pt-8 border-t border-[#ded6c7]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-2 font-cairo">
              غذاء ودواء من خيرات الطبيعة
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#173c2f] mb-3">
              الفوائد الصحية لأملو HOBA الطبيعي
            </h2>
            <p className="text-xs sm:text-sm text-[#5a6d5f]">
              وجبة غذائية متكاملة تمدك بالطاقة النظيفة وتحمي صحة عائلتك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HEALTH_BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-[#ded8cb] hover:border-[#275c48]/50 shadow-xs hover:shadow-md transition-all text-right"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eef5f0] flex items-center justify-center mb-3">
                  {iconMap[benefit.iconName] || <Sparkles className="w-5 h-5 text-[#275c48]" />}
                </div>
                <h3 className="text-base font-bold font-cairo text-[#173c2f] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#5e7163] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
