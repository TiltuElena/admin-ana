import { Routes } from '@angular/router';

export const createOrderRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./create-order.component').then((m) => m.CreateOrderComponent),
  },
];
