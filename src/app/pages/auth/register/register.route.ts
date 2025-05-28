import { Route } from "@angular/router";

export const registerRoute: Route[] = [
  {
    path: '',
    loadComponent: () => import('./register.component').then(m => m.RegisterComponent)
  },
]
