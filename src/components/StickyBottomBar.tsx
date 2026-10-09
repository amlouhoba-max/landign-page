import { storeConfig, ProductVariant } from '../config/storeConfig';

interface StickyBottomBarProps {
  selectedVariant: ProductVariant;
  onScrollToForm: () => void;
}

export function StickyBottomBar({ selectedVariant, onScrollToForm }: StickyBottomBarProps) {
  const { currency } = storeConfig.product;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 z-40 lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="text-right">
        <p className="text-[11px] text-slate-500 font-medium">
          {selectedVariant.shortName} ({selectedVariant.weight})
        </p>
        <div className="flex items-baseline gap-1.5">
          <p className="text-emerald-900 font-black text-base sm:text-lg leading-tight">
            {selectedVariant.price} {currency}
          </p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
            توصيل مجاني
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onScrollToForm}
        className="bg-[#1b5b48] hover:bg-[#144738] text-white font-black text-sm px-5 sm:px-6 py-2.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer animate-cta-bounce"
      >
        <span>🛒</span>
        <span>اطلب الآن</span>
      </button>
    </div>
  );
}
