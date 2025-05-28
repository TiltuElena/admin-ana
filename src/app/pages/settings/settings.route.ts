import { Routes } from '@angular/router';

export const settingsRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((m) => m.SettingsComponent),
  },
];
