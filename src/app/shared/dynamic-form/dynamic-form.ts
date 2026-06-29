import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  LucideAngularModule
} from 'lucide-angular';

import {
  DatePickerComponent
} from '../components/date-picker/date-picker';

import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    DatePickerComponent,
    NgSelectModule
  ],

  templateUrl: './dynamic-form.html'
})
export class DynamicForm {

  @Output() fieldAction = new EventEmitter<any>();

    requiredValidator = Validators.required;

  @Input() form!: FormGroup;

  @Input() fields: any[] = [];

  onFileChange(event: any, controlName: string) {

    const file = event.target.files[0];

    if (file) {

      this.form.patchValue({
        [controlName]: file
      });

    }

  }

handleChange(field: any, value: any) {

  this.fieldAction.emit({
    action: field.onChange,
    controlName: field.controlName,
    value: value.value
  });

}

}