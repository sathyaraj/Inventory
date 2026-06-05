import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // AUTH LAYOUT
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout')
        .then(m => m.AuthLayout),

    children: [

      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/pages/login/login')
            .then(m => m.Login)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./layouts/auth-layout/register/register')
            .then(m => m.Register)
      }

    ]
  },

  // ADMIN
  {
    path: 'admin',

    canActivate: [AuthGuard],

     canActivateChild: [AuthGuard],

    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout')
        .then(m => m.AdminLayout),



    children: [
       {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

            {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES)
      },

      {
        path: 'item-master',
        loadChildren: () =>
          import('./modules/item-master/item-master-module')
            .then(m => m.ItemMasterModule)
      },

      {
        path: 'admin-control',
        loadChildren: () =>
          import('./modules/admin-control/admin-control.routes')
            .then(m => m.ADMINCONTROL_ROUTES)
      },

      // {
      //   path: 'storeroom',
      //   loadChildren: () =>
      //     import('./modules/storeroom/storeroom.routes')
      //       .then(m => m.STOREROOM_ROUTES)
      // },

      // {
      //   path: 'inventory',
      //   loadChildren: () =>
      //     import('./modules/inventory/inventory.routes')
      //       .then(m => m.INVENTORY_ROUTES)
      // },

      {
        path: 'inventoryservice',
        loadChildren: () =>
          import('./modules/inventory-service/inventory-service.routes')
            .then(m => m.INVENTORYSERVICE_ROUTES)
      },

      // {
      //   path: 'master',
      //   loadChildren: () =>
      //     import('./modules/master/unitofmeasure/unit-routes')
      //       .then(m => m.UNIT_ROUTES)
      // }

    ]
  },

  // GLOBAL NOT FOUND
  {
    path: '**',
    redirectTo: 'login'
  }

];