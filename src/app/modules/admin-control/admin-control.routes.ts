import { Routes } from '@angular/router';

export const ADMINCONTROL_ROUTES: Routes = [
  {
    path: 'currency',
    loadComponent: () =>
      import('./pages/item/item')
        .then(m => m.Item)
  },
   {
    path: 'currencylist',
    loadComponent: () =>
      import('./pages/currencylist/currencylist')
        .then(m => m.Currencylist)
  },
  {
    path: 'discount',
    loadComponent: () =>
      import('./pages/discount/discount')
        .then(m => m.Discount)
  },
   {
    path: 'tax',
    loadComponent: () =>
      import('./pages/tax/tax')
        .then(m => m.Tax)
  },
   {
    path: 'taxlist',
    loadComponent: () =>
      import('./pages/taxlist/taxlist')
        .then(m => m.Taxlist)
  },
  {
    path: 'discountlist',
    loadComponent: () =>
      import('./pages/discountlist/discountlist')
        .then(m => m.Discountlist)
  },
   {
     path: 'currency/:id',
    loadComponent: () =>
      import('./pages/item/item')
        .then(m => m.Item)
},
  {
     path: 'discount/:id',
    loadComponent: () =>
      import('./pages/discount/discount')
        .then(m => m.Discount)
},
{
     path: 'tax/:id',
    loadComponent: () =>
      import('./pages/tax/tax')
    .then(m => m.Tax)
},
{
  path: 'company',
  loadComponent: () =>
    import('./pages/company/company')
  .then(m=>m.Company)
},
{
  path: 'vendorlist',
  loadComponent: () =>
    import('./pages/vendorlist/vendorlist')
  .then(m=>m.Vendorlist)
},
{
  path: 'vendorlist/:id',
  loadComponent: () =>
    import('./pages/company/company')
  .then(m=>m.Company)
},
{
  path: 'userdetails',
  loadComponent: () =>
    import('./pages/userdetails/userdetails')
  .then(m=>m.Userdetails)
},
{
  path: 'userdetails/:id',
  loadComponent: () =>
    import('./pages/userdetails/userdetails')
      .then(m => m.Userdetails)
},
{
  path: 'userdetailslist',
  loadComponent: () =>
    import('./pages/userdetailslist/userdetailslist')
  .then(m=>m.Userdetailslist)
},
{
  path: 'permission',
  loadComponent: () =>
    import('./pages/permission/permission')
  .then(m=>m.Permission)
},
{
  path: 'role',
  loadComponent: () =>
    import('./pages/roledetail/roledetail')
  .then(m=>m.Roledetail)
},
];