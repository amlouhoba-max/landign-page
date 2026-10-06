export interface BundleOffer {
  id: string;
  name: string;
  subtitle: string;
  weightText: string;
  potsCount: number;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  isPopular?: boolean;
  freeShipping: boolean;
  features: string[];
}

export interface CustomerOrder {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  bundleId: string;
  bundleName: string;
  potsCount: number;
  totalPrice: number;
  shippingFee: number;
  notes?: string;
  status: 'confirmed' | 'preparing' | 'in_transit' | 'delivered';
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  bundleBought: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'delivery' | 'ingredients' | 'payment' | 'usage';
}
