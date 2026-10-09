/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroBanner } from './components/HeroBanner';
import { OrderForm } from './components/OrderForm';
import { TrustGuarantees } from './components/TrustGuarantees';
import { FooterAndPolicies } from './components/FooterAndPolicies';
import { StickyBottomBar } from './components/StickyBottomBar';
import { storeConfig, ProductVariant } from './config/storeConfig';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(storeConfig.variants[0]);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    nameInputRef.current?.focus();
  };

  // صفحة المتجر الرئيسية (Landing Page)
  return (
    <div
      className="min-h-screen bg-[#e9ece9] text-slate-800 font-['Tajawal',sans-serif] selection:bg-emerald-700 selection:text-white pb-16 lg:pb-0"
      dir="rtl"
    >
      {/* 📱 الإطار الرئيسي للصفحة (Main Landing Page Container) */}
      <main
        className="max-w-[430px] mx-auto my-0 lg:my-6 lg:rounded-[40px] lg:shadow-2xl lg:ring-1 lg:ring-black/10 overflow-hidden bg-[#f9faf9] border-x border-slate-300/40"
      >
        {/* 1. الشريط الإخباري العلوي */}
        <AnnouncementBar />

        {/* 2. الصورة الرئيسية المنحنية مع شارة الجودة */}
        <HeroBanner />

        {/* 3. باقي أقسام المحتوى الداخلي */}
        <div className="p-3.5 sm:p-5 pt-3 space-y-5">
          {/* استمارة تأكيد الطلب مع تشكيلة النكهات الثلاث والأسعار الجديدة */}
          <OrderForm
            formRef={formRef}
            nameInputRef={nameInputRef}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />

          {/* بطاقات الضمان الأربعة وزر التحويل السريع للواتساب */}
          <TrustGuarantees />

          {/* تذييل الصفحة وروابط السياسات ورابط لوحة التحكم */}
          <FooterAndPolicies />
        </div>
      </main>

      {/* 🚀 الشريط السفلي العائم للهواتف الذكية مع تحديث السعر والنكهة المختارة ديناميكياً */}
      <StickyBottomBar
        selectedVariant={selectedVariant}
        onScrollToForm={scrollToForm}
      />
    </div>
  );
}
