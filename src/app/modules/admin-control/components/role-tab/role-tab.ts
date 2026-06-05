import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { Adminmaster } from '../../../../core/services/adminmaster';

@Component({
  selector: 'app-role-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './role-tab.html',
  styleUrl: './role-tab.css',
})
export class RoleTab {

  roleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminMaster: Adminmaster
  ) {

    this.roleForm = this.fb.group({

      role_name: [''],
      description: [''],
      is_active: [true]

    });

  }

  // MODULES
  modules = [

    {
      module: 'Dashboard',
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false,
        approve: false
      }
    },

    {
      module: 'Item Master',
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false,
        approve: false
      }
    },

    {
      module: 'Inventory',
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false,
        approve: false
      }
    },

    {
      module: 'Settings',
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false,
        approve: false
      }
    }

  ];

  // SELECT ALL
  selectAll(event: any) {

    const checked = event.target.checked;

    this.modules.forEach(item => {

      item.permissions.create = checked;
      item.permissions.read = checked;
      item.permissions.update = checked;
      item.permissions.delete = checked;
      item.permissions.approve = checked;

    });

  }

  // SAVE ROLE
  saveRole() {

    const payload = {

      role_name: this.roleForm.value.role_name,

      description: this.roleForm.value.description,

      is_active: this.roleForm.value.is_active,

      permissions: this.modules

    };

    console.log(payload);

    // this.adminMaster.createRole(payload)
    //   .subscribe({

    //     next: (res:any) => {

    //       console.log(res);

    //       alert('Role Created Successfully');

    //     },

    //     error: (err:any) => {

    //       console.log(err);

    //       alert('API Error');

    //     }

    //   });

  }

}