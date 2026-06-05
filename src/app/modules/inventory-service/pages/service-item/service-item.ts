import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-item.html',
  styleUrl: './service-item.css',
})
export class ServiceItem {
    constructor(private fb: FormBuilder,private router: Router) {}

 showCreateModal: boolean = false;

  // Open Modal
   openCreateModal() {
    this.router.navigate(['/admin/inventoryservice/service-create']);
  }

  // Close Modal
  closeCreateModal() {
    this.showCreateModal = false;
  }

}
