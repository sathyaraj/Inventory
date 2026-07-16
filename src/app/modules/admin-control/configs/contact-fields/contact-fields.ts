import {
  Mail,
  Phone,
  Smartphone,
  Globe,
  Building2
} from 'lucide-angular';

import { Validators } from '@angular/forms';

import { FieldConfig } from '../../validators/input-interface';

export const contactFields: FieldConfig[] = [

  {
    type: 'email',
    label: 'Email Address',
    controlName: 'email',
    placeholder: 'Enter email address',
    icon: Mail,

    validators: [
      Validators.required,
      Validators.email
    ],

    errorMessages: {
      required: 'Email is required',
      email: 'Enter valid email'
    }
  },

  {
    type: 'number',
    label: 'Phone Number',
    controlName: 'phone',
    placeholder: 'Enter phone number',
    icon: Phone,

    validators: [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ],

    errorMessages: {
      required: 'Phone number is required',
      pattern: 'Enter valid 10 digit phone number'
    }
  },

  {
    type: 'number',
    label: 'Alternate Phone',
    controlName: 'alternatephone',
    placeholder: 'Enter alternate number',
    icon: Smartphone,

    validators: [
      Validators.pattern('^[0-9]{10}$')
    ],

    errorMessages: {
      pattern: 'Enter valid 10 digit number'
    }
  },

  {
    type: 'text',
    label: 'Country',
    controlName: 'country',
    placeholder: 'Enter country',
    icon: Globe,

    validators: [
      Validators.required
    ],

    errorMessages: {
      required: 'Country is required'
    }
  },

  {
    type: 'text',
    label: 'City',
    controlName: 'city',
    placeholder: 'Enter city',
    icon: Building2,

    validators: [
      Validators.required
    ],

    errorMessages: {
      required: 'City is required'
    }
  }

];