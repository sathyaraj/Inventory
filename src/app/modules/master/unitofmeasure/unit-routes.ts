import { Routes } from '@angular/router';

export const UNIT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./unit-create/unit-create').then(m => m.UnitCreate)
  },
   {
    path: 'unitlist',
    loadComponent: () =>
      import('./unit-list/unit-list').then(m => m.UnitList)
  },
  {
    path: 'commoditygroup',
    loadComponent: () =>
      import('./commodity-group/commodity-group').then(m => m.CommodityGroup)
  }
];