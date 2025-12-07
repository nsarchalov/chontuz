
export type Language = 'ru' | 'kg' | 'en';

export enum RoomCategory {
  LUX = 'LUX',
  STANDARD = 'STANDARD',
  ECONOM = 'ECONOM',
  MINE = 'MINE'
}

export interface RoomDetails {
  id: RoomCategory;
  title: Record<Language, string>;
  description: Record<Language, string>;
  capacity: number; // base capacity
  price: number; // per unit (room or person depending on type)
  priceType: 'per_room' | 'per_person';
  totalRooms: number;
  extraBedPrice?: number;
  imageUrl: string;
  amenities: string[];
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: RoomCategory;
  extraBeds: number;
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
}
