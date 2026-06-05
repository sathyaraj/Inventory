import { LucideAngularModule, MapPin, Globe, Map, Building2, Mail } from 'lucide-angular';
export interface FieldConfig {

  type:
    | 'text'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'datepicker'
    | 'email'
    | 'password'
    | 'textarea'
    | 'file'
    | 'date'
    | 'toggle';

  label: string;

  controlName: string;

  placeholder?: string;

  icon?: any;

  options?: {
    label: string;
    value: any;
  }[];

  required?: boolean;

  colSpan?: number;

}
export const addressFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Address Line 1',
    controlName: 'address1',
    placeholder: 'Enter address line 1',
    icon: MapPin
  },

  {
    type: 'text',
    label: 'Address Line 2',
    controlName: 'address2',
    placeholder: 'Enter address line 2',
    icon: Building2
  },

  {
    type: 'text',
    label: 'Country',
    controlName: 'country',
    placeholder: 'Enter country',
    icon: Globe
  },

  {
    type: 'text',
    label: 'State',
    controlName: 'state',
    placeholder: 'Enter state',
    icon: Map
  },

  {
    type: 'text',
    label: 'City',
    controlName: 'city',
    placeholder: 'Enter city',
    icon: Building2
  },

  {
    type: 'text',
    label: 'Postal Code',
    controlName: 'postal_code',
    placeholder: 'Enter postal code',
    icon: Mail
  }

];