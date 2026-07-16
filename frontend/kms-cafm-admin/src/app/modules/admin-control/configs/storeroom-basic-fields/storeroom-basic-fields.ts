import {
  Hash,
  Warehouse,
  Building2,
  Layers,
  MapPin,
  Package,
  FileText,
  ShieldCheck
} from 'lucide-angular';

import { FieldConfig } from '../../validators/input-interface';

export const storeroomBasicFields: FieldConfig[] = [
  {
    label: 'Storeroom Code',
    type: 'text',
    controlName: 'storeroomCode',
    placeholder: 'Storeroom Code',
    icon: Hash
  },
  {
    label: 'Storeroom Name',
    type: 'text',
    controlName: 'storeroomName',
    placeholder: 'Storeroom Name',
    icon: Warehouse
  },
  {
    label: 'Site',
    type: 'text',
    controlName: 'site',
    placeholder: 'Site',
    icon: Building2
  },
  {
    label: 'Building',
    type: 'text',
    controlName: 'building',
    placeholder: 'Building',
    icon: Building2
  },
  {
    label: 'Floor',
    type: 'text',
    controlName: 'floor',
    placeholder: 'Floor',
    icon: Layers
  },
  {
    label: 'Location',
    type: 'text',
    controlName: 'location',
    placeholder: 'Location',
    icon: MapPin
  },
  {
    label: 'Warehouse Type',
    type: 'select',
    controlName: 'warehouseType',
    placeholder: 'Warehouse Type',
    icon: Package,
    options: [
        { label: 'Main Warehouse', value: 'MAIN' },
        { label: 'Spare Parts Store', value: 'SPARE' },
        { label: 'Electrical Store', value: 'ELECTRICAL' },
        { label: 'Mechanical Store', value: 'MECHANICAL' },
        { label: 'Chemical Store', value: 'CHEMICAL' },
        { label: 'Tool Store', value: 'TOOL' }
      ]
        },
        {
    label: 'Status',
    type: 'select',
    controlName: 'status',
    icon: ShieldCheck,
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Planning', value: 'Planning' },
      { label: 'Pending Obsolescence', value: 'Pending Obsolescence' },
      { label: 'Obsolete', value: 'Obsolete' }
    ]
  },
  {
    label: 'Description',
    type: 'textarea',
    controlName: 'description',
    placeholder: 'Description',
    icon: FileText
  }
   
];