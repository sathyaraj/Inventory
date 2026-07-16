import {
  BadgeCheck,
  Users,
  CalendarDays
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const subscriptionFields: FieldConfig[] = [

  {
    type: 'select',
    label: 'Subscription Plan',
    controlName: 'subscription_plan',
    placeholder: 'Select subscription plan',
    icon: BadgeCheck,

    options: [
      {
        label: 'Starter',
        value: 'starter'
      },
      {
        label: 'Professional',
        value: 'professional'
      },
      {
        label: 'Enterprise',
        value: 'enterprise'
      }
    ]
  },

  {
    type: 'number',
    label: 'User Limit',
    controlName: 'user_limit',
    placeholder: 'Enter user limit',
    icon: Users
  },

  {
    type: 'date',
    label: 'Expiry Date',
    controlName: 'expiry_date',
    placeholder: 'Select expiry date',
    icon: CalendarDays
  }

];