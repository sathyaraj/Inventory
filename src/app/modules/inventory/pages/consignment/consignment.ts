import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsignmentModal } from '../../components/consignment-modal/consignment-modal';

@Component({
  selector: 'app-consignment',
  imports: [CommonModule, FormsModule, ConsignmentModal],
  templateUrl: './consignment.html',
  styleUrl: './consignment.css',
})
export class Consignment {
  showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
