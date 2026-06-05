import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IssueItemModal } from '../../components/issue-item-modal/issue-item-modal';

@Component({
  selector: 'app-issue-item',
  imports: [CommonModule, FormsModule, IssueItemModal],
  templateUrl: './issue-item.html',
  styleUrl: './issue-item.css',
})
export class IssueItem {
   showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

}
