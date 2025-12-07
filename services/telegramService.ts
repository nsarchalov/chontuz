


import { BookingState } from '../types';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';

export const formatBookingMessage = (booking: BookingState, total: number, lang: string): string => {
  return `
<b>📅 НОВАЯ БРОНЬ (New Booking)</b>

👤 <b>Имя:</b> ${sanitize(booking.name)}
📞 <b>Телефон:</b> ${sanitize(booking.phone)}
📧 <b>Email:</b> ${sanitize(booking.email || 'Не указан')}
--------------------------------
📥 <b>Заезд:</b> ${booking.checkIn}
📤 <b>Выезд:</b> ${booking.checkOut}
🏠 <b>Номер:</b> ${booking.roomType}
👥 <b>Гости:</b> ${booking.adults} взр, ${booking.children} дет
🛏 <b>Доп. мест:</b> ${booking.extraBeds}
--------------------------------
💰 <b>Сумма:</b> ${total} KGS
🏳️ <b>Язык:</b> ${lang.toUpperCase()}

💬 <b>Комментарий:</b>
${sanitize(booking.comment || 'Нет комментария')}
`;
};

// Helper to prevent HTML errors in Telegram
const sanitize = (text: string) => {
    if (!text) return '';
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const sendToTelegramId = async (chatId: string, message: string, token: string) => {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    // Using FormData is the most robust way to send complex data via POST in no-cors mode
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);
    formData.append('parse_mode', 'HTML');

    try {
        await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Essential for browser-to-Telegram direct communication
            body: formData
        });
        console.log(`Attempted send to ${chatId}`);
    } catch (e) {
        console.error(`Failed to send to ${chatId}`, e);
    }
};

// Direct send function - tries multiple ID formats to ensure delivery
export const sendTelegramDirectly = async (message: string): Promise<void> => {
  const token = TELEGRAM_BOT_TOKEN;
  let chatId = TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
      console.warn('Telegram token or chat ID missing');
      return;
  }

  // Clean the ID (remove whitespace)
  chatId = chatId.trim();

  // STRATEGY: Try sending to the provided ID. 
  // If it doesn't start with -100, ALSO try sending to the -100 prefixed version.
  // This covers both "Standard Group" and "Supergroup" ID formats automatically.

  const promises = [];

  // 1. Send to exact provided ID
  promises.push(sendToTelegramId(chatId, message, token));

  // 2. If it looks like a group ID (starts with -) but not a supergroup (-100), try the supergroup version
  if (chatId.startsWith('-') && !chatId.startsWith('-100')) {
      // Convert -123456 to -100123456
      const superGroupId = '-100' + chatId.substring(1);
      console.log('Also trying supergroup ID:', superGroupId);
      promises.push(sendToTelegramId(superGroupId, message, token));
  }

  await Promise.all(promises);
};
