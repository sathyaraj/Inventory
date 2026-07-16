import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransferItemModal } from '../../components/transfer-item-modal/transfer-item-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer-item',
  imports: [CommonModule, FormsModule, TransferItemModal],
  templateUrl: './transfer-item.html',
  styleUrl: './transfer-item.css',
})
export class TransferItem {
    showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
