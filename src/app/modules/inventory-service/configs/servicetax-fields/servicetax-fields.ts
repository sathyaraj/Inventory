import { FieldConfig } from '../../../admin-control/validators/input-interface';

import {
  Receipt,
  Landmark,
  Wallet
} from 'lucide-angular';

export const taxAccountingFields: FieldConfig[] = [

  {
    type: 'toggle',
    label: 'Tax Exempt',
    controlName: 'taxExempt',
    icon: Receipt
  },

 {
  type: 'select',
  label: 'Tax Code',
  controlName: 'taxCodeId',
  icon: Receipt,
  options: [
    { value: 1, label: 'GST 5%' },
    { value: 2, label: 'GST 12%' },
    { value: 3, label: 'GST 18%' },
    { value: 4, label: 'GST 28%' }
  ]
},
{
  type: 'select',
  label: 'Cost Center',
  controlName: 'costCenterId',
  icon: Wallet,
  options: [
    { value: 1, label: 'Administration' },
    { value: 2, label: 'Finance' },
    { value: 3, label: 'HR' },
    { value: 4, label: 'Operations' },
    { value: 5, label: 'IT Department' }
  ]
}



];