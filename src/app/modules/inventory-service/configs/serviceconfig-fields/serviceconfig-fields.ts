import { FieldConfig } from '../../../admin-control/validators/input-interface';

import {
  Clock,
  IndianRupee,
  ShoppingCart,
  Wrench,
  Settings
} from 'lucide-angular';

export const configurationFields: FieldConfig[] = [
  {
    type: 'number',
    label: 'Minimum Service Cost',
    controlName: 'minimumServiceCost',
    placeholder: 'Enter minimum cost',
    icon: IndianRupee
  },

  {
    type: 'number',
    label: 'Maximum Service Cost',
    controlName: 'maximumServiceCost',
    placeholder: 'Enter maximum cost',
    icon: IndianRupee
  },

    {
    type: 'number',
    label: 'Lead Time (Days)',
    controlName: 'leadTimeDays',
    placeholder: 'Enter lead time',
    icon: Clock
  },

  {
    type: 'select',
    label: 'Status',
    controlName: 'status',
    icon: Settings,
    options: [
      { label: 'Pending', value: 'Pending' },
      { label: 'Planning', value: 'Planning' },
      { label: 'Active', value: 'Active' },
      { label: 'Pending Obsolescence', value: 'Pending Obsolescence' },
      { label: 'Obsolete', value: 'Obsolete' }
    ]
  }

];