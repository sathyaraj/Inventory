import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { currencyFields } from '../../configs/currency-fields.ts/currency-fields.ts';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { ActivatedRoute, Router } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { Save, RotateCcw } from 'lucide-angular';


@Component({
  selector: 'app-currency-tab',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,DynamicForm, MessageBox, LucideAngularModule],
  templateUrl: './currency-tab.html',
  styleUrl: './currency-tab.css',
})
export class CurrencyTab {
editId = 0;

  showMessageBox = false;
  messageTitle ="";
  messageText = '';

   @Input() form!: FormGroup;

    Save = Save;
  RotateCcw = RotateCcw;

  fields = currencyFields;
  constructor(private fb: FormBuilder, private adminMaster: Adminmaster, private route: ActivatedRoute,private router : Router) {}

  ngOnInit() {
  const group: any = {};

  currencyFields.forEach(field => {
    group[field.controlName] = [
      '',
      field.validators || []
    ];
  });

  this.form = this.fb.group(group);

  this.editId =Number(this.route.snapshot.paramMap.get('id'));

  if (this.editId > 0) {

    this.getById(this.editId);

  }
}

  save() {

  // VALIDATION
  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;
  }

  // FORM DATA
  const payload = {

    id:this.editId || 0,

    currencyCode: this.form.value.currencyCode,

    currencyName: this.form.value.currencyName,

    symbol: this.form.value.symbol,

    exchangeRate: this.form.value.exchangeRate,

    decimalPlaces: this.form.value.decimalPlaces,

    isDefault: false,

    status: this.form.value.status

  };

  // API CALL
  this.adminMaster.saveCurrency(payload).subscribe({

      next: (res: any) => {

       if (payload.id > 0) {

           this.messageTitle = 'Updated';
             this.messageText = "Updated Successfully";
             this.showMessageBox = true;

        } else {

           this.messageTitle = 'Success';
           this.messageText = "Saved Successfully";
           this.showMessageBox = true;

        }

        this.form.reset({

          status: 'Active',
          decimalplaces: 2
        });

      },

      error: (err:any) => {

        console.log(err);

        alert('Save Failed');

      }

    });

}



    getById(id: number) {

  this.adminMaster
    .getcurrecnyById(id)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.form.patchValue(res);

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

confirmadd(){
          this.router.navigate(['/admin/admin-control/currencylist']);

}

resetForm() {

  this.form.reset({

    id: 0,
    status: 'Active',
    decimalPlaces: 2

  });

}


  
}


