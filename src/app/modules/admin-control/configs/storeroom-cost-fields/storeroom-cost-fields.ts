import {
  Receipt,
  Hash,
  DollarSign,
  Calculator,
  Banknote,
  FileCode,
  BadgePercent
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const storeroomCostFields: FieldConfig[] = [
  {
    label: 'Cost Center',
    type: 'text',
    controlName: 'costCenter',
    placeholder:'Cost Center',
    icon: Receipt
  },
  {
    label: 'Budget Code',
    type: 'text',
    controlName: 'budgetCode',
    placeholder:'Budget Code',
    icon: Hash
  },
  {
    label: 'Currency',
    type: 'text',
    controlName: 'currency',
    placeholder:'Currency',
    icon: DollarSign
  },
  {
    label: 'Standard Cost',
    type: 'number',
    controlName: 'standardCost',
    placeholder:'Standard Cost',
    icon: Calculator
  },
  {
    label: 'Inventory Value',
    type: 'number',
    controlName: 'inventoryValue',
    placeholder:'Inventory Value',
    icon: Banknote
  },
  {
    label: 'Accounting Code',
    type: 'text',
    controlName: 'accountingCode',
    placeholder:'Accounting Code',
    icon: FileCode
  },
  {
    label: 'Tax Group',
    type: 'text',
    controlName: 'taxGroup',
    placeholder:'Tax Group',
    icon: BadgePercent
  }
];