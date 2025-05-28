import { Route } from '@angular/router';
import {numericIdGuard} from './shared/guards/numeric-id.guard';


export const appRoutes: Route[] = [
  {
    path: '',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/default/default.component').then(
        (m) => m.DefaultComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.route').then(
            (m) => m.dashboardRoute
          ),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./pages/booking/booking.route').then((m) => m.bookingRoute),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./pages/customers/customers.route').then(
            (m) => m.customersRoute
          ),
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/order/views/orders/orders.route').then(
                (m) => m.ordersRoute
              ),
          },
          {
            path: 'create',
            loadChildren: () =>
              import('./pages/order/views/create-order/create-order.route').then(
                (m) => m.createOrderRoute
              ),
          },
          {
            path: ':id',
            canActivate: [numericIdGuard],
            loadChildren: () =>
              import('./pages/order/views/order-details/order-details.route').then(
                (m) => m.orderDetailsRoute
              ),
          },
        ],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.route').then(
            (m) => m.settingsRoute
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.route').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.route').then((m) => m.notFoundRoute),
  },
];
