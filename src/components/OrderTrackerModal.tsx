import React, { useState } from 'react';
import { CustomerOrder } from '../types';
import { X, Search, CheckCircle2, Clock, Truck, Home, Package, Phone } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOrders: CustomerOrder[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  savedOrders,
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  // Filter orders by query or show saved orders
  const displayedOrders = query.trim()
    ? savedOrders.filter(
        (o) =>
          o.id.toLowerCase().includes(query.trim().toLowerCase()) ||
          o.phone.includes(query.trim())
      )
    : savedOrders;

  const getStatusStep = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'in_transit':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#275c48]/30 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 left-4 p-2 rounded-full text-[#6b7c70] hover:text-[#173c2f] hover:bg-[#eef5f0] transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#eef5f0] text-[#275c48] flex items-center justify-center mx-auto mb-2 border border-[#c2ded0]">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-[#173c2f]">
            تتبع حالة شحنة أملو HOBA
          </h3>
          <p className="text-xs sm:text-sm text-[#5d7163]">
            أدخل رقم هاتفك أو رقم الطلب لمعرفة المرحلة الحالية للشحنة
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearched(true);
            }}
            placeholder="ابحث برقم الطلب (مثال: HB-8492) أو رقم هاتفك"
            className="w-full text-sm font-semibold rounded-2xl p-3.5 pr-10 border-2 border-[#74a38f] focus:border-[#275c48] bg-white outline-none text-right"
          />
          <Search className="w-4 h-4 text-[#7b9183] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Results */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-8 bg-[#fbf9f4] rounded-2xl border border-[#e5dfd3] p-6">
            <Package className="w-12 h-12 text-[#9aa79d] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#173c2f] mb-1">
              {searched ? 'لم يتم العثور على طلب بهذا الرقم' : 'لا توجد طلبات مسجلة في هذا المتصفح حالياً'}
            </p>
            <p className="text-xs text-[#6e8073]">
              عند إتمام أي طلب جديد، سيظهر تتبعه هنا بشكل مباشر وتلقائي.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedOrders.map((order) => {
              const step = getStatusStep(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-[#fbf9f4] rounded-2xl p-4 sm:p-5 border border-[#dfd7c7] text-right"
                >
                  <div className="flex items-center justify-between border-b border-[#e5ded0] pb-2.5 mb-3">
                    <span className="text-xs font-mono font-bold text-[#173c2f] bg-white px-2.5 py-1 rounded-md border border-[#dbd4c4]">
                      {order.id}
                    </span>
                    <span className="text-xs text-[#6a7c6f]">{order.date}</span>
                  </div>

                  <div className="text-xs text-[#3a493e] mb-3 space-y-1">
                    <div>
                      <strong>الزبون:</strong> {order.customerName} ({order.phone})
                    </div>
                    <div>
                      <strong>المنتج:</strong> {order.bundleName}
                    </div>
                    <div>
                      <strong>العنوان:</strong> {order.city} - {order.address}
                    </div>
                    <div className="text-[#275c48] font-bold">
                      <strong>المبلغ عند الاستلام:</strong> {order.totalPrice} درهم
                    </div>
                  </div>

                  {/* Delivery Timeline */}
                  <div className="pt-2 border-t border-[#e5ded0]">
                    <div className="grid grid-cols-4 gap-1 text-center mb-2">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 1 ? 'bg-[#275c48] text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] mt-1 font-bold text-[#173c2f]">تم التأكيد</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 2 ? 'bg-[#275c48] text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] mt-1 font-bold text-[#173c2f]">قيد التجهيز</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 3 ? 'bg-[#275c48] text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] mt-1 font-bold text-[#173c2f]">مع الموزع</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 4 ? 'bg-[#275c48] text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] mt-1 font-bold text-[#173c2f]">تم التسليم</span>
                      </div>
                    </div>

                    <div className="text-[11px] bg-[#eef5f0] text-[#275c48] p-2 rounded-lg text-center font-bold">
                      {step === 1 && 'طلبك مؤكد وجاري إعداده في ورشتنا التقليدية بأكادير.'}
                      {step === 2 && 'الطلب في مرحلة التغليف المحكم ومراقبة الجودة.'}
                      {step === 3 && 'الشحنة مع موزع التوصيل، سيتصل بك قبل الوصول لباب بيتك.'}
                      {step === 4 && 'تم تسليم الطلب بنجاح. بالصحة والراحة!'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#e2dbce] text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold font-cairo text-xs text-[#55695b] hover:bg-[#eef5f0] transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
