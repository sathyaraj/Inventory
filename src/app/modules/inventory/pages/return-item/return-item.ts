import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReturnItemModal } from '../../components/return-item-modal/return-item-modal';

@Component({
  selector: 'app-return-item',
  imports: [CommonModule, FormsModule, ReturnItemModal],
  templateUrl: './return-item.html',
  styleUrl: './return-item.css',
})
export class ReturnItem {
  showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
