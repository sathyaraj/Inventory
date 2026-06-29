import { Routes } from '@angular/router';
import { UnsavedChanged } from '../../core/guards/unsaved-changed';

export const ADMINCONTROL_ROUTES: Routes = [
  {
    path: 'currency',
    loadComponent: () =>
      import('./pages/item/item')
        .then(m => m.Item),
        canDeactivate: [UnsavedChanged]
  },
   {
    path: 'currencylist',
    loadComponent: () =>
      import('./pages/currencylist/currencylist')
        .then(m => m.Currencylist),
                canDeactivate: [UnsavedChanged]
  },
  {
    path: 'discount',
    loadComponent: () =>
      import('./pages/discount/discount')
        .then(m => m.Discount),
                canDeactivate: [UnsavedChanged]

  },
   {
    path: 'tax',
    loadComponent: () =>
      import('./pages/tax/tax')
        .then(m => m.Tax),
      canDeactivate: [UnsavedChanged]

  },
   {
    path: 'taxlist',
    loadComponent: () =>
      import('./pages/taxlist/taxlist')
        .then(m => m.Taxlist),
  canDeactivate: [UnsavedChanged]

  },
  {
    path: 'discountlist',
    loadComponent: () =>
      import('./pages/discountlist/discountlist')
        .then(m => m.Discountlist),
          canDeactivate: [UnsavedChanged]
  },
   {
     path: 'currency/:id',
    loadComponent: () =>
      import('./pages/item/item')
        .then(m => m.Item),
    canDeactivate: [UnsavedChanged]
},
  {
     path: 'discount/:id',
    loadComponent: () =>
      import('./pages/discount/discount')
        .then(m => m.Discount),
        canDeactivate: [UnsavedChanged]
},
{
     path: 'tax/:id',
    loadComponent: () =>
      import('./pages/tax/tax')
    .then(m => m.Tax),
        canDeactivate: [UnsavedChanged]
},
{
  path: 'company',
  loadComponent: () =>
    import('./pages/company/company')
  .then(m=>m.Company),
        canDeactivate: [UnsavedChanged]

},
{
  path: 'vendorlist',
  loadComponent: () =>
    import('./pages/vendorlist/vendorlist')
  .then(m=>m.Vendorlist),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'vendorlist/:id',
  loadComponent: () =>
    import('./pages/company/company')
  .then(m=>m.Company),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'userdetails',
  loadComponent: () =>
    import('./pages/userdetails/userdetails')
  .then(m=>m.Userdetails),
canDeactivate: [UnsavedChanged]

},
{
  path: 'userdetails/:id',
  loadComponent: () =>
    import('./pages/userdetails/userdetails')
      .then(m => m.Userdetails),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'userdetailslist',
  loadComponent: () =>
    import('./pages/userdetailslist/userdetailslist')
  .then(m=>m.Userdetailslist),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'permission',
  loadComponent: () =>
    import('./pages/permission/permission')
  .then(m=>m.Permission),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'role',
  loadComponent: () =>
    import('./pages/roledetail/roledetail')
  .then(m=>m.Roledetail),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'costcode',
  loadComponent: () =>
    import('./pages/costcode/costcode')
  .then(m=>m.Costcode),
  canDeactivate: [UnsavedChanged]
},
{
  path:'costcode/:id',
  loadComponent: () =>
    import('./pages/costcode/costcode')
  .then(m=>m.Costcode),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'costcodelist',
  loadComponent: () =>
    import('./pages/costcodelist/costcodelist')
  .then(m=>m.Costcodelist),
  canDeactivate: [UnsavedChanged]
},
{
   path: 'commoditygroup',
   loadComponent: () =>
    import('./pages/commoditygroup/commoditygroup')
   .then(m=>m.Commoditygroup),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'commoditygrouplist',
  loadComponent: () => 
    import('./pages/commoditygrouplist/commoditygrouplist')
  .then(m=>m.Commoditygrouplist),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'commoditygroup/:id',
  loadComponent:() =>
    import('./pages/commoditygroup/commoditygroup')
  .then(m=>m.Commoditygroup),
  canDeactivate: [UnsavedChanged]
},
{
  path: 'documentslist',
  loadComponent:() => 
    import('./pages/documentslist/documentslist')
  .then(m=>m.Documentslist),
  canDeactivate:[UnsavedChanged]
},

{
  path: 'storeroom',
  loadComponent:() => 
    import('./pages/storeroom/storeroom')
  .then(m=>m.Storeroom),
  canDeactivate:[UnsavedChanged]
},
{
  path: 'storeroomlist',
  loadComponent:() =>
    import('./pages/storeroomlist/storeroomlist')
  .then(m=>m.Storeroomlist),
  canDeactivate:[UnsavedChanged]
},

{
  path: 'storeroom/:id',
  loadComponent:() =>
    import('./pages/storeroom/storeroom')
  .then(m=>m.Storeroom),
  canDeactivate: [UnsavedChanged]
},


];