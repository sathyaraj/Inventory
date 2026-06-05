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
    label: 'Cost Code Name',
    controlName: 'costCodeName',
    placeholder: 'Enter cost code name',
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
    type: 'checkbox',
    label: 'Active',
    controlName: 'isActive',
    icon: CircleCheck
  }

];