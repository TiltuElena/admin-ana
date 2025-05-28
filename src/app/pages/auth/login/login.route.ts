import { Route } from "@angular/router";

export const loginRoute: Route[] = [
  {
    path: '',
    loadComponent: () => import('./login.component').then(m => m.LoginComponent)
  },
]
