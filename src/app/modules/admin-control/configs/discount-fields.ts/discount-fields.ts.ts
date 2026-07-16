import { Validators } from '@angular/forms';

import {
  BadgePercent,
  Tags,
  IndianRupee,
  ShoppingCart,
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
    | 'date';

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
   DISCOUNT FIELDS
========================================= */

export const discountFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Discount Name',
    controlName: 'discountName',
    placeholder: 'Enter discount name',
    icon: BadgePercent,
    validators: [Validators.required]
  },

  {
    type: 'select',
    label: 'Discount Type',
    controlName: 'discountType',
    icon: Tags,
    validators: [Validators.required],

    options: [
      {
        label: 'Select Discount Type',
        value: ''
      },
      {
        label: 'Percentage',
        value: 'Percentage'
      },
      {
        label: 'Fixed Amount',
        value: 'Fixed'
      }
    ]
  },

  {
    type: 'number',
    label: 'Discount Value',
    controlName: 'discountValue',
    placeholder: 'Enter discount value',
    icon: IndianRupee,
    validators: [
      Validators.required,
      Validators.min(0)
    ]
  },

  {
    type: 'number',
    label: 'Minimum Order Amount',
    controlName: 'minimumOrderAmount',
    placeholder: 'Enter minimum order amount',
    icon: ShoppingCart,
    validators: [
      Validators.min(0)
    ]
  },

  {
    type: 'date',
    label: 'Start Date',
    controlName: 'startDate',
    icon: CalendarDays,
    validators: [Validators.required]
  },

  {
    type: 'date',
    label: 'End Date',
    controlName: 'endDate',
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