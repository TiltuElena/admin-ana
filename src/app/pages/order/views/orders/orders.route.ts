import { Routes } from '@angular/router';

export const ordersRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./orders.component').then((m) => m.OrdersComponent),
  },
];
