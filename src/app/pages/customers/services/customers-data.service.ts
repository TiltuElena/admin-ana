import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersDataService {
  customers$ = new BehaviorSubject<any>([]);
  currentCustomer$ = new BehaviorSubject<any>([]);
  defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s';
  constructor() {}
}
