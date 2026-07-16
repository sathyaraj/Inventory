import { Validators } from '@angular/forms';

import {
  Receipt,
  Hash,
  Files,
  Percent,
  CalendarDays,
  CircleCheck
} from 'lucide-angular';

export interface FieldConfig {

  type:
    | 'text'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'datepicker'
    |'date';

  label: string;

  controlName: string;

  placeholder?: string;

  icon?: any;

  validators?: any[];

  options?: {
    label: string;
    value: any;
  }[];

}

/* =========================================
   TAX FIELDS
========================================= */

export const taxFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Tax Name',
    controlName: 'taxName',
    placeholder: 'Enter tax name',
    icon: Receipt,
    validators: [Validators.required]
  },

  {
    type: 'text',
    label: 'Tax Code',
    controlName: 'taxCode',
    placeholder: 'Enter tax code',
    icon: Hash,
    validators: [Validators.required]
  },

  {
    type: 'select',
    label: 'Tax Type',
    controlName: 'taxType',
    icon: Files,
    validators: [Validators.required],

    options: [
      {
        label: 'Select Tax Type',
        value: ''
      },
      {
        label: 'Inclusive',
        value: 'Inclusive'
      },
      {
        label: 'Exclusive',
        value: 'Exclusive'
      }
    ]
  },

  {
    type: 'number',
    label: 'Tax Percentage',
    controlName: 'taxPercentage',
    placeholder: 'Enter tax percentage',
    icon: Percent,
    validators: [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]
  },

  {
    type: 'date',
    label: 'Effective Date',
    controlName: 'effectiveDate',
    placeholder: 'Select effective date',
    icon: CalendarDays,
    validators: [Validators.required]
  },

  {
    type: 'select',
    label: 'Status',
    controlName: 'status',
    icon: CircleCheck,
    validators: [Validators.required],

    options: [
      {
        label: 'Select Status',
        value: ''
      },
      {
        label: 'Active',
        value: 'Active'
      },
      {
        label: 'Inactive',
        value: 'Inactive'
      }
    ]
  }

];