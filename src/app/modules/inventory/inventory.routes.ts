import { Routes } from '@angular/router';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/add-storeroom/add-storeroom')
        .then(m => m.AddStoreroom)
  },
  {
    path: 'issue-item',
    loadComponent: () =>
      import('./pages/issue-item/issue-item')
        .then(m => m.IssueItem)
  },
  {
    path: 'return-item',
    loadComponent: () =>
      import('./pages/return-item/return-item')
        .then(m => m.ReturnItem)
  },
  {
    path: 'transfer-item',
    loadComponent: () =>
      import('./pages/transfer-item/transfer-item')
        .then(m => m.TransferItem)
  },
  {
    path: 'reorder',
    loadComponent: () =>
      import('./pages/reorder/reorder')
        .then(m => m.Reorder)
  },
  {
    path: 'consignment',
    loadComponent: () =>
      import('./pages/consignment/consignment')
        .then(m => m.Consignment)
  },

//   {
//     path: 'create',
//     loadComponent: () =>
//       import('./pages/store-form/store-form')
//         .then(m => m.StoreForm)
//   }
];