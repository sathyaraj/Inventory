import {
  User,
  Lock,
  ShieldCheck,
  UserCog
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const getSecurityFields = (roles: any[]): FieldConfig[] => [

  {
    type: 'text',
    label: 'Username',
    controlName: 'username',
    placeholder: 'Enter username',
    icon: User
  },

  {
    type: 'password',
    label: 'Password',
    controlName: 'password',
    placeholder: 'Enter password',
    icon: Lock
  },

  {
    type: 'password',
    label: 'Confirm Password',
    controlName: 'PasswordHash',
    placeholder: 'Confirm password',
    icon: ShieldCheck
  },

  {
    type: 'select',
    label: 'Role',
    controlName: 'role',
    placeholder: 'Select role',
    icon: UserCog,

     options: (roles || []).map((role: any) => ({
      label: role?.role_Name ?? 'Unknown',
      value: role?.id ?? ''
    }))
  }

];