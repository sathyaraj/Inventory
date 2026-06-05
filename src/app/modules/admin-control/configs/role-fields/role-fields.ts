import {
  ShieldCheck,
  UserCog,
  Layers3,
  KeyRound
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const roleFields: FieldConfig[] = [

  {
    type: 'select',
    label: 'Role',
    controlName: 'role',
    placeholder: 'Select role',
    icon: UserCog,

    options: [
      { label: 'Super Admin', value: 'super_admin' },
      { label: 'Admin', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Employee', value: 'employee' }
    ]
  },

  {
    type: 'select',
    label: 'Access Level',
    controlName: 'access_level',
    placeholder: 'Select access level',
    icon: Layers3,

    options: [
      { label: 'Level 1', value: '1' },
      { label: 'Level 2', value: '2' },
      { label: 'Level 3', value: '3' }
    ]
  },

  {
    type: 'checkbox',
    label: 'Two Factor Authentication',
    controlName: 'two_factor_auth',
    placeholder: '',
    icon: ShieldCheck
  }

];