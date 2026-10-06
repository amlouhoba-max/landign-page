import React, { useState } from 'react';
import { BundleOffer, CustomerOrder } from '../types';
import { MOROCCAN_CITIES } from '../data/amlouData';
import { ShieldCheck, Truck, Phone, User, MapPin, CheckCircle, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

interface OrderFormProps {
  bundles: BundleOffer[];
  selectedBundleId: string;
  onSelectBundle: (bundleId: string) => void;
  onOrderSubmitted: (order: CustomerOrder) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  bundles,
  selectedBundleId,
  onSelectBundle,
  onOrderSubmitted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(MOROCCAN_CITIES[0]);
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[0];
  const shippingFee = selectedBundle.freeShipping ? 0 : 20;
  const grandTotal = selectedBundle.price + shippingFee;

  const validatePhone = (phoneNumber: string): boolean => {
    // Moroccan phone: cleans spaces, dashes, +212 or 00212
    const clean = phoneNumber.replace(/[\s\-\(\)]/g, '');
    // Standard moroccan formats:
    // 06XXXXXXXX, 07XXXXXXXX, 05XXXXXXXX (10 digits)
    // +2126XXXXXXXX, +2127XXXXXXXX (starts with +212 and 9 digits)
    // 2126XXXXXXXX
    const regex1 = /^0[567]\d{8}$/;
    const regex2 = /^(\+?212)[567]\d{8}$/;
    const regex3 = /^[567]\d{8}$/;
    return regex1.test(clean) || regex2.test(clean) || regex3.test(clean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل)';
    }

    if (!phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف للتواصل معك';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف مغربي صحيح (مثال: 0612345678 أو 0712345678)';
    }

    const finalCity = city.includes('أخرى') ? customCity.trim() : city;
    if (city.includes('أخرى') && (!customCity.trim() || customCity.trim().length < 2)) {
      newErrors.city = 'يرجى كتابة اسم مدينتك';
    }

    if (!address.trim() || address.trim().length < 4) {
      newErrors.address = 'يرجى إدخال العنوان أو الحي لتسهيل وصول الموزع';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate fast reliable order processing
    setTimeout(() => {
      const randomId = 'HB-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder: CustomerOrder = {
        id: randomId,
        date: new Date().toLocaleDateString('ar-MA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customerName: name.trim(),
        phone: phone.trim(),
        city: finalCity,
        address: address.trim(),
        bundleId: selectedBundle.id,
        bundleName: selectedBundle.name,
        potsCount: selectedBundle.potsCount,
        totalPrice: grandTotal,
        shippingFee,
        notes: notes.trim() || undefined,
        status: 'confirmed',
      };

      setIsSubmitting(false);
      onOrderSubmitted(newOrder);
    }, 700);
  };

  const handleWhatsAppOrder = () => {
    const finalCity = city.includes('أخرى') ? customCity.trim() || 'المغرب' : city;
    const msg = encodeURIComponent(
      `السلام عليكم، أود طلب أملو HOBA التقليدي:\n` +
      `📦 العرض: ${selectedBundle.name} (${selectedBundle.weightText})\n` +
      `💰 السعر الإجمالي: ${grandTotal} درهم (الدفع عند الاستلام)\n` +
      `👤 الاسم: ${name.trim() || 'زبون مهتم'}\n` +
      `📱 الهاتف: ${phone.trim() || 'هاتفي'}\n` +
      `📍 المدينة والعنوان: ${finalCity} - ${address.trim() || 'العنوان'}`
    );
    // WhatsApp direct link to customer support
    window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
  };

  return (
    <section id="order" className="py-12 sm:py-16 bg-[#fbf9f4] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Main Moroccan Order Container */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 border-[#275c48] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle top Moroccan ornament line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#173c2f] via-[#c79544] to-[#173c2f]" />

          {/* Form Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef5f0] text-[#275c48] text-xs font-bold font-cairo mb-3 border border-[#c1d9cb]">
              <Sparkles className="w-3.5 h-3.5 text-[#c79544]" />
              استمارة الطلب السريع والمباشر
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-[#173c2f] mb-2">
              طلب أملو <span className="text-[#275c48]">HOBA</span> التقليدي
            </h2>
            <p className="text-sm sm:text-base text-[#4f6254]">
              املأ معلوماتك وسنتصل بك فوراً لتأكيد العنوان وموعد التسليم لباب بيتك
            </p>
          </div>

          {/* Bundle Selector Pills inside the Form */}
          <div className="mb-8">
            <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-2.5 font-cairo">
              1. اختر الباقة المطلوبة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {bundles.map((bundle) => {
                const isSelected = bundle.id === selectedBundleId;
                return (
                  <button
                    key={bundle.id}
                    type="button"
                    onClick={() => onSelectBundle(bundle.id)}
                    className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#275c48] bg-[#eef5f0] shadow-sm ring-2 ring-[#275c48]/20'
                        : 'border-[#ded7c8] hover:border-[#275c48]/50 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-black font-cairo text-[#173c2f]">
                        {bundle.name}
                      </span>
                      {bundle.isPopular && (
                        <span className="text-[10px] bg-[#c4573f] text-white px-1.5 py-0.5 rounded font-bold">
                          الأكثر طلباً
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#607365] mb-2">
                      {bundle.weightText}
                    </div>
                    <div className="flex items-baseline justify-between mt-auto pt-1 border-t border-[#ded7c8]/60">
                      <span className="text-sm font-black text-[#275c48] tabular-nums">
                        {bundle.price} درهم
                      </span>
                      <span className="text-[10px] text-[#55695a]">
                        {bundle.freeShipping ? 'شحن مجاني' : '+20 درهم شحن'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Price Summary Box */}
          <div className="bg-[#fbf9f4] rounded-2xl p-4 sm:p-5 border border-[#dfd7c7] mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#5c6e61] font-medium">الباقة المختارة:</div>
                <div className="text-base sm:text-lg font-black font-cairo text-[#173c2f]">
                  {selectedBundle.name} ({selectedBundle.weightText})
                </div>
                <div className="text-xs text-[#275c48] font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{selectedBundle.freeShipping ? 'توصيل مجاني لجميع المدن' : 'توصيل سريع: 20 درهم'}</span>
                </div>
              </div>

              <div className="text-center sm:text-left bg-white px-5 py-3 rounded-xl border border-[#ded8cb] shrink-0">
                <div className="text-xs text-[#718476]">المجموع المؤدى عند الاستلام</div>
                <div className="text-2xl sm:text-3xl font-black font-cairo text-[#173c2f] tabular-nums">
                  {grandTotal} <span className="text-sm font-bold text-[#275c48]">درهم</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-1.5 font-cairo">
                الاسم الكامل <span className="text-[#c4573f]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="مثال: يوسف العلمي"
                  autoComplete="name"
                  className={`w-full font-bold text-base sm:text-lg rounded-2xl p-3.5 sm:p-4 text-right border-2 bg-white outline-none transition-colors ${
                    errors.name
                      ? 'border-[#c4573f] bg-[#fdf5f3]'
                      : 'border-[#74a38f] focus:border-[#275c48] focus:ring-4 focus:ring-[#275c48]/10'
                  }`}
                />
                <User className="w-5 h-5 text-[#8aa093] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.name && (
                <p className="flex items-center gap-1 text-xs text-[#c4573f] font-bold mt-1.5 mr-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-1.5 font-cairo">
                رقم الهاتف (للاتصال والتوصيل) <span className="text-[#c4573f]">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="مثال: 0612345678 أو 0700000000"
                  inputMode="numeric"
                  autoComplete="tel"
                  dir="ltr"
                  className={`w-full font-bold text-base sm:text-lg rounded-2xl p-3.5 sm:p-4 text-right border-2 bg-white outline-none transition-colors ${
                    errors.phone
                      ? 'border-[#c4573f] bg-[#fdf5f3]'
                      : 'border-[#74a38f] focus:border-[#275c48] focus:ring-4 focus:ring-[#275c48]/10'
                  }`}
                />
                <Phone className="w-5 h-5 text-[#8aa093] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.phone ? (
                <p className="flex items-center gap-1 text-xs text-[#c4573f] font-bold mt-1.5 mr-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.phone}
                </p>
              ) : (
                <p className="text-[11px] text-[#6d7e72] mt-1 mr-1">
                  سنتصل بك لتأكيد الطلب قبل خروج الموزع
                </p>
              )}
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-1.5 font-cairo">
                المدينة <span className="text-[#c4573f]">*</span>
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full font-bold text-base rounded-2xl p-3.5 sm:p-4 text-right border-2 border-[#74a38f] focus:border-[#275c48] bg-white outline-none appearance-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <MapPin className="w-5 h-5 text-[#8aa093] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* If Other City is chosen */}
            {city.includes('أخرى') && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-1.5 font-cairo">
                  اسم مدينتك أو قريتك <span className="text-[#c4573f]">*</span>
                </label>
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="اكتب اسم مدينتك هنا"
                  className="w-full font-bold text-base rounded-2xl p-3.5 text-right border-2 border-[#74a38f] focus:border-[#275c48] bg-white outline-none"
                />
                {errors.city && (
                  <p className="text-xs text-[#c4573f] font-bold mt-1.5 mr-1">
                    {errors.city}
                  </p>
                )}
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#173c2f] mb-1.5 font-cairo">
                العنوان الكامل (الحي، الشارع، أو قرب معلم معروف) <span className="text-[#c4573f]">*</span>
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                }}
                placeholder="مثال: حي المعاريف، زنقة 14، قرب مسجد النور، عمارة 5 الشقة 2"
                autoComplete="street-address"
                className={`w-full font-semibold text-sm sm:text-base rounded-2xl p-3.5 text-right border-2 bg-white outline-none transition-colors ${
                  errors.address
                    ? 'border-[#c4573f] bg-[#fdf5f3]'
                    : 'border-[#74a38f] focus:border-[#275c48] focus:ring-4 focus:ring-[#275c48]/10'
                }`}
              />
              {errors.address && (
                <p className="flex items-center gap-1 text-xs text-[#c4573f] font-bold mt-1.5 mr-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.address}
                </p>
              )}
            </div>

            {/* Optional Delivery Notes */}
            <div>
              <label className="block text-xs font-bold text-[#55695b] mb-1 font-cairo">
                ملاحظات إضافية للتوصيل (اختياري)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: الاتصال بعد الساعة 3 عصراً، أو التسليم في مقر العمل"
                className="w-full text-xs sm:text-sm rounded-xl p-3 text-right border border-[#cbd8d0] focus:border-[#275c48] bg-white outline-none"
              />
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-6 rounded-full font-black font-cairo text-lg sm:text-2xl text-white bg-gradient-to-r from-[#275c48] to-[#173c2f] hover:from-[#1e4939] hover:to-[#112d23] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 border-b-4 border-[#122e23] disabled:opacity-80 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري تسجيل طلبك...</span>
                  </>
                ) : (
                  <>
                    <span>اضغط هنا لتأكيد الطلب</span>
                    <span className="text-sm sm:text-base bg-[#c79544] text-white px-3 py-1 rounded-full font-bold">
                      {grandTotal} درهم
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="flex items-center justify-center gap-4 text-xs text-[#5e7164] pt-2 text-center flex-wrap">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#275c48]" />
                الدفع عند الاستلام نقدًا
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#275c48]" />
                معاينة الطرد قبل الدفع
              </span>
              <span>·</span>
              <span>معلوماتك مشفرة ومحمية 100%</span>
            </div>

            {/* Alternative Direct WhatsApp button */}
            <div className="pt-4 border-t border-[#e2dbce] text-center">
              <p className="text-xs text-[#6e7f73] mb-2 font-medium">
                تفضل الطلب المباشر عبر الواتساب؟
              </p>
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-cairo font-bold text-sm border border-[#25D366]/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>اطلب بنقرة واحدة عبر الواتساب (WhatsApp)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
