import { Routes } from '@angular/router';

export const STOREROOM_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/store-list/store-list')
        .then(m => m.StoreList)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/storeroomcreate/storeroomcreate')
        .then(m => m.Storeroomcreate)
  }
];