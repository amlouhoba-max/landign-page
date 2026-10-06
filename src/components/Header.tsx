import React from 'react';
import { Truck, ShieldCheck, Clock, Search, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onScrollToOrder: () => void;
  onOpenTracker: () => void;
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToOrder,
  onOpenTracker,
  ordersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#e5dfd3]">
      {/* Top Moroccan Banner */}
      <div className="bg-gradient-to-r from-[#173c2f] via-[#275c48] to-[#173c2f] text-white text-xs sm:text-sm py-2 px-4 text-center font-cairo font-bold tracking-wide">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#e8b960]" />
            الدفع عند الاستلام بعد المعاينة
          </span>
          <span className="hidden md:inline-block opacity-40">|</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e8b960]" />
            100% طبيعي وأصلي من سوس
          </span>
          <span className="hidden sm:inline-block opacity-40">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#e8b960]" />
            توصيل لباب بيتك خلال 24 - 48 ساعة
          </span>
        </div>
      </div>

      <div className="moroccan-zellij-strip"></div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav links) - Zone 3 (Action) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, single element */}
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center gap-2.5 text-[#173c2f] hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-[#275c48] flex items-center justify-center text-[#e8b960] font-black font-cairo text-xl shadow-inner border border-[#3b7861]">
              H
            </div>
            <span className="text-2xl sm:text-3xl font-black font-cairo tracking-tight text-[#173c2f]">
              HOBA <span className="text-lg sm:text-xl font-bold text-[#c79544]">هوبا</span>
            </span>
          </a>
        </div>

        {/* Zone 2: 4-6 nav links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-[#445649]">
          <a href="#offers" className="hover:text-[#275c48] transition-colors">عروض التوفير</a>
          <a href="#ingredients" className="hover:text-[#275c48] transition-colors">المكونات والجودة</a>
          <a href="#benefits" className="hover:text-[#275c48] transition-colors">الفوائد الصحية</a>
          <a href="#pairings" className="hover:text-[#275c48] transition-colors">طريقة التقديم</a>
          <a href="#reviews" className="hover:text-[#275c48] transition-colors">آراء الزبناء</a>
          <a href="#faq" className="hover:text-[#275c48] transition-colors">الأسئلة الشائعة</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenTracker}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#275c48] bg-[#eef5f0] hover:bg-[#e2ede5] rounded-xl border border-[#c1d9cb] transition-colors whitespace-nowrap"
            title="تتبع حالة طلبك"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تتبع الطلب</span>
            {ordersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#275c48] text-white text-[11px] font-bold flex items-center justify-center">
                {ordersCount}
              </span>
            )}
          </button>

          <button
            onClick={onScrollToOrder}
            type="button"
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold font-cairo text-white bg-gradient-to-r from-[#275c48] to-[#173c2f] hover:from-[#1f4e3c] hover:to-[#123126] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap border border-[#3b7861]"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#e8b960]" />
            <span>اطلب الآن</span>
          </button>
        </div>
      </div>
    </header>
  );
};
