/**
 * ========================================================
 * ⚙️ ملف إعدادات المتجر والمنتجات (Store Configuration)
 * ========================================================
 * Pack Gourmand: 3 نكهات (أملو + كاجو + بيستاش) بثمن واحد
 *
 * لتغيير الثمن، بدّل فقط هاد 3 قيم:
 *   - PACK_PRICE      : الثمن الحالي
 *   - PACK_OLD_PRICE  : الثمن القديم (المشطب)
 *   - PACK_DISCOUNT   : نسبة التخفيض (نص)
 */

export interface ProductVariant {
  id: string;
  name: string;
  shortName: string;
  weight: string;
  price: number;
  oldPrice: number;
  discountPercentage: string;
  badge?: string;
  tagline: string;
  icon: string;
  borderClass: string;
  bgLightClass: string;
  badgeColorClass: string;
}

// ------------------ ✏️ الأثمنة (بدّل هنا فقط) ------------------
const PACK_PRICE = 399;
const PACK_OLD_PRICE = 489;
const PACK_DISCOUNT = "-18%";
// ---------------------------------------------------------------

// Hidden & protected Webhook endpoint (Obfuscated fallback + ENV priority)
const _ENC_SHEET_URL = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4SjNvYmQyeDJrRURIaWxYZGpkcEFVODFDcmRRVVVFRjZrVW1TZGxOa1E4SGZEV1pPY1hnWHdTWVZqU3JiOHBPc04vZXhlYw==";
const getHiddenWebhookUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_WEBHOOK_URL) {
    return import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  }
  try {
    return typeof window !== 'undefined' && window.atob ? window.atob(_ENC_SHEET_URL) : '';
  } catch {
    return '';
  }
};

export const storeConfig = {
  // 1. معلومات المتجر والمنتج العامة
  product: {
    name: "HÔBA PACK GOURMAND",
    fullTitle: "Pack Gourmand من هوبا: 3 منتجات في واحد (أملو + كاجو + بيستاش)",
    defaultPrice: PACK_PRICE,
    currency: "درهم",
    weight: "3 × 700g",
    image: "/assets/images/hoba_amlou_product.jpg",
    ribbonText: "✦ Pack Gourmand من هوبا - 3 نكهات × 700g أصيلة 100% ✦",
    deliveryText: "🚚 توصيل سريع ومجاني لجميع المدن المغربية والدفع عند الاستلام بعد المعاينة",
  },

  // رابط الـ Webhook الخاص بـ Google Sheet لتسجيل الطلبيات تلقائياً (محمي ومخفي)
  googleSheetWebhookUrl: getHiddenWebhookUrl(),

  // 2. الباك (Variants & Pricing): عنصر واحد بثمن واحد
  variants: [
    {
      id: "pack",
      name: "Pack Gourmand: 3 نكهات (أملو + كاجو + بيستاش)",
      shortName: "Pack Gourmand",
      weight: "3 × 700g",
      price: PACK_PRICE,
      oldPrice: PACK_OLD_PRICE,
      discountPercentage: PACK_DISCOUNT,
      badge: "عرض مميز ⭐",
      tagline: "أملو اللوز + أملو الكاجو + أملو البيستاش، مع عسل حر وزيت أركان أصيل",
      icon: "🎁",
      borderClass: "border-amber-700/40",
      bgLightClass: "bg-amber-50/50",
      badgeColorClass: "bg-amber-700 text-amber-50",
    },
  ] as ProductVariant[],

  // 3. الشريط الإخباري العلوي (Top Announcement Bar)
  announcement: {
    text: "ستصلك طلبيتك كما هي معروضة في هذه الصفحة: 3 قنينات بحجم 700g والتوصيل مجاني لجميع المدن 🇲🇦",
  },

  // 4. بطاقات الثقة والضمانات (Trust Guarantees)
  guarantees: [
    {
      id: "natural",
      title: "جميع المنتجات طبيعية أصيلة 100%",
      description: "لوز، كاجو، وبيستاش فاخر مع زيت أركان أصيل وعسل حر بدون أي مواد حافظة.",
      colorClass: "border-emerald-600 text-[#134938] bg-[#1b7056]",
      iconType: "leaf",
    },
    {
      id: "weight",
      title: "3 قنينات بالحجم العائلي 700g",
      description: "قنينات زجاجية كبيرة بوزن صافي 700 غرام لكل واحدة، معبأة بأعلى معايير الجودة والنظافة.",
      colorClass: "border-[#b57a2c] text-[#965e18] bg-[#b57a2c]",
      iconType: "package",
    },
    {
      id: "return",
      title: "معاينة الطرد والدفع عند الاستلام",
      description: "افتح طردك وعاين طلبك قبل الأداء مع إمكانية الإرجاع أو الاستبدال بكل سهولة.",
      colorClass: "border-[#2b72d6] text-[#1f5cb5] bg-[#2b72d6]",
      iconType: "rotate",
    },
    {
      id: "support",
      title: "خدمة ومتابعة مستمرة للزبائن",
      description: "فريقنا متوفر للإجابة على استفساراتكم ومتابعة طلبيتكم خطوة بخطوة حتى باب منزلكم.",
      colorClass: "border-[#7636a8] text-[#642894] bg-[#7636a8]",
      iconType: "message",
    },
  ],

  // 6. روابط وسياسات التذييل (Footer Policies)
  policies: {
    terms: {
      title: "شروط الاستخدام",
      content: [
        "مرحباً بكم. عند تقديم أي طلب عبر هذه الصفحة، فإنكم تؤكدون صحة معلومات الاتصال والعنوان لتسهيل عملية التوصيل من قبل موزعنا المعتمد.",
        "يتم الدفع نقداً عند استلام الطرد ومعاينته. يحق للزبون فحص المحتويات للتأكد من مطابقتها قبل التسليم.",
      ],
    },
    returnPolicy: {
      title: "سياسة الاستبدال والاسترجاع",
      content: [
        "نضمن لكم جودة وأصالة منتجاتنا 100%. في حال وجود أي ملاحظة أو تلف أثناء التوصيل، يحق لكم استبدال المنتج أو استرجاع المبلغ بكل بساطة.",
        "تواصلوا معنا عبر خدمة الزبائن المتوفرة طيلة أيام الأسبوع لمعالجة طلبكم فوراً وبدون أي تعقيد.",
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      content: [
        "نحن نولي خصوصيتكم أهمية قصوى. بياناتكم المدخلة (الاسم، الهاتف) تستخدم حصرياً لمعالجة طلبيتكم والتواصل معكم بخصوص التوصيل.",
        "لا نقوم أبداً ببيع أو مشاركة بياناتكم الشخصية مع أي طرف ثالث غير معني بعملية التوصيل.",
      ],
    },
  },
};
