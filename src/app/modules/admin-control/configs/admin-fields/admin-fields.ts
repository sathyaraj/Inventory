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

  options?: {
    label: string;
    value: any;
  }[];

  required?: boolean;

  colSpan?: number;

}
export const adminFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Admin Name',
    controlName: 'admin_name'
  },

  {
    type: 'email',
    label: 'Admin Email',
    controlName: 'admin_email'
  },

  {
    type: 'password',
    label: 'Password',
    controlName: 'password'
  },

  {
    type: 'password',
    label: 'Confirm Password',
    controlName: 'confirm_password'
  }

];