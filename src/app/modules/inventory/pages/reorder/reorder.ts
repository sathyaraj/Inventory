import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReorderModal } from '../../components/reorder-modal/reorder-modal';


@Component({
  selector: 'app-reorder',
  imports: [CommonModule, FormsModule, ReorderModal],
  templateUrl: './reorder.html',
  styleUrl: './reorder.css',
})
export class Reorder {
 showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
