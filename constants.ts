
import { RoomCategory, RoomDetails, Language } from './types';

// Season Dates: These are now ignored by logic but kept for reference
export const SEASON_START_MONTH = 3; // April (0-indexed)
export const SEASON_START_DAY = 1;
export const SEASON_END_MONTH = 10; // November (0-indexed)
export const SEASON_END_DAY = 1;

// TELEGRAM CONFIG
export const TELEGRAM_BOT_TOKEN = '8599456671:AAEoJM0kn41qpxdoOLXm6cdsiAMCiEiPMNw';
export const TELEGRAM_CHAT_ID = '211751883';

// CRM / WEBHOOK CONFIG (Google Sheets, Zoho CRM, Zapier)
// ИНСТРУКЦИЯ:
// 1. Создайте Google Таблицу и Apps Script (см. инструкцию в чате)
// 2. Опубликуйте как Web App (доступ: "Anyone")
// 3. Вставьте полученную ссылку ниже вместо текста в кавычках
export const CRM_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw-jiz_RfA2PDvDrdyKjBIjtcN2iFjT8xA32CtqbY52Lao7YwasGkBbZ_YEh8F7baAy/exec';

export const ROOMS: Record<RoomCategory, RoomDetails> = {
  [RoomCategory.LUX]: {
    id: RoomCategory.LUX,
    title: {
      ru: 'Люкс',
      kg: 'Люкс',
      en: 'Luxury Suite'
    },
    description: {
      ru: 'Просторный номер для семьи. 2 взрослых + 2 детей.',
      kg: 'Үй-бүлө үчүн кенен бөлмө. 2 чоң + 2 бала.',
      en: 'Spacious suite for families. 2 adults + 2 children.'
    },
    capacity: 4,
    price: 18000,
    priceType: 'per_room',
    totalRooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop',
    amenities: ['TV', 'Wi-Fi', 'Private Bath', 'Mountain View']
  },
  [RoomCategory.STANDARD]: {
    id: RoomCategory.STANDARD,
    title: {
      ru: 'Стандарт',
      kg: 'Стандарт',
      en: 'Standard'
    },
    description: {
      ru: 'Комфортный номер вместимостью до 6 человек.',
      kg: '6 адамга чейин ыңгайлуу бөлмө. 2 чоң + 4 бала.',
      en: 'Comfortable room for up to 6 people.'
    },
    capacity: 6,
    price: 5000,
    priceType: 'per_person',
    extraBedPrice: 2000,
    totalRooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
    amenities: ['Shared Bath', 'Heating', 'Wardrobe']
  },
  [RoomCategory.ECONOM]: {
    id: RoomCategory.ECONOM,
    title: {
      ru: 'Эконом',
      kg: 'Эконом',
      en: 'Economy'
    },
    description: {
      ru: 'Уютный двухместный номер.',
      kg: 'Жайлуу эки орундуу бөлмө. 2 чоң + 4 бала.',
      en: 'Cozy twin room.'
    },
    capacity: 2,
    price: 3000,
    priceType: 'per_person',
    extraBedPrice: 2000,
    totalRooms: 24,
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop',
    amenities: ['Basic furnishings', 'Shared facilities']
  },
  [RoomCategory.MINE]: {
    id: RoomCategory.MINE,
    title: {
      ru: 'Лечебная Шахта',
      kg: 'Дарылоо шахтасы',
      en: 'Healing Mine'
    },
    description: {
      ru: 'Койко-место в соляной шахте. Доступно только при полной занятости номеров.',
      kg: 'Туз шахтасындагы орун. Бөлмөлөр толуп калганда гана берилет.',
      en: 'Bed in the salt mine. Available only when rooms are fully booked.'
    },
    capacity: 1,
    price: 1500,
    priceType: 'per_person',
    totalRooms: 130,
    imageUrl: 'https://images.unsplash.com/photo-1515362655824-9a84dddb130c?q=80&w=1000&auto=format&fit=crop',
    amenities: ['Underground therapy', 'Sleeping bag', 'Medical supervision']
  }
};

export const TRANSLATIONS = {
  nav: {
    home: { ru: 'Главная', kg: 'Башкы', en: 'Home' },
    about: { ru: 'О нас', kg: 'Биз жөнүндө', en: 'About' },
    rooms: { ru: 'Номера', kg: 'Бөлмөлөр', en: 'Rooms' },
    booking: { ru: 'Бронирование', kg: 'Брондоо', en: 'Booking' },
    faq: { ru: 'FAQ', kg: 'Суроолор', en: 'FAQ' },
    contacts: { ru: 'Контакты', kg: 'Байланыш', en: 'Contacts' },
  },
  season: {
    open: { ru: 'РАБОТАЕМ КРУГЛЫЙ ГОД', kg: 'ЖЫЛ БОЮ ИШТЕЙБИЗ', en: 'OPEN YEAR ROUND' },
    closed: { ru: 'СЕЗОН ЗАКРЫТ', kg: 'СЕЗОН ЖАБЫК', en: 'SEASON CLOSED' },
    closedMsg: { ru: 'Оставить заявку на будущий сезон', kg: 'Кийинки сезонго арыз калтыруу', en: 'Request for next season' }
  },
  calculator: {
    title: { ru: 'Бронирование', kg: 'Брондоо', en: 'Booking' },
    tabs: {
        calc: { ru: 'Калькулятор', kg: 'Калькулятор', en: 'Calculator' },
        calendar: { ru: 'Календарь занятости', kg: 'Бош орундар', en: 'Availability' }
    },
    checkIn: { ru: 'Заезд', kg: 'Келүү', en: 'Check-in' },
    checkOut: { ru: 'Выезд', kg: 'Кетүү', en: 'Check-out' },
    adults: { ru: 'Взрослых', kg: 'Чоңдор', en: 'Adults' },
    children: { ru: 'Детей', kg: 'Балдар', en: 'Children' },
    extraBed: { ru: 'Доп. кровать', kg: 'Кошумча керебет', en: 'Extra bed' },
    total: { ru: 'Итого к оплате', kg: 'Жалпы төлөм', en: 'Total Due' },
    subtotal: { ru: 'Сумма', kg: 'Сумма', en: 'Subtotal' },
    bookBtn: { ru: 'Забронировать', kg: 'Забронировать', en: 'Book Now' },
    perDay: { ru: 'сутки', kg: 'түн', en: 'nights' },
    som: { ru: 'сом', kg: 'сом', en: 'KGS' },
    promoCode: { ru: 'Промокод', kg: 'Промокод', en: 'Promo Code' },
    apply: { ru: 'Применить', kg: 'Колдонуу', en: 'Apply' },
    discount: { ru: 'Скидка', kg: 'Арзандатуу', en: 'Discount' },
    fillContact: { ru: 'Контактные данные', kg: 'Байланыш маалыматтары', en: 'Contact Details' }
  },
  form: {
    name: { ru: 'Ваше имя', kg: 'Атыңыз', en: 'Your Name' },
    phone: { ru: 'Телефон (WhatsApp)', kg: 'Телефон (WhatsApp)', en: 'Phone (WhatsApp)' },
    comment: { ru: 'Комментарий', kg: 'Комментарий', en: 'Comment' },
    submit: { ru: 'Отправить заявку', kg: 'Арызды жөнөтүү', en: 'Submit Request' },
    success: { ru: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', kg: 'Арыз ийгиликтүү жөнөтүлдү! Биз сиз менен жакында байланышабыз.', en: 'Request sent successfully! We will contact you shortly.' },
    error: { ru: 'Ошибка отправки. Пожалуйста, позвоните нам.', kg: 'Жөнөтүү катасы. Сураныч, бизге чалыңыз.', en: 'Sending error. Please call us.' }
  }
};
