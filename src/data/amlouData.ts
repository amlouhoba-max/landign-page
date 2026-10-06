import { BundleOffer, CustomerReview, FaqItem } from '../types';

export const MOROCCAN_CITIES = [
  'الدار البيضاء (Casablanca)',
  'الرباط (Rabat)',
  'مراكش (Marrakech)',
  'فاس (Fès)',
  'طنجة (Tanger)',
  'أكادير (Agadir)',
  'مكناس (Meknès)',
  'القنيطرة (Kénitra)',
  'وجدة (Oujda)',
  'تطوان (Tétouan)',
  'تمارة (Témara)',
  'سلا (Salé)',
  'الجديدة (El Jadida)',
  'أسفي (Safi)',
  'المحمدية (Mohammédia)',
  'بني ملال (Béni Mellal)',
  'خريبكة (Khouribga)',
  'الناظور (Nador)',
  'سطات (Settat)',
  'العيون (Laâyoune)',
  'تارودانت (Taroudant)',
  'الصويرة (Essaouira)',
  'برشيد (Berrechid)',
  'تازة (Taza)',
  'كلميم (Guelmim)',
  'الداخلة (Dakhla)',
  'ورزازات (Ouarzazate)',
  'إفران (Ifrane)',
  'العرائش (Larache)',
  'مدينة أخرى (تحديد في العنوان)'
];

export interface GiftItem {
  name: string;
  weight: string;
  image: string;
}

export const FREE_GIFTS: GiftItem[] = [
  { name: 'شهدة عسل طبيعي', weight: '250g', image: 'شهدة' },
  { name: 'زعفران حر أصلي', weight: '0.5g', image: 'زعفران' },
  { name: 'بذور القاطونة', weight: '100g', image: 'القاطونة' },
  { name: 'أوراق المورينجا', weight: '100g', image: 'المورينجا' },
  { name: 'مكسرات يابانية', weight: '100g', image: 'مكسرات' },
];

export const BUNDLE_CONTENTS = [
  'علبة أملو HOBA تقليدي مغربي (250 غرام)'
];

export const BUNDLE_OFFERS: BundleOffer[] = [
  {
    id: 'bundle-hoba-78',
    name: 'أملو HOBA التقليدي المغربي',
    subtitle: 'علبة 250 غرام بتعبئة احترافية',
    weightText: '250 غرام صافي',
    potsCount: 1,
    price: 78,
    originalPrice: 120,
    discountBadge: 'بتعبئة احترافية',
    isPopular: true,
    freeShipping: true,
    features: [
      'علبة أملو HOBA بوزن 250 غرام',
      'لوز بلدي محمر + زيت أركان معصور على البارد + عسل حر',
      '100% طبيعي بدون سكر وبدون زيت النخيل',
      'الدفع عند الاستلام مع حق المعاينة والفحص'
    ]
  },
  {
    id: 'bundle-amlou-219',
    name: 'باقة أملو HOBA التوفيرية',
    subtitle: 'علبتين أملو باللوز والأركان (500 غرام)',
    weightText: '2 × 250 غ = 500 غ',
    potsCount: 2,
    price: 219,
    originalPrice: 258,
    discountBadge: 'وفّر 39 درهم + توصيل مجاني',
    isPopular: false,
    freeShipping: true,
    features: [
      'علبتين أملو HOBA فاخر باللوز البلدي وزيت الأركان والعسل',
      'توصيل مجاني لباب بيتك بجميع مدن المغرب',
      'افحص المنتج ثم ادفع نقدًا عند الاستلام',
      '100% طبيعي بدون سكر وبدون زيت النخيل'
    ]
  },
  {
    id: 'bundle-amlou-129',
    name: 'باقة أملو HOBA التجريبية',
    subtitle: 'علبة واحدة (250 غرام) للتذوق',
    weightText: 'علبة واحدة 250 غ',
    potsCount: 1,
    price: 129,
    originalPrice: 149,
    discountBadge: 'تجربة فردية',
    isPopular: false,
    freeShipping: false,
    features: [
      'علبة أملو HOBA بوزن 250 غرام',
      'لوز بلدي + زيت الأركان + عسل حر',
      'توصيل إلى باب البيت (20 درهم مصاريف شحن)',
      'معاينة قبل الدفع'
    ]
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'رشيد المرابط',
    city: 'الدار البيضاء',
    rating: 5,
    date: 'منذ يومين',
    comment: 'الباقة وصلتني كما هي في الصورة تماماً بجميع العلب والهدايا الخمسة. العسل رائع جداً والأملو أصلي ومحمر على حق وطريق. الموزع كان محترم وخلاّني نفحص كلشي عاد خلصت. شكراً لكم.',
    bundleBought: 'الباقة الكبرى الشاملة 450 درهم',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'فاطمة الزهراء',
    city: 'الرباط',
    rating: 5,
    date: 'منذ 4 أيام',
    comment: 'الشهدة والزعفران الحر حقيقيين والجودة لا يعلى عليها. كمية وفيرة واقتصادية بزاف مقارنة بالأسواق العادية.',
    bundleBought: 'الباقة الكبرى الشاملة 450 درهم',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'أحمد التازي',
    city: 'مراكش',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'الأملو ممتاز ولذيذ جداً وزيت الأركان طالع فيه مزيان. استلمت الطرد في 24 ساعة بمراكش.',
    bundleBought: 'باقة أملو HOBA التوفيرية',
    verified: true
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'هل المنتجات والهدايا تصلني كما هي معروضة في الصورة؟',
    answer: 'نعم بكل تأكيد! التزامنا واضح: ستصلك طلبيتك كما هي معروضة في هذه الصفحة بجميع المنتجات والأوزان المبينة بكل وضوح بما فيها الهدايا المجانية الخمسة.',
    category: 'delivery'
  },
  {
    question: 'هل يمكنني فحص ومعاينة الطرد قبل الدفع؟',
    answer: 'نعم 100%! يحق لك فتح الطرد بحضور موزع التوصيل والتأكد من سلامة جميع المنتجات والأوزان قبل دفع درهم واحد.',
    category: 'payment'
  },
  {
    question: 'كم يستغرق التوصيل وهل هو مجاني؟',
    answer: 'التوصيل مجاني 100% لباقة 450 درهم وباقة 219 درهم ويستغرق من 24 إلى 48 ساعة فقط إلى باب بيتك بجميع مدن وقرى المغرب.',
    category: 'delivery'
  }
];

export const HEALTH_BENEFITS = [
  {
    title: 'طاقة طبيعية ونشاط يومي',
    desc: 'غني بالسعرات الحرارية الصحية والدهون الأحادية غير المشبعة التي تمنحك حيوية ونشاطاً يدوم طوال اليوم دون هبوط في مستوى السكر.',
    iconName: 'Zap'
  },
  {
    title: 'مضادات أكسدة وفيتامين E',
    desc: 'زيت الأركان الصافي واللوز البلدي يعتبران من أغنى المصادر الطبيعية بمضادات الأكسدة التي تحمي الخلايا وتدعم نضارة البشرة وصحة القلب.',
    iconName: 'Heart'
  },
  {
    title: 'بديل صحي وخالي من زيت النخيل',
    desc: 'خالٍ تماماً من السكر الأبيض المكرر وزيت النخيل والمواد الحافظة، مما يجعله الفطور المثالي والمغذي لجميع أفراد العائلة والأطفال.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'مثالي للرياضيين وبناء الجسم',
    desc: 'مصدر نباتي غني بالبروتين والألياف والمعادن الأساسية للمساعدة في تعافي العضلات والشعور بالشبع.',
    iconName: 'Sparkles'
  }
];

