import { FieldConfig } from '../../../admin-control/validators/input-interface';


export const contractFields: FieldConfig[] = [

  {
    type: 'text',
    label: 'Contract Number',
    controlName: 'contractNumber',
    placeholder: 'Enter contract number'
  },
  {
    type: 'date',
    label: 'Start Date',
    controlName: 'contractStartDate'
  },
  {
    type: 'date',
    label: 'End Date',
    controlName: 'contractEndDate'
  },
  {
    type: 'number',
    label: 'Contract Value',
    controlName: 'contractValue',
    placeholder: 'Enter contract value'
  },
  {
    type: 'number',
    label: 'Renewal Notice (Days)',
    controlName: 'renewalNoticeDays',
    placeholder: '30'
  },
  {
    type: 'toggle',
    label: 'Auto Renewal',
    controlName: 'autoRenewal'
  },
  {
    type: 'textarea',
    label: 'Contract Remarks',
    controlName: 'contractRemarks',
    colSpan: 2
  }
];