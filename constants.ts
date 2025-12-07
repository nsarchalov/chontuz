

import { RoomCategory, RoomDetails, Language } from './types';

// Season Dates: These are now ignored by logic but kept for reference
export const SEASON_START_MONTH = 3; // April (0-indexed)
export const SEASON_START_DAY = 1;
export const SEASON_END_MONTH = 10; // November (0-indexed)
export const SEASON_END_DAY = 1;

// TELEGRAM CONFIG
export const TELEGRAM_BOT_TOKEN = '8599456671:AAEoJM0kn41qpxdoOLXm6cdsiAMCiEiPMNw';
// ВНИМАНИЕ: Для отправки в ГРУППУ, ID должен начинаться с -100 (для супергрупп) или быть отрицательным числом
export const TELEGRAM_CHAT_ID = '-5050173306'; 

// CRM / WEBHOOK CONFIG (Google Sheets, Zoho CRM, Zapier)
export const CRM_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw-jiz_RfA2PDvDrdyKjBIjtcN2iFjT8xA32CtqbY52Lao7YwasGkBbZ_YEh8F7baAy/exec';

// ADMIN PANEL CONFIG
export const ADMIN_PASSWORD = 'Brabus3005!'; 
export const GOOGLE_SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/1OOOO7uTTSURVPr2NsX8U3SozPYcmkhZF5EOlkIjI4u0/edit?gid=0#gid=0'; 

export const HERO_IMAGES = [
  'https://i.ibb.co/My4gyJ99/1111111.png', // Existing Mine
  'https://i.ibb.co/vCB5bF54/b6ac9c4f-0d6b-4b07-8b80-8dca9bc78ff2.jpg', // New 1
  'https://i.ibb.co/vvLhB8fm/4b22788d-b68f-461d-9c92-78270316db81.jpg', // New 2
  'https://i.ibb.co/HDsfsBqQ/042b0346-952f-441c-8224-c714d622dac1.jpg'  // New 3
];

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
    imageUrl: 'https://i.ibb.co/VcMn7gSr/9652ee08-3702-4996-80c3-8ed41ef31874.jpg',
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
    priceType: 'per_room', // Changed to per_room
    extraBedPrice: 2000,
    totalRooms: 4,
    imageUrl: 'https://i.ibb.co/CsHWtL2R/IMG-3736.jpg',
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
    priceType: 'per_room', // Changed to per_room
    extraBedPrice: 2000,
    totalRooms: 24,
    imageUrl: 'https://i.ibb.co/BHp16vWv/e8e972a3-3e59-4351-8ebe-addb4cb25c75.jpg',
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
    priceType: 'per_person', // Remains per_person
    totalRooms: 130, // 130 places
    imageUrl: 'https://i.ibb.co/5g9Kg5fc/0bd30d2b72776540f5788fd6a8aac932-450x600-fill.jpg',
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
  hero: {
    title: { ru: 'ЧОН-ТУЗ', kg: 'ЧОҢ-ТУЗ', en: 'CHON-TUZ' },
    subtitle: {
      ru: 'Уникальная спелеотерапия и комфортабельный отдых в санатории Чон-Туз. Восстановите силы природы.',
      kg: 'Чоң-Туз санаторийинде уникалдуу спелеотерапия жана ыңгайлуу эс алуу. Жаратылыш менен күчтөнүңүз.',
      en: 'Unique speleotherapy and comfortable rest in Chon-Tuz sanatorium. Restore your strength with nature.'
    }
  },
  features: {
    heading: { ru: 'Почему выбирают нас', kg: 'Эмне үчүн биз', en: 'Why Choose Us' },
    subheading: { ru: 'Природа, которая лечит', kg: 'Дарылоочу жаратылыш', en: 'Nature That Heals' },
    items: {
        location: {
            title: { ru: 'Уникальное расположение', kg: 'Уникалдуу жайгашуу', en: 'Unique Location' },
            desc: { 
              ru: 'Лечебница рассчитана на 120 мест и представляет собой галерею, прорубленную в толще горы на высоте более 2 километров над уровнем моря.', 
              kg: 'Дарылоочу жай 120 орунга эсептелген жана деңиз деңгээлинен 2 километрден ашык бийиктикте тоонун ичинен оюлган галерея болуп саналат.', 
              en: 'The sanatorium is designed for 120 places and is a gallery carved into the mountain at an altitude of more than 2 kilometers above sea level.' 
            }
        },
        therapy: {
            title: { ru: 'Спелеотерапия', kg: 'Спелеотерапия', en: 'Speleotherapy' },
            desc: { 
              ru: 'Чон-Туз - спелеологический санаторий представляет собой горизонтальную галерею в толще горы Кёк-Тоо, длиной 500 м, шириной 5 м, высотой 3 м.', 
              kg: 'Чоң-Туз спелеологиялык санаторийи Көк-Тоо тоосунун ичиндеги узундугу 500 м, туурасы 5 м, бийиктиги 3 м болгон горизонталдуу галерея.', 
              en: 'Chon-Tuz speleological sanatorium is a horizontal gallery inside the Kek-Too mountain, 500m long, 5m wide, 3m high.' 
            }
        }
    },
    indications: {
      title: { ru: 'МЫ ЛЕЧИМ:', kg: 'БИЗ ДАРЫЛАЙБЫЗ:', en: 'WE TREAT:' },
      list: [
        { ru: 'Хронический бронхит', kg: 'Өнөкөт бронхит', en: 'Chronic bronchitis' },
        { ru: 'Сезонную аллергию', kg: 'Мезгилдик аллергия', en: 'Seasonal allergies' },
        { ru: 'Аллергическую астму', kg: 'Аллергиялык астма', en: 'Allergic asthma' },
        { ru: 'Бронхиальную астму', kg: 'Бронхиалдык астма', en: 'Bronchial asthma' },
        { ru: 'Крапивницу', kg: 'Бөрү жатыш (Крапивница)', en: 'Urticaria (Hives)' }
      ]
    }
  },
  roomsPage: {
    title: { ru: 'Наши номера', kg: 'Биздин бөлмөлөр', en: 'Our Rooms' },
    desc: {
        ru: 'Выберите из нашего ассортимента комфортабельных номеров, подходящих для одиноких гостей, пар и больших семей.',
        kg: 'Жеке коноктор, түгөйлөр жана чоң үй-бүлөлөр үчүн ыңгайлуу бөлмөлөрдү тандаңыз.',
        en: 'Choose from our range of comfortable accommodations suited for individuals, couples, and large families.'
    },
    priceStart: { ru: 'Цена от', kg: 'Баасы', en: 'Price starts at' },
    places: { ru: 'спальных мест', kg: 'орун', en: 'sleeping places' }, // For Mine
    rooms: { ru: 'номеров', kg: 'бөлмө', en: 'rooms' }, // For other types
    max: { ru: 'Макс.', kg: 'Макс.', en: 'Max' }
  },
  bookingPage: {
    title: {
        ru: 'Планируйте ваше оздоровительное путешествие',
        kg: 'Ден соолук сапарыңызды пландаштырыңыз',
        en: 'Plan Your Health Journey'
    },
    desc: {
        ru: 'Проверьте наличие свободных мест и забронируйте ваше пребывание онлайн.',
        kg: 'Бош орундарды текшерип, онлайн брондоңуз.',
        en: 'Check availability and book your stay online.'
    }
  },
  contactsPage: {
    addressLabel: { ru: 'Наш адрес', kg: 'Биздин дарек', en: 'Our Address' },
    addressVal: { ru: 'Нарынская область, Кочкорский район, с. Чон-Туз', kg: 'Нарын облусу, Кочкор району, Чоң-Туз айылы', en: 'Naryn region, Kochkor district, Chon-Tuz village' },
    phonesLabel: { ru: 'Контакты', kg: 'Байланыш', en: 'Contacts' },
    socials: { ru: 'Мы в соцсетях', kg: 'Биз социалдык тармактарда', en: 'Follow us' }
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
    sending: { ru: 'Отправка...', kg: 'Жөнөтүлүүдө...', en: 'Sending...' },
    perDay: { ru: 'сутки', kg: 'түн', en: 'nights' },
    som: { ru: 'сом', kg: 'сом', en: 'KGS' },
    promoCode: { ru: 'Промокод', kg: 'Промокод', en: 'Promo Code' },
    apply: { ru: 'Применить', kg: 'Колдонуу', en: 'Apply' },
    discount: { ru: 'Скидка', kg: 'Арзандатуу', en: 'Discount' },
    discountApplied: { ru: 'скидка применена', kg: 'арзандатуу колдонулду', en: 'discount applied' },
    fillContact: { ru: 'Контактные данные', kg: 'Байланыш маалыматтары', en: 'Contact Details' },
    backToCalc: { ru: 'Вернуться к калькулятору', kg: 'Калькуляторго кайтуу', en: 'Back to Calculator' },
    makeAnother: { ru: 'Забронировать еще', kg: 'Дагы брондоо', en: 'Make another booking' }
  },
  calendar: {
    available: { ru: 'Свободно', kg: 'Бош', en: 'Available' },
    few: { ru: 'Мало мест', kg: 'Аз калды', en: 'Few left' },
    full: { ru: 'Занято', kg: 'Толук', en: 'Full' },
    cat: { ru: 'Категория', kg: 'Категория', en: 'Category' },
    places: { ru: 'мест', kg: 'орун', en: 'places' },
    loading: { ru: 'Загрузка данных...', kg: 'Маалымат жүктөлүүдө...', en: 'Loading data...' },
    source: { ru: 'Данные из CRM', kg: 'CRM маалыматы', en: 'Real-time CRM data' },
    sync: { ru: 'Синхронизация с CRM...', kg: 'CRM менен байланышуу...', en: 'Syncing with CRM...' }
  },
  form: {
    name: { ru: 'Ваше имя', kg: 'Атыңыз', en: 'Your Name' },
    phone: { ru: 'Телефон (WhatsApp)', kg: 'Телефон (WhatsApp)', en: 'Phone (WhatsApp)' },
    email: { ru: 'Email (не обязательно)', kg: 'Email (милдеттүү эмес)', en: 'Email (optional)' },
    comment: { ru: 'Комментарий', kg: 'Комментарий', en: 'Comment' },
    submit: { ru: 'Отправить заявку', kg: 'Арызды жөнөтүү', en: 'Submit Request' },
    success: { ru: 'Заявка успешно отправлена!', kg: 'Арыз ийгиликтүү жөнөтүлдү!', en: 'Request sent successfully!' },
    successSub: { ru: 'Менеджер свяжется с вами через WhatsApp.', kg: 'Менеджер сиз менен WhatsApp аркылуу байланышат.', en: 'Manager will contact you via WhatsApp.' },
    newBooking: { ru: 'Новое бронирование', kg: 'Жаңы брондоо', en: 'New Booking' },
    error: { ru: 'Ошибка отправки. Пожалуйста, позвоните нам.', kg: 'Жөнөтүү катасы. Сураныч, бизге чалыңыз.', en: 'Sending error. Please call us.' }
  },
  footer: {
    desc: {
        ru: 'Официальный сайт санатория Чон-Туз. Лечение и отдых в уникальных соляных шахтах Кыргызстана.',
        kg: 'Чоң-Туз санаторийинин расмий сайты. Кыргызстандын уникалдуу туз шахталарында дарылоо жана эс алуу.',
        en: 'Official website of Chon-Tuz Sanatorium. Treatment and relaxation in the unique salt mines of Kyrgyzstan.'
    },
    rights: { ru: 'Все права защищены.', kg: 'Бардык укуктар корголгон.', en: 'All rights reserved.' }
  },
  errors: {
    dateOrder: {
        ru: 'Дата выезда должна быть позже заезда',
        kg: 'Кетүү күнү келүү күнүнөн кийин болушу керек',
        en: 'Check-out must be after check-in'
    },
    fullyBooked: {
        ru: 'На выбранные даты нет свободных мест в этой категории',
        kg: 'Тандалган күндөргө бул категорияда бош орун жок',
        en: 'Selected dates are fully booked for this room type'
    }
  }
};