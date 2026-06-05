import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { discountFields } from '../../configs/discount-fields.ts/discount-fields.ts';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { ActivatedRoute, Router } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { Save, RotateCcw } from 'lucide-angular';

@Component({
  selector: 'app-discount-tab',
  imports: [CommonModule,ReactiveFormsModule,DynamicForm,MessageBox, LucideAngularModule],
  templateUrl: './discount-tab.html',
  styleUrl: './discount-tab.css',
})
export class DiscountTab {
editId = 0;
   showMessageBox = false;
  messageTitle ="";
  messageText = '';
Save=Save;
RotateCcw =RotateCcw
   @Input() form!: FormGroup;

     fields = discountFields
  constructor(private fb: FormBuilder, private adminMaster: Adminmaster, private router: Router,private route: ActivatedRoute ) {}

       ngOnInit() {
       const group: any = {};
     
       discountFields.forEach(field => {
         group[field.controlName] = [
           '',
           field.validators || []
         ];
       });
     
       this.form = this.fb.group(group);

        this.editId =
    Number(
      this.route.snapshot.paramMap.get('id')
    );

  if (this.editId > 0) {

    this.getById(this.editId);

  }
     }


     confirmadd(){
        this.router.navigate(['/admin/admin-control/discountlist']);

     }
     
       save() {
     
       // VALIDATION
       if (this.form.invalid) {
     
         this.form.markAllAsTouched();
     
         return;
       }
     
       // FORM DATA
       const payload = {
     
         id:this.form.value.id || 0,
     
         discountName: this.form.value.discountName,
     
         discountType: this.form.value.discountType,
     
         discountValue: this.form.value.discountValue,
     
         minimumOrderAmount: this.form.value.minimumOrderAmount,
     
         startDate: this.form.value.startDate,

          endDate: this.form.value.endDate,
     
         status: this.form.value.status
     
       };
     
       console.log(payload);
     
       // API CALL
       this.adminMaster.savediscount(payload)
         .subscribe({
     
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
     
     onReset() {
       this.form.reset();
     }
     
     getById(id: number) {

  this.adminMaster.getDiscountById(id).subscribe({

      next: (res: any) => {

        console.log(res);

       this.form.patchValue({

  id: res.id,

  discountName: res.discountName,

  discountType: res.discountType,

  discountValue: res.discountValue,

  minimumOrderAmount: res.minimumOrderAmount,

   startDate: res.startDate
          ? this.convertToDDMMYYYY(res.startDate)
          : '',

        endDate: res.endDate
          ? this.convertToDDMMYYYY(res.endDate)
          : '',

  status: res.status

});

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

convertToDDMMYYYY(date: string): string {

  const d = new Date(date);

  const day = ('0' + d.getDate()).slice(-2);

  const month = ('0' + (d.getMonth() + 1)).slice(-2);

  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

}
