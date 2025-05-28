import { Injectable } from '@angular/core';
import { RoomService } from './modules/room.service';
import { CustomerService } from './modules/customer.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public readonly room: RoomService,
    public readonly customers: CustomerService,
  ) {}
}
