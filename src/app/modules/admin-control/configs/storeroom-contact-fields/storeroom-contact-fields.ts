import {
  User,
  Phone,
  Smartphone,
  Mail,
  Briefcase,
  Users
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const storeroomContactFields: FieldConfig[] = [
  {
    label: 'Contact Person',
    type: 'text',
    controlName: 'contactPerson',
    placeholder:'Contact Person',
    icon: User
  },
  {
    label: 'Contact Number',
    type: 'text',
    controlName: 'contactNumber',
    placeholder:'Contact Number',
    icon: Phone
  },
  {
    label: 'Mobile Number',
    type: 'text',
    controlName: 'mobileNumber',
    placeholder:'Mobile Number',
    icon: Smartphone
  },
  {
    label: 'Email',
    type: 'email',
    controlName: 'email',
    placeholder:'Email',
    icon: Mail
  },
  {
    label: 'Department',
    type: 'text',
    controlName: 'department',
    placeholder:'Department',
    icon: Briefcase
  },
  {
    label: 'Supervisor',
    type: 'text',
    controlName: 'supervisor',
    placeholder:'Supervisor',
    icon: Users
  }
];