import React from 'react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../utils/whatsapp';
import { STORE_CONFIG } from '../config/storeConfig';

interface WhatsAppCTAProps {
  variant?: 'primary' | 'compact' | 'belowProduct' | 'nearPrice' | 'bottomPage' | 'sticky' | 'floating';
  className?: string;
  customMessage?: string;
  showPhone?: boolean;
}

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.04 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.74 20.28 11.93C20.28 16.48 16.59 20.15 12.05 20.15ZM16.57 14.45C16.32 14.33 15.1 13.73 14.87 13.65C14.65 13.56 14.48 13.52 14.32 13.77C14.15 14.02 13.68 14.57 13.53 14.74C13.39 14.9 13.24 14.92 12.99 14.8C12.74 14.67 11.94 14.41 11 13.57C10.26 12.91 9.77 12.1 9.62 11.85C9.48 11.6 9.61 11.47 9.73 11.35C9.84 11.06 9.98 11.06 10.1 10.92C10.23 10.78 10.27 10.67 10.35 10.51C10.43 10.34 10.39 10.2 10.33 10.07C10.27 9.95 9.77 8.72 9.56 8.23C9.36 7.74 9.15 7.81 9 7.81C8.86 7.8 8.69 7.8 8.52 7.8C8.36 7.8 8.08 7.86 7.85 8.11C7.62 8.36 6.97 8.97 6.97 10.22C6.97 11.47 7.88 12.67 8.01 12.84C8.13 13.01 9.8 15.58 12.35 16.68C12.96 16.94 13.43 17.1 13.8 17.22C14.41 17.41 14.96 17.38 15.4 17.32C15.89 17.25 16.91 16.7 17.12 16.11C17.34 15.51 17.34 15 17.27 14.89C17.21 14.78 17.05 14.71 16.8 14.59L16.57 14.45Z" />
  </svg>
);

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  variant = 'primary',
  className = '',
  customMessage,
  showPhone = false,
}) => {
  const url = getWhatsAppUrl(customMessage);
  const price = STORE_CONFIG.product.price;
  const currencyEn = STORE_CONFIG.product.currencyEn;
  const currencyAr = STORE_CONFIG.product.currency;

  // 1. BELOW MAIN PRODUCT SECTION VARIANT
  if (variant === 'belowProduct') {
    return (
      <div className={`my-4 px-4 ${className}`}>
        <div className="bg-gradient-to-br from-[#173c2f] via-[#1f4e3d] to-[#123126] rounded-2xl p-4 text-white shadow-xl border border-[#c79544]/40 relative overflow-hidden">
          {/* Subtle gold decorative glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#e8b960]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#25D366]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between gap-3 mb-2.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
              </span>
              <span className="text-xs font-bold text-[#e8b960] font-cairo">
                خدمة الطلب المباشر والمجاني
              </span>
            </div>
            <span className="text-[11px] bg-white/10 text-white/90 px-2 py-0.5 rounded-full font-medium">
              رد فوري ⚡
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 mb-3 leading-relaxed relative z-10">
            يمكنك إتمام طلبك الآن مباشرة عبر الواتساب بدون ملء أي استمارة!
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full py-3.5 px-4 rounded-xl font-black font-cairo text-base sm:text-lg text-white bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] shadow-lg hover:shadow-xl shadow-[#25D366]/25 border-b-4 border-[#128C7E] flex items-center justify-center gap-2.5 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-wide">اطلب الآن عبر واتساب</span>
            <span className="text-xs bg-[#173c2f] text-[#e8b960] px-2 py-0.5 rounded-full font-bold mr-1 border border-[#c79544]/30">
              {price} {currencyEn}
            </span>
          </a>

          {showPhone && (
            <div className="text-center mt-2 text-[11px] text-[#e8b960] font-mono dir-ltr">
              {WHATSAPP_PHONE_DISPLAY}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. NEAR PRICE VARIANT (e.g. inside the main order card right beside price)
  if (variant === 'nearPrice') {
    return (
      <div className={`w-full my-2.5 ${className}`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full py-3.5 px-4 rounded-2xl font-black font-cairo text-sm sm:text-base text-white bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0e7c6e] active:scale-[0.98] border-2 border-[#1caa51] flex items-center justify-between gap-2 overflow-hidden animate-cta-bounce transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#25D366]/40"
          title={`اطلب مباشرة عبر الواتساب بسعر ${price} ${currencyAr}`}
        >
          {/* Animated light beam sweep */}
          <span className="absolute inset-0 -top-2 -bottom-2 w-1/2 h-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-cta-shine" />

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
              <WhatsAppIcon className="w-5 h-5 text-white animate-icon-wiggle" />
            </div>
            <div className="text-right">
              <div className="leading-tight font-black flex items-center gap-1.5">
                <span>اطلب الآن عبر واتساب</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-100"></span>
                </span>
              </div>
              <div className="text-[11px] text-white/95 font-medium font-tajawal">
                ⚡ تأكيد فوري خلال ثوانٍ
              </div>
            </div>
          </div>
          <div className="relative z-10 bg-[#173c2f] text-[#e8b960] font-cairo font-black text-xs px-2.5 py-1 rounded-lg border border-[#c79544]/50 shadow-md shrink-0">
            {price} {currencyEn}
          </div>
        </a>
      </div>
    );
  }

  // 3. BOTTOM OF THE LANDING PAGE VARIANT
  if (variant === 'bottomPage') {
    return (
      <div className={`px-4 pt-4 pb-2 ${className}`}>
        <div className="bg-white border-2 border-[#25D366] rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-center">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c79544]/5 rounded-tr-full pointer-events-none" />

          <div className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] px-3.5 py-1 rounded-full text-xs font-bold font-cairo mb-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>فريق خدمة الزبناء متواجد للإجابة</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-cairo text-[#173c2f] mb-1">
            تفضّل الطلب المباشر عبر الواتساب؟
          </h3>
          <p className="text-xs sm:text-sm text-[#546759] mb-4 max-w-sm mx-auto leading-relaxed">
            اضغط على الزر أسفله وسيتواصل معك موظف الخدمة لتأكيد شحنتك بـ <strong className="text-[#173c2f]">{price} {currencyAr} فقط</strong> إلى باب بيتك.
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 w-full max-w-md mx-auto py-4 px-6 rounded-full font-black font-cairo text-lg sm:text-xl text-white bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] shadow-xl hover:shadow-2xl shadow-[#25D366]/30 border-b-4 border-[#128C7E] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <span>اطلب الآن عبر واتساب</span>
            <span className="text-xs bg-[#173c2f] text-[#e8b960] px-2.5 py-1 rounded-full font-black mr-1 border border-[#c79544]/40">
              {price} {currencyAr}
            </span>
          </a>
        </div>
      </div>
    );
  }

  // 4. FLOATING MOBILE BUTTON VARIANT
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-20 left-4 z-40 sm:bottom-6 sm:left-6 ${className}`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="اطلب الآن عبر واتساب"
          className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-[#25D366]/50 border-2 border-white transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

          <div className="relative">
            <WhatsAppIcon className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#e8b960] border-2 border-[#173c2f] rounded-full"></span>
          </div>

          <span className="font-cairo font-black text-sm whitespace-nowrap hidden sm:inline pl-1">
            اطلب الآن عبر واتساب
          </span>
        </a>
      </div>
    );
  }

  // 5. STICKY MOBILE INLINE BUTTON VARIANT
  if (variant === 'sticky') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-full font-black font-cairo text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] shadow-md hover:shadow-lg shadow-[#25D366]/25 transition-all duration-200 transform active:scale-95 whitespace-nowrap border border-[#1caa51] ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
        <span>اطلب الآن عبر واتساب</span>
      </a>
    );
  }

  // DEFAULT / PRIMARY FULL-WIDTH BUTTON
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative w-full py-4 px-5 rounded-full font-black font-cairo text-lg sm:text-xl text-white bg-gradient-to-r from-[#25D366] via-[#22bf5b] to-[#25D366] hover:from-[#20ba59] hover:to-[#18a850] active:scale-[0.99] shadow-lg hover:shadow-xl shadow-[#25D366]/30 border-b-4 border-[#128C7E] flex items-center justify-center gap-3 transition-all duration-200 ${className}`}
    >
      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
        <WhatsAppIcon className="w-5 h-5 text-white" />
      </div>
      <span>اطلب الآن عبر واتساب</span>
      <span className="text-xs bg-[#173c2f] text-[#e8b960] px-2.5 py-0.5 rounded-full font-bold border border-[#c79544]/40">
        {price} {currencyEn}
      </span>
    </a>
  );
};
