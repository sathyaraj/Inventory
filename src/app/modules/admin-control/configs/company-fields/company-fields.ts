import {
  Building2,
  Mail,
  Phone,
  Briefcase,
  Hash,
  FileText
} from 'lucide-angular';

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

  required?: boolean;

  colSpan?: number;

  icon?: any;

  options?: {
    label: string;
    value: any;
  }[];

}
export const companyFields: FieldConfig[] = [

  {
    label: 'Company Name',
    type: 'text',
    controlName: 'company_name',
    placeholder: 'Company name',
    icon: Building2
  },

  {
    label: 'Company Code',
    type: 'text',
    controlName: 'company_code',
    placeholder: 'Company code',
    icon: Hash
  },

  {
    label: 'Email',
    type: 'email',
    controlName: 'company_email',
    placeholder: 'Company email',
    icon: Mail
  },

  {
    label: 'Phone',
    type: 'text',
    controlName: 'company_phone',
    placeholder: 'Phone number',
    icon: Phone
  },

  {
    label: 'Business Type',
    type: 'select',
    controlName: 'business_type',
    icon: Briefcase,

    options: [
      {
        label: 'IT',
        value: 'IT'
      },
      {
        label: 'Retail',
        value: 'Retail'
      }
    ]
  },

   {
    label: 'Company Logo',
    type: 'file',
    controlName: 'company_logo',
    icon: Image
  },

  {
    label: 'Description',
    type: 'textarea',
    controlName: 'company_description',
    placeholder: 'Company description',
    icon: FileText,
    colSpan: 2
  }


];