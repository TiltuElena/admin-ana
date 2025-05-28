import { Workplace } from './workplace';
import { BookingStatus } from '../enums/booking-status';

export interface Booking {
  id: number;
  workplace: Workplace;
  booked_from: Date;
  booked_until: Date;
  booked_by: number;
  current_status: BookingStatus;
}
