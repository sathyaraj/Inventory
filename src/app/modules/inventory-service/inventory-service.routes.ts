import { Routes } from '@angular/router';

export const INVENTORYSERVICE_ROUTES: Routes = [
  {
    path: 'service-item',
    loadComponent: () =>
      import('./pages/service-item/service-item')
        .then(m => m.ServiceItem)
  },
  {
    path: 'service-create',
    loadComponent: () =>
      import('./pages/service-create/service-create')
        .then(m => m.ServiceCreate)
  },
];