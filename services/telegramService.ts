
import { BookingState } from '../types';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';

export const formatBookingMessage = (booking: BookingState, total: number, lang: string): string => {
  return `
<b>НОВАЯ БРОНЬ (New Booking)</b>

<b>Имя:</b> ${sanitize(booking.name)}
<b>Телефон:</b> ${sanitize(booking.phone)}
<b>Заезд:</b> ${booking.checkIn}
<b>Выезд:</b> ${booking.checkOut}
<b>Номер:</b> ${booking.roomType}
<b>Гости:</b> ${booking.adults} взр, ${booking.children} дет
<b>Доп. мест:</b> ${booking.extraBeds}
<b>Сумма:</b> ${total} KGS

<b>Комментарий:</b>
${sanitize(booking.comment || 'Нет комментария')}

Язык: ${lang.toUpperCase()}
`;
};

// Helper to prevent HTML errors in Telegram
const sanitize = (text: string) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// Direct send function - works from browser even if Google Sheet fails
export const sendTelegramDirectly = async (message: string): Promise<void> => {
  const token = TELEGRAM_BOT_TOKEN;
  const chatId = TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
      console.warn('Telegram token or chat ID missing');
      return;
  }

  // We use GET request which is allowed by Telegram API and simpler for no-cors
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

  try {
    // mode: 'no-cors' is crucial here. It allows the browser to send the request 
    // without waiting for a CORS handshake (which Telegram doesn't support for browsers).
    // We won't know if it succeeded (response is opaque), but the message will be sent.
    await fetch(url, {
      method: 'GET', 
      mode: 'no-cors'
    });
    console.log('Direct Telegram request sent');
  } catch (e) {
    console.error('Direct Telegram send failed', e);
  }
};
