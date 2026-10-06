import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { MOROCCAN_CITIES } from '../data/amlouData';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState(MOROCCAN_CITIES[0]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [bundleBought, setBundleBought] = useState('عرض التوفير الأكثر طلباً (علبتين)');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      author: author.trim(),
      city: city.split('(')[0].trim(),
      rating,
      date: 'اليوم',
      comment: comment.trim(),
      bundleBought,
      verified: true,
    };

    onAddReview(newRev);
    setShowAddModal(false);
    setAuthor('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#fbf9f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#e5dfd3]">
          <div className="text-right">
            <div className="text-xs sm:text-sm font-bold text-[#275c48] mb-1 font-cairo">
              شهادات حقيقية من مدن المغرب
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#173c2f]">
              آراء زبناء أملو <span className="text-[#275c48]">HOBA</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#5f7263]">
              <div className="flex items-center text-[#c79544]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#c79544] text-[#c79544]" />
                ))}
              </div>
              <span className="font-bold text-[#173c2f]">4.9 من 5</span>
              <span>·</span>
              <span>بناءً على أكثر من 1,480 تجربة شراء حقيقية</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl font-bold font-cairo text-xs sm:text-sm text-[#275c48] bg-[#eef5f0] hover:bg-[#e0ece3] border border-[#bed9ca] transition-colors flex items-center gap-2 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>شاركنا تجربتك وتقييمك</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dfd7c7] shadow-xs text-right flex flex-col justify-between"
            >
              <div>
                {/* Review Header - Zero-pill clean text metadata */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="font-bold text-sm sm:text-base text-[#173c2f] flex items-center gap-2">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[11px] text-[#275c48] font-bold flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3 text-[#275c48]" />
                          مشترٍ موثق
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#6e8072] mt-0.5">
                      <span>{rev.city}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-[#c79544] shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c79544] text-[#c79544]" />
                    ))}
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-xs sm:text-sm text-[#3a4b3f] leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bought Bundle Footer */}
              <div className="pt-3 border-t border-[#f0ebe0] flex items-center justify-between text-[11px] text-[#6b7d70]">
                <span>الباقة المشتراة: {rev.bundleBought}</span>
                <span className="flex items-center gap-1 text-[#275c48]">
                  <ThumbsUp className="w-3 h-3" />
                  يوصي به بشدة
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#275c48]/30 text-right">
              <h3 className="text-xl font-black font-cairo text-[#173c2f] mb-1">
                إضافة رأي أو تقييم
              </h3>
              <p className="text-xs text-[#5e7163] mb-4">
                رأيك يهمنا ويساعد الزبناء الجدد على التعرف على جودة أملو هوبا
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#173c2f] mb-1 font-cairo">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="مثال: مريم العلمي"
                    className="w-full text-sm rounded-xl p-3 border border-[#74a38f] outline-none text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173c2f] mb-1 font-cairo">
                    المدينة
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-sm rounded-xl p-3 border border-[#74a38f] outline-none text-right bg-white"
                  >
                    {MOROCCAN_CITIES.slice(0, 15).map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173c2f] mb-1 font-cairo">
                    التقييم بالنجوم
                  </label>
                  <div className="flex items-center gap-2 justify-end">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-[#c79544] text-[#c79544]'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173c2f] mb-1 font-cairo">
                    الباقة التي جربتها
                  </label>
                  <select
                    value={bundleBought}
                    onChange={(e) => setBundleBought(e.target.value)}
                    className="w-full text-xs rounded-xl p-2.5 border border-[#74a38f] outline-none text-right bg-white"
                  >
                    <option value="عرض التوفير الأكثر طلباً (علبتين)">عرض التوفير الأكثر طلباً (علبتين)</option>
                    <option value="عرض التجربة والتذوق (علبة واحدة)">عرض التجربة والتذوق (علبة واحدة)</option>
                    <option value="العرض العائلي الفاخر (4 علب)">العرض العائلي الفاخر (4 علب)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173c2f] mb-1 font-cairo">
                    رأيك وتجربتك
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب هنا تجربتك مع المذاق، القوام، وسرعة التوصيل..."
                    className="w-full text-xs sm:text-sm rounded-xl p-3 border border-[#74a38f] outline-none text-right"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold font-cairo text-sm text-white bg-[#275c48] hover:bg-[#1f4b3a] transition-colors"
                  >
                    نشر التقييم
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-3 rounded-xl font-bold font-cairo text-sm text-[#617466] hover:bg-[#eef5f0] transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
