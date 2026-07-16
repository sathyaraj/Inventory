import { ValidatorFn } from '@angular/forms';
import { LucideIconData } from 'lucide-angular';
export interface FieldConfig {

  type:
  | 'text'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'datepicker'
  | 'email'
  | 'password'
  | 'textarea'
  | 'file'
  | 'date'
  | 'toggle'
  | 'autocomplete'
  | 'hidden';

  label: string;

  controlName: string;

  placeholder?: string;

  icon?: LucideIconData;

  readonly?: boolean;
  
  options?: {
    label: string;
    value: any;
  }[];

  required?: boolean;

  colSpan?: number;


    // ✅ ADD THIS
  validators?: ValidatorFn[];

  // ✅ ADD THIS
  errorMessages?: {
    [key: string]: string;
  };


}