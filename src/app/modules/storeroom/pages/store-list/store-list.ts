import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './store-list.html',
  styleUrl: './store-list.css',
})
export class StoreList {
   searchText: string = '';

  stores = [
    {
      code: 'STR001',
      name: 'Main Warehouse',
      organization: 'ORG01',
      location: 'Chennai',
      status: 'Active'
    },
    {
      code: 'STR002',
      name: 'Spare Parts Store',
      organization: 'ORG01',
      location: 'Coimbatore',
      status: 'Inactive'
    }
  ];

  constructor(private router: Router) {}

  onCreate() {
    this.router.navigate(['/store/create']);
  }

  onEdit(store: any) {
    console.log('Edit:', store);
  }

  onDelete(store: any) {
    console.log('Delete:', store);
  }

   showCreateModal = false;

  openCreateModal() {
     this.router.navigate(['/admin/storeroom/create']); 
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
