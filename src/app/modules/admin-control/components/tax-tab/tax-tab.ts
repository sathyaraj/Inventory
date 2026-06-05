import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { taxFields } from '../../configs/tax-fields/tax-fields';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { ActivatedRoute, Router } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { Save, RotateCcw } from 'lucide-angular';

@Component({
  selector: 'app-tax-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicForm,
    MessageBox,
    LucideAngularModule
  ],
  templateUrl: './tax-tab.html',
  styleUrl: './tax-tab.css',
})
export class TaxTab {

  Save = Save;
  RotateCcw = RotateCcw;

  @Input() form!: FormGroup;

  editId = 0;

  showMessageBox = false;
  messageTitle = '';
  messageText = '';

  fields = taxFields;

  constructor(
    private fb: FormBuilder,
    private adminMaster: Adminmaster,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const group: any = {};

    taxFields.forEach(field => {

      group[field.controlName] = [
        '',
        field.validators || []
      ];

    });

    this.form = this.fb.group(group);

    this.editId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.editId > 0) {

      this.getById(this.editId);

    }

  }
  
  confirmadd() {

     this.showMessageBox = false;

      setTimeout(() => {

    this.router.navigate([
      '/admin/admin-control/taxlist'
    ]);

  }, 300);

  }

  formatDate(date: any): string {

    const d = new Date(date);

    return d.toISOString().split('T')[0];

  }

  save() {

  // VALIDATION
  if (this.form.invalid) {

    this.form.markAllAsTouched();

    this.messageTitle = 'Validation';

    this.messageText =
      'Please fill all required fields';

    this.showMessageBox = true;

    return;
  }

  // PAYLOAD
  const payload = {

    id: this.editId || 0,

    taxName:
      this.form.value.taxName,

    taxCode:
      this.form.value.taxCode,

    taxType:
      this.form.value.taxType,

    taxPercentage:
      this.form.value.taxPercentage,

    effectiveDate:
      this.formatDate(
        this.form.value.effectiveDate
      ),

    status:
      this.form.value.status

  };

  // API CALL
  this.adminMaster.saveTax(payload).subscribe({

      next: (res: any) => {

        if(res.success === true){

        this.messageTitle = payload.id > 0 ? 'Updated': 'Success';

        this.messageText =res.message;

        this.showMessageBox = true;

        console.log(this.showMessageBox);

        }

        // RESET ONLY INSERT
        if (payload.id == 0) {

          this.form.reset({

              taxName:
      this.form.value.taxName,

    taxCode:
      this.form.value.taxCode,

    taxType:
      this.form.value.taxType,

    taxPercentage:
      this.form.value.taxPercentage,

    effectiveDate:
      this.formatDate(
        this.form.value.effectiveDate
      ),

    status:
      this.form.value.status


          });

        }

      },

      error: (err: any) => {

        console.log(err);

        this.messageTitle = 'Error';

        // BACKEND ERROR MESSAGE
        this.messageText =
          err?.error?.message ||
          'Something went wrong';

        this.showMessageBox = true;

      }

    });

}

  onReset() {

    this.form.reset({
      status: 'Active'
    });

  }

  getById(id: number) {

    this.adminMaster
      .gettaxById(id)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.form.patchValue({

            ...res,

            effectiveDate: this.formatDate(
              res.effectiveDate
            )

          });

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

}