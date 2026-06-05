import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddstoreroomModal } from '../../components/addstoreroom-modal/addstoreroom-modal';

@Component({
  selector: 'app-add-storeroom',
  imports: [CommonModule,FormsModule, AddstoreroomModal],
  templateUrl: './add-storeroom.html',
  styleUrl: './add-storeroom.css',
})
export class AddStoreroom {
   showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
