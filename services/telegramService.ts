
import { BookingState } from '../types';

export const formatBookingMessage = (booking: BookingState, total: number, lang: string): string => {
  return `
🏨 <b>НОВАЯ БРОНЬ (New Booking)</b>

👤 <b>Имя:</b> ${booking.name}
📱 <b>Телефон:</b> ${booking.phone}
📅 <b>Заезд:</b> ${booking.checkIn}
📅 <b>Выезд:</b> ${booking.checkOut}
🛏 <b>Номер:</b> ${booking.roomType}
👥 <b>Гости:</b> ${booking.adults} взр, ${booking.children} дет
🛌 <b>Доп. мест:</b> ${booking.extraBeds}
💰 <b>Сумма:</b> ${total} KGS

💬 <b>Комментарий:</b>
${booking.comment || 'Нет комментария'}

🌐 Язык пользователя: ${lang.toUpperCase()}
`;
};

// We removed the direct `sendTelegramMessage` function because we now route calls 
// through Google Apps Script to avoid CORS and expose tokens unnecessarily.
