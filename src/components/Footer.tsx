import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openPolicy = (type: 'privacy' | 'terms' | 'returns') => {
    if (type === 'privacy') {
      setModalContent({
        title: 'سياسة الخصوصية وحماية البيانات',
        content:
          'نحن في متجر أملو HOBA نحترم خصوصية زبنائنا الكرام. نستخدم رقم الهاتف والاسم والعنوان المسجل فقط لأغراض توصيل الطلب وتأكيده معكم، ولا نشارك بياناتكم مع أي طرف ثالث تحت أي ظرف.'
      });
    } else if (type === 'terms') {
      setModalContent({
        title: 'الشروط والأحكام',
        content:
          'الدفع يتم نقدًا عند استلام الطرد ومعاينته. الأسعار المعروضة بالدرهم المغربي وتشمل الضرائب. التوصيل متوفر لجميع مدن المغرب عبر شركات التوصيل المعتمدة خلال 24 إلى 48 ساعة.'
      });
    } else if (type === 'returns') {
      setModalContent({
        title: 'سياسة الإرجاع والاستبدال',
        content:
          'يحق للمشتري فحص المنتج بحضور موزع التوصيل. في حال وجود أي كسر أو عدم رضا عن الجودة، يمكنك رفض استلام الطرد دون دفع أي درهم، أو التواصل معنا خلال 48 ساعة من الاستلام لاستبداله مجاناً.'
      });
    }
  };

  return (
    <footer className="bg-[#173c2f] text-[#d1ded6] pt-14 pb-24 border-t border-[#234d3d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-right">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#275c48] flex items-center justify-center text-[#e8b960] font-black font-cairo text-lg border border-[#3c7e65]">
                H
              </div>
              <span className="text-2xl font-black font-cairo text-white">
                HOBA <span className="text-[#c79544]">أملو مغربي</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#a2b7aa] leading-relaxed max-w-md">
              أملو مغربي تقليدي 100% طبيعي، محضر بعناية من أجود حبات اللوز البلدي المحمر وزيت الأركان المعصور على البارد وعسل النحل البري. استمتع بأصالة المائدة السوسية في كل وجبة فطور.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#c79544]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                ضمان الجودة والأصالة
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                توصيل لجميع المدن
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-4 h-4" />
                معاينة قبل الدفع
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-cairo text-white border-b border-[#2b5947] pb-2">
              خدمة الزبناء والتواصل
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:amlouhoba@gmail.com"
                className="flex items-center gap-2 text-[#a2b7aa] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c79544] shrink-0" />
                <span>amlouhoba@gmail.com</span>
              </a>
              <a
                href="https://wa.me/212717928687?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8%20H%C3%94BA%20AMLOU%20%D8%A8%D9%80%2078%20DH.%20%D9%88%D8%A7%D8%B4%20%D9%85%D8%AA%D9%88%D9%81%D8%B1%D8%9F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#a2b7aa] hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <span dir="ltr" className="font-mono font-bold">+212 717-928687 (واتساب)</span>
              </a>
              <div className="flex items-center gap-2 text-[#a2b7aa]">
                <MapPin className="w-4 h-4 text-[#c79544] shrink-0" />
                <span>أكادير / تارودانت، المملكة المغربية</span>
              </div>
            </div>
          </div>

          {/* Quick links & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-cairo text-white border-b border-[#2b5947] pb-2">
              معلومات المتجر
            </h4>
            <div className="flex flex-col gap-2 text-xs text-[#a2b7aa]">
              <button
                type="button"
                onClick={() => openPolicy('privacy')}
                className="text-right hover:text-white transition-colors"
              >
                سياسة الخصوصية
              </button>
              <button
                type="button"
                onClick={() => openPolicy('terms')}
                className="text-right hover:text-white transition-colors"
              >
                الشروط والأحكام
              </button>
              <button
                type="button"
                onClick={() => openPolicy('returns')}
                className="text-right hover:text-white transition-colors"
              >
                سياسة الإرجاع والاستبدال
              </button>
              <a href="#faq" className="hover:text-white transition-colors">
                الأسئلة الشائعة
              </a>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 border-t border-[#234d3d] text-center text-xs text-[#7d9686]">
          <p>© {new Date().getFullYear()} أملو HOBA المغربي الأصيل. جميع الحقوق محفوظة.</p>
          <p className="mt-1 text-[11px] text-[#698272]">
            الدفع عند الاستلام · التوصيل إلى باب البيت بجميع مدن المملكة المغربية
          </p>
        </div>
      </div>

      {/* Policy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right text-[#173c2f] relative shadow-2xl">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black font-cairo mb-3">
              {modalContent.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5d50] leading-relaxed mb-6">
              {modalContent.content}
            </p>
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 rounded-xl bg-[#275c48] text-white font-bold font-cairo text-sm"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
