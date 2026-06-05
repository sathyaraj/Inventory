import {
  Component,
  Input
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

@Component({
  selector: 'app-dynamic-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    DatePickerComponent,
  ],

  templateUrl: './dynamic-form.html'
})
export class DynamicForm {

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

}