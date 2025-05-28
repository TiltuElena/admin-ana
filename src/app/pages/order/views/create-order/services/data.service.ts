import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  workplaces$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }
}
