import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Search, Save, Plus } from 'lucide-angular';
import { AdmindynamicForm } from '../../../../shared/admindynamic-form/admindynamic-form';
import { contractFields } from '../../configs/servicecontract-fields/servicecontract-fields';

@Component({
  selector: 'app-contract-tab',
  imports: [CommonModule,ReactiveFormsModule,LucideAngularModule,AdmindynamicForm],
  templateUrl: './contract-tab.html',
  styleUrl: './contract-tab.css',
})
export class ContractTab {

  @Input() form! : FormGroup;

  search = Search;
  saveIcon = Save;
  plus = Plus;

contractfield = contractFields;

  constructor(private fb: FormBuilder) {}

   ngOnInit(): void {

  const allFields = [
    ...contractFields,
  ];

  allFields.forEach(field => {

    if (!this.form.contains(field.controlName)) {

      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      this.form.addControl(
        field.controlName,
        this.fb.control(
          field.type === 'toggle' ? false : '',
          validators
        )
      );
    }

  });

}


}
