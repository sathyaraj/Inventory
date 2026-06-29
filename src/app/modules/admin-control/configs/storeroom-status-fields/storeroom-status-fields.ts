import {
  ShieldCheck,
  Warehouse,
  AlertTriangle,
  RefreshCw,
  MessageSquare
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const storeroomStatusFields: FieldConfig[] = [
  {
    label: 'Active',
    type: 'toggle',
    controlName: 'isActive',
    placeholder:'Active',
    icon: ShieldCheck
  },
  {
    label: 'Main Storeroom',
    type: 'toggle',
    controlName: 'isMainStoreroom',
    icon: Warehouse
  },
  {
    label: 'Allow Negative Stock',
    type: 'toggle',
    controlName: 'allowNegativeStock',
    icon: AlertTriangle
  },
  {
    label: 'Auto Reorder',
    type: 'toggle',
    controlName: 'autoReorder',
    icon: RefreshCw
  },
  {
    label: 'Remarks',
    type: 'textarea',
    controlName: 'remarks',
    icon: MessageSquare
  }
];