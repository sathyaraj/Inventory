import { Validators } from '@angular/forms';

import {
  DollarSign,
  BadgeDollarSign,
  IndianRupee,
  Calculator,
  Hash,
  CircleCheck
} from 'lucide-angular';

export interface FieldConfig {

  type:
    | 'text'
    | 'number'
    | 'select'
    | 'checkbox';

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

export const currencyFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Currency Code',
    controlName: 'currencyCode',
    placeholder: 'Enter currency code',
    icon: DollarSign,
    validators: [Validators.required]
  },

  {
    type: 'text',
    label: 'Currency Name',
    controlName: 'currencyName',
    placeholder: 'Enter currency name',
    icon: BadgeDollarSign,
    validators: [Validators.required]
  },

  {
    type: 'text',
    label: 'Symbol',
    controlName: 'symbol',
    placeholder: 'Enter currency symbol',
    icon: IndianRupee,
    validators: [Validators.required]
  },

  {
    type: 'number',
    label: 'Exchange Rate',
    controlName: 'exchangeRate',
    placeholder: 'Enter exchange rate',
    icon: Calculator,
    validators: [
      Validators.required,
      Validators.min(0)
    ]
  },

  {
    type: 'number',
    label: 'Decimal Places',
    controlName: 'decimalPlaces',
    placeholder: 'Enter decimal places',
    icon: Hash,
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