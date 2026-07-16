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
    | 'toggle'
    | 'ng-select';

  label: string;

  controlName: string;

  placeholder?: string;

  icon?: any;

  options?: {
    label: string;
    value: any;
  }[];

  onChange?: string;

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
  type: 'ng-select',
  label: 'Country',
  controlName: 'country',
  placeholder: 'Select Country',
  icon: Globe,
  options: [],
  onChange: 'loadStates'
},

{
  type: 'ng-select',
  label: 'State',
  controlName: 'state',
  placeholder: 'Select State',
  icon: Map,
  options: [],
  onChange: 'loadCities'
},

{
  type: 'ng-select',
  label: 'City',
  controlName: 'city',
  placeholder: 'Select City',
  icon: Building2,
  options: []
},
  {
    type: 'text',
    label: 'Postal Code',
    controlName: 'postal_code',
    placeholder: 'Enter postal code',
    icon: Mail
  }

];