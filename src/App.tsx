/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomerOrder } from './types';
import { ScreenshotLanding } from './components/ScreenshotLanding';
import { OrderTrackerModal } from './components/OrderTrackerModal';

export default function App() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Local storage for customer orders
  const [savedOrders, setSavedOrders] = useState<CustomerOrder[]>(() => {
    try {
      const stored = localStorage.getItem('hoba_orders');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'HB-7214',
        date: 'أمس',
        customerName: 'سعيد الإدريسي',
        phone: '0661234567',
        city: 'الدار البيضاء (Casablanca)',
        address: 'حي المعاريف، زنقة 14',
        bundleId: 'bundle-hoba-78',
        bundleName: 'أملو HOBA تقليدي مغربي (250غ - بتعبئة احترافية)',
        potsCount: 1,
        totalPrice: 78,
        shippingFee: 0,
        status: 'in_transit',
      },
    ];
  });

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hoba_orders', JSON.stringify(savedOrders));
    } catch {
      // ignore
    }
  }, [savedOrders]);

  const handleOrderSubmitted = (order: CustomerOrder) => {
    setSavedOrders((prev) => [order, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#e9e6dd] flex flex-col items-center justify-start antialiased">
      {/* Centered high-conversion mobile frame matching user screenshot */}
      <ScreenshotLanding
        onOrderSubmitted={handleOrderSubmitted}
        onOpenTracker={() => setIsTrackerOpen(true)}
        ordersCount={savedOrders.length}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        savedOrders={savedOrders}
      />
    </div>
  );
}
