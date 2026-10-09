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

const STORAGE_KEY = 'hoba_orders_data_v1';

export const orderService = {
  /**
   * استرجاع جميع الطلبيات المسجلة
   */
  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
      return [];
    }
  },

  /**
   * حفظ الطلبيات محلياً
   */
  saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  },

  /**
   * إنشاء طلب جديد وإرساله تلقائياً إلى Google Sheets
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
    const orders = this.getOrders();
    const nextNumber = 7001 + orders.length;

    const newOrder: Order = {
      id: `HBA-${nextNumber}`,
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

    const updated = [newOrder, ...orders];
    this.saveOrders(updated);

    // إرسال الطلب لـ Google Sheets في الخلفية
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

