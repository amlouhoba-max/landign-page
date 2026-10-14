export type OrderStatus = 'new' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
import { storeConfig } from '../config/storeConfig';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  variantId: string;
  variantName: string;
  weight: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

// مسح أي بيانات سابقة لزبائن من المتصفح لضمان الخصوصية التامة
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('hoba_orders_data_v1');
  }
} catch {
  // ignore
}

export const orderService = {
  /**
   * عدم تخزين أو عرض بيانات الزبائن السابقين لضمان الخصوصية والأمان
   */
  getOrders(): Order[] {
    return [];
  },

  /**
   * إنشاء طلب جديد وإرساله مباشرة إلى Google Sheets بدون حفظ بيانات الناس السابقة في المتصفح
   */
  createOrder(orderData: {
    customerName: string;
    phone: string;
    variantId: string;
    variantName: string;
    weight: string;
    price: number;
    quantity?: number;
    notes?: string;
  }): Order {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: `HBA-${randomSuffix}`,
      customerName: orderData.customerName,
      phone: orderData.phone,
      variantId: orderData.variantId,
      variantName: orderData.variantName,
      weight: orderData.weight || '700g',
      price: orderData.price,
      quantity: orderData.quantity || 1,
      totalPrice: orderData.price * (orderData.quantity || 1),
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: orderData.notes || '',
    };

    // إرسال الطلب لـ Google Sheets في الخلفية مباشرة
    this.syncToGoogleSheets(newOrder);

    return newOrder;
  },

  /**
   * الحصول على رابط Webhook الخاص بـ Google Sheet
   */
  getGoogleSheetWebhookUrl(): string {
    return localStorage.getItem('hoba_google_sheet_url') || storeConfig.googleSheetWebhookUrl || '';
  },

  /**
   * إرسال الطلب تلقائياً إلى Google Sheet عبر Webhook
   */
  syncToGoogleSheets(order: Order): void {
    const url = this.getGoogleSheetWebhookUrl();
    if (!url) return;

    try {
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      }).catch((err) => {
        console.warn('Google Sheet sync background notice:', err);
      });
    } catch (e) {
      console.warn('Google Sheet webhook trigger exception:', e);
    }
  },
};

