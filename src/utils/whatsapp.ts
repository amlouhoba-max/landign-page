/**
 * WhatsApp integration constants and utility functions for HÔBA AMLOU
 * Reads from centralized storeConfig.ts
 */
import { STORE_CONFIG } from '../config/storeConfig';

export const WHATSAPP_PHONE_RAW = STORE_CONFIG.whatsapp.phoneNumber;
export const WHATSAPP_PHONE_DISPLAY = STORE_CONFIG.whatsapp.displayNumber;
export const WHATSAPP_DEFAULT_MESSAGE = STORE_CONFIG.whatsapp.defaultMessage;

/**
 * Builds the official WhatsApp direct chat link with pre-filled message
 * Works on iOS, Android, and Desktop WhatsApp Web
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || STORE_CONFIG.whatsapp.defaultMessage;
  return `https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
}
