import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import { Settings } from 'lucide-angular';

@Component({
  selector: 'app-permission',
  imports: [CommonModule, FormsModule,LucideAngularModule],
  templateUrl: './permission.html',
  styleUrl: './permission.css',
})
export class Permission {

  constructor(
    private router: Router,
    private adminMaster: Adminmaster,
    private chr:ChangeDetectorRef
  ) {}
Settings=Settings;
  // DYNAMIC ROLE LIST
  roles: any[] = [];

  // SELECTED ROLE
  selectedRole: any = null;

  ngOnInit() {

    this.getRoles();

  }

  // GET ROLE LIST
  getRoles() {

    this.adminMaster.getRoles()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.roles = res;

          // DEFAULT SELECT FIRST ROLE
          if (this.roles.length > 0) {

            this.selectedRole = this.roles[0];

          }
          this.chr.detectChanges()
        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // CHANGE ROLE
  selectRole(role: any) {

    this.selectedRole = role;

  }

  // SELECT ALL
  selectAll(event: any) {

    const checked = event.target.checked;

    this.selectedRole.rolePermissions.forEach((item: any) => {

      item.create = checked;
      item.read = checked;
      item.update = checked;
      item.delete = checked;
      item.approve = checked;

    });

  }

  // CREATE ROLE PAGE
  goToCreateRole() {

    this.router.navigate([
      '/admin/admin-control/role'
    ]);

  }

  

}