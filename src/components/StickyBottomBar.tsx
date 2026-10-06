import React from 'react';
import { BundleOffer } from '../types';
import { ShoppingBag, MessageSquare } from 'lucide-react';

interface StickyBottomBarProps {
  selectedBundle: BundleOffer;
  onScrollToOrder: () => void;
  visible: boolean;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  selectedBundle,
  onScrollToOrder,
  visible,
}) => {
  if (!visible) return null;

  const total = selectedBundle.price + (selectedBundle.freeShipping ? 0 : 20);
  const quickWhatsAppUrl = `https://wa.me/212717928687?text=${encodeURIComponent(
    `السلام عليكم، أريد طلب أملو HOBA (${selectedBundle.name} - ${total} درهم).`
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2dbcd] shadow-[0_-8px_20px_rgba(23,60,47,0.12)]">
      <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left / Info */}
        <div className="text-right">
          <div className="text-[11px] text-[#637667] font-medium leading-none">
            {selectedBundle.name}
          </div>
          <div className="text-lg sm:text-xl font-black font-cairo text-[#173c2f] tabular-nums leading-tight mt-0.5">
            {total} <span className="text-xs font-bold text-[#275c48]">درهم</span>
            {selectedBundle.freeShipping && (
              <span className="text-[10px] text-[#275c48] font-bold mr-1.5 hidden sm:inline">
                (توصيل بالمجان)
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors"
            title="طلب سريع عبر الواتساب"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
          </a>

          <button
            type="button"
            onClick={onScrollToOrder}
            className="px-5 py-2.5 rounded-full font-black font-cairo text-sm text-white bg-gradient-to-r from-[#275c48] to-[#173c2f] hover:from-[#1d4737] hover:to-[#122e23] shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap border border-[#3b7861]"
          >
            <ShoppingBag className="w-4 h-4 text-[#e8b960]" />
            <span>اطلب الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
