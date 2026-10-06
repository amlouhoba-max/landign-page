import React from 'react';
import { CustomerOrder } from '../types';
import { CheckCircle2, Phone, MapPin, Package, X, MessageSquare, Printer, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onOpenTracker: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onOpenTracker,
}) => {
  if (!order) return null;

  const whatsAppText = order
    ? encodeURIComponent(
        `السلام عليكم، لقد قمت بطلب أملو HOBA من الموقع:\n` +
        `🔖 رقم الطلب: ${order.id}\n` +
        `📦 الباقة: ${order.bundleName}\n` +
        `💰 المبلغ: ${order.totalPrice} درهم\n` +
        `👤 الاسم: ${order.customerName}\n` +
        `📍 المدينة: ${order.city}\n` +
        `يرجى تأكيد الشحنة وشكراً.`
      )
    : '';
  const whatsAppUrl = `https://wa.me/212717928687?text=${whatsAppText}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-[#275c48] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 left-4 p-2 rounded-full text-[#6b7c70] hover:text-[#173c2f] hover:bg-[#eef5f0] transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#eef5f0] text-[#275c48] flex items-center justify-center mx-auto mb-3 border-2 border-[#b8dbc6] shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-[#c79544] font-cairo bg-[#fcf5e8] px-3 py-1 rounded-full border border-[#f0debe]">
            تم تسجيل طلبك بنجاح
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-cairo text-[#173c2f] mt-2 mb-1">
            شكراً لثقتكم في أملو HOBA!
          </h3>
          <p className="text-xs sm:text-sm text-[#546759]">
            سيتصل بك فريقنا هاتفياً خلال ساعات قليلة لتأكيد موعد التسليم
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#fbf9f4] rounded-2xl p-4 sm:p-5 border border-[#e5dfd3] mb-6 space-y-3 text-right">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
            <span className="text-xs text-[#6e7f72]">رقم الطلب المرجعي:</span>
            <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 rounded-md border border-[#ddd6c8] text-[#173c2f]">
              {order.id}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-[#5e7164]">
              <Package className="w-4 h-4 text-[#275c48] shrink-0" />
              <span>الباقة المطلوبة:</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#173c2f] text-left">
              {order.bundleName}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-[#5e7164]">
              <Phone className="w-4 h-4 text-[#275c48] shrink-0" />
              <span>رقم الهاتف:</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#173c2f] dir-ltr font-mono">
              {order.phone}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-[#5e7164]">
              <MapPin className="w-4 h-4 text-[#275c48] shrink-0" />
              <span>وجهة التوصيل:</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#173c2f] text-left">
              {order.city} - {order.address}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#e5dfd3]">
            <span className="text-xs sm:text-sm font-bold text-[#173c2f]">المجموع المؤدى عند الاستلام:</span>
            <span className="text-xl sm:text-2xl font-black font-cairo text-[#275c48] tabular-nums">
              {order.totalPrice} درهم
            </span>
          </div>
        </div>

        {/* Guarantees Reminder */}
        <div className="bg-[#eef5f0] rounded-xl p-3 text-center text-xs text-[#275c48] font-bold mb-6 border border-[#c1d9cb]">
          ✓ تذكير: يمكنك فحص ومعاينة الأملو أمام الموزع قبل دفع ثمن الطلب
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl font-black font-cairo text-sm text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all flex items-center justify-center gap-2 text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>تأكيد أسرع عبر الواتساب الآن</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="flex-1 py-3 px-4 rounded-xl font-bold font-cairo text-xs sm:text-sm text-[#275c48] bg-[#fbf9f4] hover:bg-[#eef5f0] border border-[#275c48]/30 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>تتبع حالة الشحنة</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-3 rounded-xl text-[#5b6e61] hover:text-[#173c2f] hover:bg-[#fbf9f4] border border-[#dcd4c5] transition-colors"
              title="طباعة الوصل"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
