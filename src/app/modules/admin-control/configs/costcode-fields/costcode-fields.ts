import {
  Hash,
  BadgeInfo,
  FileText,
  CircleCheck
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const getCostCodeFields = (): FieldConfig[] => [

  {
    type: 'text',
    label: 'Cost Code No',
    controlName: 'costCodeNo',
    placeholder: 'Enter cost code number',
    icon: Hash
  },

  {
    type: 'text',
    label: 'Cost Center Name',
    controlName: 'costCodeName',
    placeholder: 'Enter cost center name',
    icon: BadgeInfo
  },

  {
    type: 'textarea',
    label: 'Description',
    controlName: 'description',
    placeholder: 'Enter description',
    icon: FileText
  },

  {
    type: 'select',
    label: 'Status',
    controlName: 'isActive',
    icon: CircleCheck,
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