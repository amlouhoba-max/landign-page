import React, { useState } from 'react';
import { CustomerOrder } from '../types';
import { STORE_CONFIG } from '../config/storeConfig';
import { 
  Info, 
  Leaf, 
  Package, 
  RotateCcw, 
  MessageCircle, 
  User, 
  Phone, 
  AlertCircle
} from 'lucide-react';
import { WhatsAppCTA, WhatsAppIcon } from './WhatsAppCTA';

interface ScreenshotLandingProps {
  onOrderSubmitted: (order: CustomerOrder) => void;
  onOpenTracker: () => void;
  ordersCount: number;
}

export const ScreenshotLanding: React.FC<ScreenshotLandingProps> = ({
  onOrderSubmitted,
}) => {
  // 📝 الحالات (States) الخاصة بالاستمارة
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 💰 جلب إعدادات المنتج والواتساب من ملف الإعدادات المركزي storeConfig.ts
  const { product, whatsapp, topBanner, bundleContents, guarantees, footer } = STORE_CONFIG;
  const currentPrice = product.price;

  // التحقق من صحة رقم الهاتف المغربي
  const validatePhone = (num: string): boolean => {
    const clean = num.replace(/[\s\-\(\)]/g, '');
    return /^0[567]\d{8}$/.test(clean) || /^(\+?212)[567]\d{8}$/.test(clean) || /^[567]\d{8}$/.test(clean);
  };

  // 🔗 تكوين رابط الواتساب الديناميكي مع المعلومات المدخلة
  const getDynamicWhatsAppUrl = () => {
    let messageText = whatsapp.defaultMessage;
    if (name.trim()) {
      messageText = `سلام، بغيت نطلب ${STORE_CONFIG.brandName} بـ ${currentPrice} ${product.currencyEn}.\n` +
        `👤 الاسم: ${name.trim()}` +
        (phone.trim() ? `\n📱 الهاتف: ${phone.trim()}` : '');
    }
    return `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(messageText)}`;
  };

  // ⚡ تسجيل الطلبية في النظام عند الضغط
  const handleDirectWhatsAppOrder = () => {
    if (name.trim()) {
      const orderId = 'HB-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder: CustomerOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('ar-MA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customerName: name.trim(),
        phone: phone.trim() || 'عبر واتساب',
        city: 'المغرب (عبر واتساب)',
        address: 'تحديد العنوان عبر واتساب',
        bundleId: 'bundle-hoba-78',
        bundleName: product.name,
        potsCount: 1,
        totalPrice: currentPrice,
        shippingFee: 0,
        status: 'confirmed',
      };
      onOrderSubmitted(newOrder);
    }
  };

  // التمرير السلس إلى بطاقة الطلب
  const scrollToOrderCard = () => {
    const el = document.getElementById('order-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // أيقونة الضمان حسب النوع
  const renderGuaranteeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      case 'RotateCcw': return <RotateCcw className="w-6 h-6" />;
      case 'MessageCircle': return <MessageCircle className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto bg-[#fbf9f4] min-h-screen text-[#1d2620] pb-24 shadow-2xl relative font-tajawal selection:bg-[#275c48] selection:text-white">

      {/* ========================================================= */}
      {/* 📌 1. الشريط العلوي الأخضر (التنبيه والضمان)               */}
      {/* ========================================================= */}
      <div className="bg-[#173c2f] text-white text-[12px] sm:text-[13px] font-cairo font-bold py-2.5 px-4 text-center leading-snug flex items-center justify-center gap-1.5 shadow-xs">
        <Info className="w-4 h-4 text-[#e8b960] shrink-0" />
        <span>{topBanner.text}</span>
      </div>

      {/* شريط الزليج المغربي التزييني */}
      <div className="moroccan-zellij-strip" />

      {/* ========================================================= */}
      {/* 📌 2. صورة المنتج الرئيسية                                */}
      {/* ========================================================= */}
      <div className="relative bg-[#e9e6dd] overflow-hidden rounded-b-[28px] shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto aspect-square object-cover block select-none"
          loading="eager"
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/hoba.png';
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* ========================================================= */}
      {/* 📌 3. بطاقة الطلب السريع والسعر (78 DH)                   */}
      {/* ========================================================= */}
      <div className="p-4 sm:p-5">
        <div
          id="order-card"
          className="bg-white border-4 border-[#275c48] rounded-[34px] p-5 sm:p-6 shadow-2xl relative"
        >
          {/* السعر وشارة الخصم */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-black font-cairo text-[#173c2f]">
              فقط بـ <span className="text-[#275c48]">{currentPrice} {product.currency}</span>
            </div>
            <div className="bg-gradient-to-r from-[#e8784d] to-[#c8573f] text-white font-cairo font-black text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md">
              {product.discountText}
            </div>
          </div>

          {/* زر واتساب بجوار السعر */}
          <WhatsAppCTA variant="nearPrice" />

          <h2 className="text-center font-cairo font-black text-lg sm:text-xl text-[#173c2f] mb-1">
            ادخل معلوماتك لتأكيد الطلب
          </h2>
          <div className="text-center text-[#74a38f] text-sm tracking-widest mb-4">
            ──────────────
          </div>

          {/* حقول الاسم ورقم الهاتف */}
          <div className="space-y-3">
            {/* خانة الاسم الكامل */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="الاسم الكامل"
                  className={`w-full font-bold text-base sm:text-lg border-2 rounded-2xl py-3.5 px-4 pr-11 text-right outline-none bg-white transition-all ${
                    errors.name ? 'border-[#c4573f] bg-[#fdf5f3]' : 'border-[#74a38f] focus:border-[#275c48] focus:ring-4 focus:ring-[#275c48]/10'
                  }`}
                />
                <User className="w-5 h-5 text-[#74a38f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.name && (
                <p className="text-[11px] text-[#c4573f] font-bold mt-1 pr-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* خانة رقم الهاتف */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="رقم الهاتف (06 أو 07)"
                  className={`w-full font-bold text-base sm:text-lg border-2 rounded-2xl py-3.5 px-4 pr-11 text-right outline-none bg-white transition-all ${
                    errors.phone ? 'border-[#c4573f] bg-[#fdf5f3]' : 'border-[#74a38f] focus:border-[#275c48] focus:ring-4 focus:ring-[#275c48]/10'
                  }`}
                />
                <Phone className="w-5 h-5 text-[#74a38f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-[#c4573f] font-bold mt-1 pr-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* 🟢 الزر الكبير للطلب المباشر عبر واتساب */}
            <div className="pt-2">
              <a
                href={getDynamicWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-4 px-4 rounded-full font-black font-cairo text-xl sm:text-2xl text-white bg-gradient-to-r from-[#25D366] via-[#20ba59] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0e7c6e] shadow-lg hover:shadow-xl shadow-[#25D366]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-1 border-b-4 border-[#0c6b5e] flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <span>{whatsapp.buttonText}</span>
              </a>
            </div>

            {/* رسالة الطمأنينة والأمان */}
            <div className="text-center text-[11px] text-[#718577] pt-1">
              🔒 {footer.codNotice}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📌 4. قسم "محتويات الباقة"                                */}
      {/* ========================================================= */}
      <div className="px-4 py-2">
        <div className="text-center -mb-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#c8573f] text-white font-cairo font-black text-sm px-5 py-1.5 rounded-full shadow-md">
            <span>🏷️</span>
            <span>محتويات الباقة</span>
          </span>
        </div>

        <div className="bg-white border-2 border-[#275c48]/40 rounded-2xl p-5 pt-7 shadow-sm text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-bold text-[#1d2620]">
            {bundleContents.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#275c48] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                  ✓
                </div>
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📌 5. بطاقات الضمان والثقة (4 بطاقات)                     */}
      {/* ========================================================= */}
      <div className="px-4 space-y-3 pt-2">
        {guarantees.map((item) => (
          <div
            key={item.id}
            style={{ borderColor: item.color }}
            className="bg-white border-2 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs"
          >
            <div className="text-right flex-1">
              <h4
                style={{ color: item.color }}
                className="text-sm font-black font-cairo mb-0.5"
              >
                {item.title}
              </h4>
              <p className="text-[11px] text-[#55695b] leading-tight">
                {item.desc}
              </p>
            </div>
            <div
              style={{ backgroundColor: item.color }}
              className="w-12 h-12 rounded-full text-white flex items-center justify-center shrink-0 shadow-sm"
            >
              {renderGuaranteeIcon(item.icon)}
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 📌 6. الزر الثاني للطلب                                   */}
      {/* ========================================================= */}
      <div className="px-4 pt-6 pb-2">
        <button
          onClick={scrollToOrderCard}
          type="button"
          className="w-full py-4 px-4 rounded-full font-black font-cairo text-lg sm:text-xl text-white bg-gradient-to-r from-[#275c48] to-[#173c2f] hover:from-[#1e4939] hover:to-[#112d23] shadow-lg hover:shadow-xl transition-all transform active:translate-y-1 border-b-4 border-[#122e23] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-2xl">👉</span>
          <span>احصل على باقتك الطبيعية الآن</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 📌 7. صندوق الواتساب في أسفل الصفحة                      */}
      {/* ========================================================= */}
      <WhatsAppCTA variant="bottomPage" />

      {/* ========================================================= */}
      {/* 📌 8. روابط الفوتر ومعلومات المتجر                         */}
      {/* ========================================================= */}
      <div className="text-center text-xs text-[#637667] pt-2 pb-6 px-4 space-y-2 border-t border-[#dfd7c7] mt-4">
        <div className="flex items-center justify-center gap-2 flex-wrap font-bold">
          <a href="#" className="hover:text-[#173c2f]">شروط الاستخدام</a>
          <span>|</span>
          <a href="#" className="hover:text-[#173c2f]">سياسة الاستبدال والاسترجاع</a>
          <span>|</span>
          <a href="#" className="hover:text-[#173c2f]">سياسة الخصوصية</a>
        </div>
        <div className="text-[11px] text-[#809485]">
          {footer.codNotice} · اتصل بنا: {footer.supportEmail}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📌 9. الشريط السفلي المثبت للهاتف (Sticky Bottom Bar)      */}
      {/* ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ded7c8] shadow-[0_-4px_16px_rgba(0,0,0,0.12)] py-2 px-3 sm:px-4 flex items-center justify-between gap-2 max-w-[480px] mx-auto">
        <div className="text-right shrink-0">
          <div className="text-[10px] text-[#637667] leading-none">السعر اليوم</div>
          <div className="text-base sm:text-lg font-black font-cairo text-[#173c2f] leading-tight">
            {currentPrice} {product.currency}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-end">
          {/* زر واتساب المثبت للهاتف */}
          <WhatsAppCTA variant="sticky" className="flex-1 max-w-[210px]" />

          {/* زر التمرير السريع لبطاقة الطلب */}
          <button
            type="button"
            onClick={scrollToOrderCard}
            className="bg-[#173c2f] hover:bg-[#112d23] text-[#e8b960] font-cairo font-bold text-xs px-3 py-2.5 rounded-full shadow-sm flex items-center justify-center shrink-0 border border-[#c79544]/30 transition-colors"
            title="الطلب عبر الاستمارة"
          >
            <span>الاستمارة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
