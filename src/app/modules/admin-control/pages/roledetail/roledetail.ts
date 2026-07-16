import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import {
  Settings,
  Shield,
  UserCog,
  LockKeyhole,
  Package,
  LayoutDashboard,
  Boxes,
  Trash2,
  Pencil,
  Eye,
  CheckCheck,
  Plus,
  Users,
  Building2,
  BadgeCheck
} from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roledetail',
   imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule,
    MessageBox

  ],
  templateUrl: './roledetail.html',
  styleUrl: './roledetail.css',
})
export class Roledetail {

  @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';

   // ICONS
  Settings = Settings;
  Shield = Shield;
  UserCog = UserCog;
  LockKeyhole = LockKeyhole;
  Package = Package;
  LayoutDashboard = LayoutDashboard;
  Boxes = Boxes;
  Trash2 = Trash2;
  Pencil = Pencil;
  Eye = Eye;
  CheckCheck = CheckCheck;
  Plus = Plus;
  Users = Users;
  Building2 = Building2;
  BadgeCheck = BadgeCheck;

  roleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminMaster: Adminmaster,
    private chr : ChangeDetectorRef,
    private router: Router
  ) {

    this.roleForm = this.fb.group({

  role_name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]
  ],

  description: [
    '',
    [
      Validators.required,
      Validators.minLength(5)
    ]
  ],

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
      module: 'Service Master',
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

  // MARK ALL FIELDS
  this.roleForm.markAllAsTouched();

  // STOP IF INVALID
  if (this.roleForm.invalid) {

    this.messageTitle = 'Validation';
    this.messageText = 'Please fill all required fields';

    this.showMessageBox = true;

    return;
  }

  const payload = {

    role_name: this.roleForm.value.role_name,

    description: this.roleForm.value.description,

    is_active: this.roleForm.value.is_active,

 rolePermissions: this.modules.map(m => ({

      Module: m.module,

      Create: m.permissions.create,

      Read: m.permissions.read,

      Update: m.permissions.update,

      Delete: m.permissions.delete,

      Approve: m.permissions.approve

    }))

  };

  this.adminMaster.createRole(payload)
    .subscribe({

      next: (res:any) => {

        this.messageTitle = 'Success';
        this.messageText = 'Role Created Successfully';
        this.showMessageBox = true;
      this.chr.detectChanges();
      },

      error: (err:any) => {

        this.messageTitle = 'API Error';
        this.messageText = 'API NOT Connected';

        this.showMessageBox = true;

      }

    });

}

  confirm()
  {
this.router.navigate(['/admin/admin-control/permission']);     
  }

  

}
