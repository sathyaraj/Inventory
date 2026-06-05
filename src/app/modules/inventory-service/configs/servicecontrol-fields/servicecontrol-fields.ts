import { FieldConfig } from '../../../admin-control/validators/input-interface';

import {
  Wrench,
  FileText,
  Tag,
  Building2,
  Receipt,
  Calculator,
  ShieldCheck,
  CircleCheck,
  Search,
  ShoppingCart
} from 'lucide-angular';

export const servicecontrolFields: FieldConfig[] = [

    {
    type: 'toggle',
    label: 'Active for Purchase',
    controlName: 'activeForPurchase',
    icon: ShoppingCart
  },

  {
    type: 'toggle',
    label: 'Active for Work Order',
    controlName: 'activeForWorkOrder',
    icon: Wrench
  },
  
    {
    type: 'toggle',
    label: 'Prorate',
    controlName: 'prorate',
    icon: Receipt
  },

  {
    type: 'toggle',
    label: 'Inspection Required',
    controlName: 'inspectionRequired',
    icon: CircleCheck 
  },


];