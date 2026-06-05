import { FieldConfig } from '../../../admin-control/validators/input-interface';

import {
  Wrench,
  FileText,
  Tag,
  Building2,
  Receipt,
  Calculator,
  ShieldCheck,
  CircleCheck,
  Search
} from 'lucide-angular';

export const serviceFields: FieldConfig[] = [
  {
  type: 'autocomplete',
  label: 'Commodity Group',
  controlName: 'commodityGroup',
  placeholder: 'Commodity Group',
  icon: Search
},
{
  type: 'text',
  label: 'Commodity Code',
  controlName: 'commodityCode',
  placeholder: 'Commodity code',
  readonly: true
},
{
    type: 'textarea',
    label: 'Description',
    controlName: 'description',
    placeholder: 'Enter service description',
    icon: FileText,
    colSpan: 2
  },
  {
    type: 'number',
    label: 'Receipt Tolerance (%)',
    controlName: 'receiptTolerance',
    placeholder: 'Enter tolerance percentage',
    icon: Calculator
  },
  {
  type: 'autocomplete',
  label: 'Order Unit',
  controlName: 'orderunit',
  placeholder: 'Order Unit',
  icon: Search
},
{
  type: 'text',
  label: 'Issue Unit',
  controlName: 'issueunit',
  placeholder: 'Issue Unit',
  readonly: true
}
];