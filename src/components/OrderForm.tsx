import React, { useState } from 'react';
import { User, Phone, Lock, Flame, CheckCircle2, Sparkles, Truck, PartyPopper, Clock, BadgeCheck } from 'lucide-react';
import { storeConfig, ProductVariant } from '../config/storeConfig';
import { orderService } from '../services/orderService';

interface OrderFormProps {
  formRef: React.RefObject<HTMLDivElement | null>;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  orderSuccess?: boolean;
  setOrderSuccess?: (success: boolean) => void;
}

export function OrderForm({
  formRef,
  nameInputRef,
  selectedVariant,
  onSelectVariant,
  orderSuccess: externalOrderSuccess,
  setOrderSuccess: externalSetOrderSuccess,
}: OrderFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [internalOrderSuccess, setInternalOrderSuccess] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState('');

  const orderSuccess = externalOrderSuccess !== undefined ? externalOrderSuccess : internalOrderSuccess;
  const setOrderSuccess = externalSetOrderSuccess || setInternalOrderSuccess;

  const { currency, deliveryText } = storeConfig.product;

  // قبول الأرقام فقط في خانة الهاتف ومنع الحروف نهائياً
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(onlyDigits);
    if (formError) setFormError('');
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Enter',
      'Home',
      'End',
    ];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    if (formError) setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setFormError('المرجو إدخال الاسم الكامل أولاً لتأكيد طلبك');
      nameInputRef.current?.focus();
      return;
    }

    if (!phone.trim() || phone.trim().length < 9) {
      setFormError('المرجو إدخال رقم هاتف صحيح مكون من 10 أرقام (مثال: 0612345678)');
      return;
    }

    setFormError('');

    // ✅ إرسال الطلبية تلقائياً إلى Google Sheets مع حماية البيانات
    const newOrder = orderService.createOrder({
      customerName: fullName.trim(),
      phone: phone.trim(),
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
    });

    setSubmittedOrderId(newOrder.id);
    setOrderSuccess(true);
  };

  // ✅ Thank-you screen shown after successful order
  if (orderSuccess) {
    return (
      <section
        ref={formRef}
        id="order-section"
        className="bg-white rounded-3xl border-2 border-emerald-600/40 shadow-xl p-6 sm:p-8 relative overflow-hidden text-center"
      >
        {/* Green glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 to-white pointer-events-none rounded-3xl" />

        <div className="relative z-10 space-y-5">
          {/* Success icon */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/40 flex items-center justify-center shadow-lg">
              <PartyPopper className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="font-['Cairo',sans-serif] font-black text-2xl sm:text-3xl text-emerald-900">
              شكراً لك! 🎉
            </h2>
            <p className="text-emerald-700 font-bold text-base sm:text-lg mt-1">
              طلبيتك وصلت بنجاح
            </p>
          </div>

          {/* Order ID badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-900 text-emerald-100 px-4 py-2 rounded-full font-mono font-bold text-sm shadow">
            <BadgeCheck className="w-4 h-4 text-emerald-300" />
            رقم الطلبية: {submittedOrderId}
          </div>

          {/* Info card */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 space-y-3 text-right shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-sm font-medium">الاسم</span>
              <span className="font-bold text-slate-800 text-sm">{fullName}</span>
            </div>
            <div className="border-t border-slate-100" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-sm font-medium">الهاتف</span>
              <span className="font-bold text-slate-800 text-sm dir-ltr">{phone}</span>
            </div>
            <div className="border-t border-slate-100" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-sm font-medium">المنتج</span>
              <span className="font-bold text-emerald-800 text-sm">{selectedVariant.shortName} ({selectedVariant.weight})</span>
            </div>
            <div className="border-t border-slate-100" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-sm font-medium">الثمن</span>
              <span className="font-black text-emerald-900 text-base">{selectedVariant.price} {currency}</span>
            </div>
          </div>

          {/* Delivery message */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-right">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm">سيتواصل معك فريقنا قريباً</p>
              <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
                استلمنا طلبيتك وسيتصل بك أحد موزعينا لتأكيد التوصيل حتى باب منزلك 🚚
              </p>
            </div>
          </div>

          {/* New order button */}
          <button
            type="button"
            onClick={() => {
              setOrderSuccess(false);
              setFullName('');
              setPhone('');
              setSubmittedOrderId('');
              setTimeout(() => {
                nameInputRef.current?.focus();
              }, 100);
            }}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50 active:scale-[0.98] font-['Cairo',sans-serif] font-black text-base py-3 px-6 rounded-2xl shadow-sm transition-all cursor-pointer"
          >
            <span className="text-lg">🔄</span>
            <span>تقديم طلبية أخرى</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={formRef}
      id="order-section"
      className="bg-white rounded-3xl border-2 border-emerald-800/35 shadow-xl p-4 sm:p-6 relative overflow-hidden"
    >
      {/* 1. Header: Price & Discount for the Selected Variant */}
      <div className="bg-emerald-950 text-white -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 p-4 sm:p-5 mb-5 rounded-t-2xl border-b-2 border-[#caa45b]/40">
        <div className="flex items-center justify-between gap-3">
          <div className="text-right">
            <span className="text-xs sm:text-sm text-emerald-200 block font-medium">
              ثمن {selectedVariant.shortName} (الوزن {selectedVariant.weight})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[#fae8b4] font-['Cairo',sans-serif] font-black text-2xl sm:text-3xl tracking-tight">
                {selectedVariant.price} {currency}
              </span>
              <span className="text-slate-400 text-sm sm:text-base line-through font-semibold">
                {selectedVariant.oldPrice} {currency}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="bg-[#d45237] text-white px-3 py-1 rounded-full font-black text-xs sm:text-sm shadow-md flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>تخفيض {selectedVariant.discountPercentage}</span>
            </div>
            <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              <span>توصيل مجاني 🇲🇦</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Variant Selector (3 Flavors) */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-[#134938] font-['Cairo',sans-serif] font-black text-base sm:text-lg flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#caa45b]" />
            <span>اختر نكهتك المفضلة (الحجم العائلي 700g):</span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {storeConfig.variants.map((variant) => {
            const isSelected = selectedVariant.id === variant.id;

            return (
              <div
                key={variant.id}
                onClick={() => onSelectVariant(variant)}
                className={`relative cursor-pointer rounded-2xl p-3.5 transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/25 scale-[1.01]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Radio Icon + Flavor info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-emerald-700" />}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{variant.icon}</span>
                        <h3 className="font-['Cairo',sans-serif] font-black text-sm sm:text-base text-slate-900">
                          {variant.name}
                        </h3>
                        {variant.badge && (
                          <span
                            className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full ${variant.badgeColorClass}`}
                          >
                            {variant.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {variant.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="text-left shrink-0">
                    <span className="text-emerald-900 font-['Cairo',sans-serif] font-black text-lg sm:text-xl block">
                      {variant.price} {currency}
                    </span>
                    <span className="text-slate-400 text-xs line-through block">
                      {variant.oldPrice} {currency}
                    </span>
                  </div>
                </div>

                {/* Weight Chip */}
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    الوزن الصافي: {variant.weight}
                  </span>
                  <span className="text-slate-600 font-semibold">
                    الدفع نقداً عند الاستلام
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-24 h-0.5 bg-emerald-800/20 mx-auto my-4 rounded-full"></div>

      <h2 className="text-[#134938] font-['Cairo',sans-serif] font-black text-lg sm:text-xl text-center">
        ادخل معلوماتك لتأكيد الطلب
      </h2>
      <p className="text-center text-xs text-slate-500 font-medium mt-1">
        سيتواصل معك موزعنا لتسليم طلبك حتى باب منزلك
      </p>

      {/* 3. Customer Info Form */}
      <form
        onSubmit={handleFormSubmit}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="space-y-3 mt-4"
      >
        {/* Full Name Input */}
        <div>
          <label className="sr-only" htmlFor="customer_name_field">
            الاسم الكامل
          </label>
          <div className="relative">
            <input
              ref={nameInputRef}
              id="customer_name_field"
              name="hoba_client_name"
              type="text"
              value={fullName}
              onChange={handleNameChange}
              placeholder="الاسم الكامل"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              aria-autocomplete="none"
              className="w-full bg-white border-2 border-slate-300 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 rounded-2xl py-3 pr-11 pl-4 text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition-all outline-none"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5 text-emerald-800/70" />
            </div>
          </div>
        </div>

        {/* Phone Input (Accepts NUMBERS ONLY & No previous suggestions) */}
        <div>
          <label className="sr-only" htmlFor="customer_phone_field">
            رقم الهاتف
          </label>
          <div className="relative">
            <input
              id="customer_phone_field"
              name="hoba_client_phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              placeholder="رقم الهاتف (مثال: 0612345678)"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              aria-autocomplete="none"
              className="w-full bg-white border-2 border-slate-300 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 rounded-2xl py-3 pr-11 pl-4 text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition-all outline-none"
              dir="ltr"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-5 h-5 text-emerald-800/70" />
            </div>
          </div>
        </div>

        {/* Form Error Display */}
        {formError && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold text-center">
            {formError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1b5b48] hover:bg-[#144738] active:scale-[0.98] text-white font-['Cairo',sans-serif] font-black text-lg sm:text-xl py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-500/30 animate-cta-bounce"
        >
          <span className="text-2xl">🛒</span>
          <span>أكّد طلبيتك — {selectedVariant.price} {currency}</span>
        </button>

        {/* Free Delivery note */}
        <p className="text-center text-xs text-emerald-800 font-bold">
          {deliveryText}
        </p>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium pt-1">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>معلوماتك مشفرة ومحمية والدفع فقط بعد معاينة الطرد</span>
        </div>
      </form>
    </section>
  );
}
