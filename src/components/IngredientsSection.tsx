import React from 'react';
import { Droplet, Sun, Flower2, ShieldAlert } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  return (
    <section id="ingredients" className="py-14 sm:py-20 bg-[#fbf9f4] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#eef5f0]">
              <img
                src="/hoba.png"
                alt="المكونات الطبيعية لأملو هوبا: لوز بلدي وزيت أركان وعسل حر"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-right">
                  <div className="text-sm font-bold text-[#e8b960] font-cairo">أصالة منطقة سوس ماسة</div>
                  <div className="text-base sm:text-lg font-black font-cairo">
                    مكونات أرض المغرب الحرة بدون أي إضافات كيميائية
                  </div>
                </div>
              </div>
            </div>

            {/* Zero AI slop / Zero additives callout */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#e4ded0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fcedea] text-[#c4573f] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-xs text-right">
                <div className="font-bold text-[#173c2f]">التزامنا الصارم بالنقاء:</div>
                <div className="text-[#637667]">خالٍ من زيت النخيل والمواد الحافظة والملونات، وبدون سكر أبيض مضاف.</div>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-right">
            <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-2 font-cairo">
              سر الجودة والمذاق الفريد
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-[#173c2f] mb-4 text-balance">
              ثلاثة مكونات مغربية خالصة لا غير
            </h2>
            <p className="text-sm sm:text-base text-[#4d5e51] leading-relaxed mb-8">
              الأملو التقليدي ليس مجرد دهن للخبز، بل هو إرث غذائي أمازيغي أصيل يتوارثه الأجيال. نحرص في <strong className="text-[#173c2f]">HOBA</strong> على انتقاء أفضل محاصيل شجر الأركان واللوز البلدي لنقدم لكم قواماً مخملياً يجمع بين اللذة العالية والقيمة الغذائية الفائقة.
            </p>

            {/* The 3 ingredients cards */}
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded8cb] hover:border-[#275c48]/50 transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5f0] text-[#275c48] flex items-center justify-center shrink-0 font-cairo font-black text-lg border border-[#c6dfd2]">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-cairo text-[#173c2f] mb-1">
                    1. لوز بلدي مغربي محمص
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a6d5f] leading-relaxed">
                    نختار حبات اللوز البلدي المحلي الغني بالزيوت الطبيعية، ونقوم بتحميصها بلطف على درجات حرارة محسوبة ليمنح الأملو تلك النكهة المقرمشة واللون الكستنائي الساحر.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded8cb] hover:border-[#275c48]/50 transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fdf8ee] text-[#c79544] flex items-center justify-center shrink-0 font-cairo font-black text-lg border border-[#f0debe]">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-cairo text-[#173c2f] mb-1">
                    2. زيت أركان غذائي معصور على البارد
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a6d5f] leading-relaxed">
                    زيت أركان بكر خالص مستخرج من ثمار شجر الأركان المحمصة في تلال سوس وتارودانت. معصور على البارد بالطريقة التقليدية ليحتفظ بكامل فوائده وفيتامين E والأوميغا 6 و 9.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded8cb] hover:border-[#275c48]/50 transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5f0] text-[#275c48] flex items-center justify-center shrink-0 font-cairo font-black text-lg border border-[#c6dfd2]">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-cairo text-[#173c2f] mb-1">
                    3. عسل زهور برية طبيعي حر
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a6d5f] leading-relaxed">
                    نعتمد على العسل الطبيعي الصافي لجلب الحلاوة المتوازنة الخفيفة دون غرام سكر أبيض مكرر، مما يمنحه طاقة طبيعية ونقاء يناسب الصغار والكبار.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
