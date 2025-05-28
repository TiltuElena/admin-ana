import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  // orders$ = new BehaviorSubject<any>([]);
  currentOrder$ = new BehaviorSubject<any>({});
  constructor() { }
}
