import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { LucideAngularModule } from 'lucide-angular';
import { Save, RotateCcw } from 'lucide-angular';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { getCostCodeFields } from '../../configs/costcode-fields/costcode-fields';


@Component({
  selector: 'app-costcode-tab',
  imports: [CommonModule,ReactiveFormsModule,DynamicForm,MessageBox,LucideAngularModule],
  templateUrl: './costcode-tab.html',
  styleUrl: './costcode-tab.css',
})
export class CostcodeTab {

  editId = 0;

  showMessageBox = false;
  messageTitle ="";
  messageText = '';

   @Input() form!: FormGroup;

    Save = Save;
  RotateCcw = RotateCcw;

  fields = getCostCodeFields();

  constructor(private fb: FormBuilder, private adminMaster: Adminmaster, private route: ActivatedRoute,private router : Router) {}
ngOnInit() {
  const group: any = {};

  this.fields.forEach(field => {
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

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const payload = {

    id: this.editId || 0,

    costCodeNo: this.form.value.costCodeNo,

    costCodeName: this.form.value.costCodeName,

    description: this.form.value.description,

    isActive: this.form.value.isActive

  };

  this.adminMaster.saveCostCode(payload).subscribe({

    next: (res: any) => {

      if (payload.id > 0) {

        this.messageTitle = 'Updated';
        this.messageText = 'Updated Successfully';

      } else {

        this.messageTitle = 'Success';
        this.messageText = 'Saved Successfully';

      }

      this.showMessageBox = true;

    },

    error: (err: any) => {

      console.log(err);

      this.messageTitle = 'Error';
      this.messageText = 'Save Failed';
      this.showMessageBox = true;

    }

  });
}



   getById(id: number) {

  this.adminMaster.getCostCodeById(id).subscribe({

    next: (res: any) => {

      console.log(res);

      this.form.patchValue({

        costCodeNo: res.costCodeNo,
        costCodeName: res.costCodeName,
        description: res.description,
        isActive: res.isActive

      });

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}

confirmadd(){
          this.router.navigate(['/admin/admin-control/costcodelist']);

}

resetForm() {

  this.form.reset({

    id: 0,
    isActive: true

  });

}



}
