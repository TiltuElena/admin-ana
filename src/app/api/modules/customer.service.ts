import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getData() {
    return [
      {
        id: 1000,
        name: 'James Butt',
        createdAt: '2015/09/13',
        image: 'ionibowcher.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 3
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
        createdAt: '2019-02-09',
        image: 'amyelsner.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 9
      },
      {
        id: 1002,
        name: 'Art Venere',
        createdAt: '2017-05-13',
        image: 'asiyajavayant.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 0
      },
      {
        id: 1003,
        name: 'Lenna Paprocki',
        image: 'xuxuefeng.png',
        createdAt: '2020-09-15',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 7
      },
      {
        id: 1004,
        name: 'Donette Foller',
        createdAt: '2016-05-20',
        image: 'asiyajavayant.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 2
      },
      {
        id: 1005,
        name: 'Simona Morasca',
        createdAt: '2018-02-16',
        image: 'ivanmagalhaes.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 4
      },
      {
        id: 1006,
        name: 'Mitsue Tollner',
        image: 'ivanmagalhaes.png',
        createdAt: '2018-02-19',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 3
      },
      {
        id: 1007,
        name: 'Leota Dilliard',
        createdAt: '2019-08-13',
        image: 'onyamalimba.png',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 4
      },
      {
        id: 1008,
        name: 'Sage Wieser',
        image: 'ivanmagalhaes.png',
        createdAt: '2018-11-21',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 0
      },
      {
        id: 1009,
        name: 'Kris Marrier',
        image: 'onyamalimba.png',
        createdAt: '2015-07-07',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 6
      },
      {
        id: 1010,
        name: 'Minna Amigon',
        image: 'annafali.png',
        createdAt: '2018-11-07',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 1
      },
      {
        id: 1011,
        name: 'Abel Maclead',
        image: 'bernardodominic.png',
        createdAt: '2017-03-11',
        email: 'example@gmail.com',
        phone: '040586734',
        nrOfOrders: 0
      } ]
  }

  constructor(private readonly httpService: HttpService) {}

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  }

  public getAll(): Observable<any> {
    return this.httpService.get<any>('/user/all-with-details');
  }

  public getRecent(): Observable<any> {
    return this.httpService.get<any>('/user/recent');
  }

  public getTotalUsers(): Observable<any> {
    return this.httpService.get<any>('/user/total-users');
  }

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  }

  // getCustomers(params?: any) {
  //   return this.httpService
  //     .get<any>('https://www.primefaces.org/data/customers', { params: params })
  //
  // }

  public getMe(){
    return this.httpService.get<any>('/api/Order');
  }
}
