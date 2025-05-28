import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  getData() {
    return [
      {
        id: 1000,
        user: {
          name: 'Alle Mare',
          id: 23,
        },
        createdAt: '2015/09/13',
        status: 'new',
        booked_from: '2024/03/19',
        booked_to: '2024/03/21',
        workplaces: [
          {
            id: 100,
            room_id: 435,
          },
          {
            id: 101,
            room_id: 445,
          },
        ],
        total_price: 45345,
      },
      {
        id: 1001,
        user: {
          name: 'Alle Mare',
          id: 23,
        },
        createdAt: '2016/09/13',
        status: 'confirmed',
        booked_from: '2024/03/19',
        booked_to: '2024/03/21',
        workplaces: [
          {
            id: 120,
            room_id: 435,
          },
        ],
        total_price: 345,
      },{
        id: 1002,
        user: {
          name: 'Hanah Eje',
          id: 23,
        },
        createdAt: '2015/09/13',
        status: 'rejected',
        booked_from: '2024/03/19',
        booked_to: '2024/03/21',
        workplaces: [
          {
            id: 100,
            room_id: 435,
          },
          {
            id: 101,
            room_id: 445,
          },
          {
            id: 102,
            room_id: 5,
          },
          {
            id: 103,
            room_id: 65,
          },
          {
            id: 104,
            room_id: 145,
          },
          {
            id: 105,
            room_id: 405,
          },
        ],
        total_price: 856745,
      },
    ];
  }

  getRoomsWithWorkplaces(){
    return [
      {
        room_id: 1,
        workplaces: [
          {
            workplace_id: 1,
            name: 'Workplace 1 of room 1',
            description: 'amazing'
          },
          {
            workplace_id: 2,
            name: 'Workplace 2 of room 1',
            description: 'amazing'
          },
          {
            workplace_id: 3,
            name: 'Workplace 3 of room 1',
            description: 'amazing'
          },
          {
            workplace_id: 4,
            name: 'Workplacce 4 of room 1',
            description: 'amazing'
          }
        ]
      },
      {
        room_id: 2,
        workplaces: [
          {
            workplace_id: 5,
            name: 'Workplace 1 of room 2',
            description: 'amazing'
          },
          {
            workplace_id: 6,
            name: 'Workplace 2 of room 2',
            description: 'amazing'
          }
        ]
      }
    ]
  }
  constructor(private readonly httpService: HttpService) {}

  getOrders() {
    return Promise.resolve(this.getData());
  }

  public getAll(): Observable<any> {
    return this.httpService.get<any>('/bookings/all-with-details');
  }

  public getById(id: number): Observable<any> {
    return this.httpService.get<any>(`/bookings/${id}`);
  }

  public getRecent(): Observable<any> {
    return this.httpService.get<any>('/bookings/recent');
  }

  public getNumberOfNewOrders(): Observable<any> {
    return this.httpService.get<any>('/bookings/status/new');
  }

  public getNumberOfConfirmedOrders(): Observable<any> {
    return this.httpService.get<any>('/bookings/status/confirmed');
  }

  public getNumberOfRejectedOrders(): Observable<any> {
    return this.httpService.get<any>('/bookings/status/rejected');
  }

  public getTotalNumberOfrders(): Observable<any> {
    return this.httpService.get<any>('/bookings/total-bookings');
  }

  public getTotalPriceOfrders(): Observable<any> {
    return this.httpService.get<any>('/bookings/total-booking-price');
  }
}
