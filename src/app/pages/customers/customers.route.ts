import { Routes } from '@angular/router';

export const customersRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./customers.component').then((m) => m.CustomersComponent),
  },
];
