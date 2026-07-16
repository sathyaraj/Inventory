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

export const CommoditygroupFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Commodity Group',
    controlName: 'commoditygroup',
    placeholder: 'Enter Commodity Group',
    icon: Receipt,
    validators: [Validators.required]
  },

  {
    type: 'text',
    label: 'Description',
    controlName: 'description',
    placeholder: 'Enter Description',
    icon: Hash,
  },

  // {
  //   type: 'select',
  //   label: 'Status',
  //   controlName: 'status',
  //   icon: CircleCheck,
  //   validators: [Validators.required],

  //   options: [
  //     {
  //       label: 'Select Status',
  //       value: ''
  //     },
  //     {
  //       label: 'Active',
  //       value: 'Active'
  //     },
  //     {
  //       label: 'Inactive',
  //       value: 'Inactive'
  //     }
  //   ]
  // }

];