import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemList } from './pages/item-list/item-list';
import { ItemCreate } from './pages/item-create/item-create';
import { ItemEdit } from './pages/item-edit/item-edit';
import { ItemDetails } from './pages/item-details/item-details';
import { ItemKits } from './pages/item-kits/item-kits';
import { RotatingItems } from './pages/rotating-items/rotating-items';
import { ItemReports } from './pages/item-reports/item-reports';

const routes: Routes = [

  { path: '', component: ItemList },
  { path: 'create', component: ItemCreate },
  { path: 'create/:id', component: ItemCreate }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemMasterRoutingModule { }
