import { Booking } from './booking';

export interface Workplace {
  id: number;
  room_id?: number;
  name_en: string;
  name_ro: string;
  name_ru: string;
  booking_price: number;
  description_en: string;
  description_ro: string;
  description_ru: string;
  position_x: string;
  position_y: string;
  bookings: Booking[];
  isTemporary?: boolean;
  isNew?: boolean;
}
