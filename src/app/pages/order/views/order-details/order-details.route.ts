import { Routes } from '@angular/router';

export const orderDetailsRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./order-details.component').then((m) => m.OrderDetailsComponent),
  },
];
