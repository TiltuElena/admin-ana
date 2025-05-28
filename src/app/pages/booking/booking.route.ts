import { Routes } from '@angular/router';

export const bookingRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./booking.component').then((m) => m.BookingComponent),
  },
];
