
import { BookingState } from '../types';
import { CRM_WEBHOOK_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';

export interface OccupancyData {
  [date: string]: {
    [roomType: string]: number;
  };
}

export const submitBookingToCRM = async (booking: BookingState, total: number, lang: string, telegramMessage?: string): Promise<boolean> => {
  // If the URL is not configured (or is the default placeholder), we just log and return true (simulated success)
  if (!CRM_WEBHOOK_URL || (CRM_WEBHOOK_URL as string).includes('YOUR_GOOGLE')) {
    console.log('CRM Integration: Webhook URL not set. Logging data:', { ...booking, total, lang });
    return true; 
  }

  // Generic payload structure suitable for Zoho Flow, Zapier, or Google Sheets
  // We include Telegram fields so the Backend (Google Script) can handle the sending securely
  const data = {
    ...booking,
    totalPrice: total,
    language: lang,
    timestamp: new Date().toISOString(),
    source: 'Website - CHONTUZ.KG',
    telegramToken: TELEGRAM_BOT_TOKEN,
    telegramChatId: TELEGRAM_CHAT_ID,
    telegramMessage: telegramMessage
  };

  try {
    // We use no-cors mode because many webhooks (Google Scripts, some Zapier) don't return proper CORS headers for browser fetch.
    // For Google Apps Script, 'no-cors' + 'Content-Type: text/plain' is the most reliable way to send data without preflight errors.
    await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    return true;
  } catch (error) {
    console.error('CRM Submit Error:', error);
    return false;
  }
};

export const fetchOccupancy = async (): Promise<OccupancyData> => {
  if (!CRM_WEBHOOK_URL || (CRM_WEBHOOK_URL as string).includes('YOUR_GOOGLE')) {
    return {};
  }

  try {
    // Add timestamp to prevent caching
    const url = `${CRM_WEBHOOK_URL}?t=${new Date().getTime()}`;
    
    const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const text = await response.text();
    // Sometimes Google Script returns HTML error page if script fails, check if it looks like JSON
    if (text.trim().startsWith('<')) {
        console.error('CRM returned HTML instead of JSON:', text);
        return {};
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to fetch occupancy:', error);
    return {};
  }
};
