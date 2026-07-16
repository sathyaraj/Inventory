import {
  User,
  BadgeCheck,
  IdCard,
  Users,
  CalendarDays
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const personalFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'First Name',
    controlName: 'FirstName',
    placeholder: 'Enter first name',
    icon: User
  },

  {
    type: 'text',
    label: 'Last Name',
    controlName: 'LastName',
    placeholder: 'Enter last name',
    icon: BadgeCheck
  },

  {
    type: 'text',
    label: 'Employee ID',
    controlName: 'Employeeid',
    placeholder: 'Enter employee ID',
    icon: IdCard
  },

  {
    type: 'select',
    label: 'Gender',
    controlName: 'Gender',
    placeholder: 'Select gender',
    icon: Users,

    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ]
  },

  {
    type: 'date',
    label: 'Date of Birth',
    controlName: 'dob',
    placeholder: 'Select date',
    icon: CalendarDays
  }
];