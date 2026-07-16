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
  controlName: 'taxCode',
  icon: Receipt,
  options: []
},
{
  type: 'select',
  label: 'Cost Center',
  controlName: 'costCenter',
  icon: Wallet,
  options: []
}
];