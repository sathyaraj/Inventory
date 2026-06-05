import { ChangeDetectorRef, Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Master } from '../../../../core/services/master';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { LucideAngularModule   } from 'lucide-angular';

import { Code,Trash,SquarePen,Info,MoveDown,MoveUp,ArrowDownNarrowWide,ArrowUpNarrowWide  } from 'lucide-angular';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,MessageBox, LucideAngularModule], // ✅ MUST
  templateUrl: './item-list.html',
})
export class ItemList {

  sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';

showColumnDropdown = false;

showdatenDropdown = false;

showrowDropdown =false;


  trash = Trash;
  pencil = SquarePen ;
  info=Info;
  //movedown=MoveDown;
  chevronsupdown = MoveUp;
  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

@Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';


  alternateForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private masterService : Master, private cdr: ChangeDetectorRef,private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.loadMasters()
    this.loadcommodity()
    this.getItems()
     const id = this.route.snapshot.paramMap.get('id') ?? "";
     if(id){
      console.log("true")
     }else{
        if (typeof window !== 'undefined') {      
          localStorage.removeItem('ItemSetValue');
        }
     }
  }

  get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

goToPage(page: number) {
  this.currentPage = page;
}

  additem()
  {
     this.router.navigate(['/admin/item-master/create']); 
  }

items: any[] = [];
filteredItems: any[] = [];


//searchText = '';

currentPage = 1;
pageSize = 10;


filters = {
  itemSet: '',
  itemCode: '',
  name: '',
  status: ''
};

loadMasters() {
  this.masterService.getItemlist().subscribe(res => {
    this.items = res as any[];
    this.filteredItems = [...this.items];
    this.currentPage = 1; // ✅ important
    this.cdr.detectChanges();
  });
}

 groups: any[] = [];


loadcommodity() {
  this.masterService.getMastersById(1).subscribe(res => {
    this.groups = res as any[];
    this.cdr.detectChanges();
  });
}


searchText: string = '';

applyFilters() {

  const globalText = this.searchText.toLowerCase().trim();

  this.filteredItems = this.items.filter(item => {

    // GLOBAL SEARCH
    const globalMatch =
      (item?.itemSet || '').toLowerCase().includes(globalText) ||
      (item?.itemCode || '').toLowerCase().includes(globalText) ||
      (item?.itemName || '').toLowerCase().includes(globalText) ||
      (item?.description || '').toLowerCase().includes(globalText) ||
      (item?.commodityGroup || '').toLowerCase().includes(globalText) ||
      (item?.commodityCode || '').toLowerCase().includes(globalText) ||
      (item?.manufacturer || '').toLowerCase().includes(globalText) ||
      (item?.storeroomItems?.[0]?.storeroom || '')
        .toLowerCase()
        .includes(globalText);

    // COLUMN FILTERS
    const columnMatch = this.columns.every(col => {

      const filterValue = (this.filtersFD[col.field] || '')
        .toLowerCase()
        .trim();

      if (!filterValue) return true;

      const itemValue = (item[col.field] || '')
        .toString()
        .toLowerCase();

      return itemValue.includes(filterValue);
    });

    return globalMatch && columnMatch;
  });

  this.currentPage = 1;
}


selectedRow: any = null;

selectRow(item: any) {
  this.selectedRow = item;
}

doubleClickRow(item: any) {
  this.selectedRow = item;
}

get totalPages(): number {
  return Math.ceil(this.filteredItems.length / this.pageSize);
}

get paginatedItems() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredItems.slice(start, start + this.pageSize);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}



// deleteItem(id: number) {
//   if (!confirm('Are you sure you want to delete this item?')) return;

//   this.masterService.deleteItem(id).subscribe({
//     next: (res) => {
//       this.messageTitle = 'Success';
//       this.messageText = res.message;
//       this.showMessageBox = true;
//     },
//     error: (err) => {
//       this.messageTitle = 'Error';
//       this.messageText = err.error?.message || 'Delete failed';
//       this.showMessageBox = true;
//     }
//   });
// }

// confirmDelete()
// {
//   this.showMessageBox = false;
// }
deleteId: number | null = null;
deleteItem(id: number) {
   this.deleteId = id;
  //if (!confirm('Are you sure you want to delete this item?')) return;

  this.messageTitle = 'Success';
      this.messageText = 'Are you sure you want to delete this item?';
      this.showMessageBox = true;

}

confirmDelete() {

  if (!this.deleteId) return;

  console.log(this.deleteId);

  // close confirmation popup
  this.showMessageBox = false;

  this.masterService.deleteItem(this.deleteId).subscribe({

    next: (res) => {

      this.messageTitle = 'Success';
      this.messageText = res.message;

      // show success popup
      this.showMessageBox = true;

      // refresh list
      this.loadMasters();

      // optional
      // this.router.navigate(['/admin/item-master']);
    },

    error: (err) => {

      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';

      this.showMessageBox = true;
    }

  });

}


openItem(id: number) {
  this.router.navigate(['/admin/item-master/create', id]);

}

stockFilter:any = '';

selectedGroup: string = '';
selectedCode: string = '';
selectedManufacturer: string = '';

applyFilter() {
 this.filteredItems = this.items.filter(item => {

    const groupMatch =
      !this.selectedGroup ||
      item.commodityGroup?.toLowerCase().trim() ===
      this.selectedGroup.toLowerCase().trim();

    return groupMatch;
  });
}

// downloadItems() {
//   this.masterService.exportItems().subscribe((res: Blob) => {

//     const blob = new Blob([res], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'items.csv';
//     a.click();

//     window.URL.revokeObjectURL(url);
//   });
// }

fromDate: any;
toDate: any;

downloadItems() {

  this.masterService.exportItems(this.fromDate, this.toDate)
    .subscribe((res: Blob) => {

      const blob = new Blob(
        [res],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;

      a.download = 'items.xlsx';

      a.click();

      window.URL.revokeObjectURL(url);

    });

}

selectedFile!: File;
errors: string[] = [];
isValid = false;
isUploading = false;

// UI states
buttonText = 'Import';
//buttonClass = 'bg-blue-500 text-white px-4 py-2 rounded';
buttonClass = 'border border-indigo-700 text-indigo-700 px-4 py-2 hover:bg-blue-500 hover:text-white rounded text-sm'

handleClick(fileInput: any) {
  if (!this.selectedFile) {
    fileInput.click(); // open file picker
  } else if (this.isValid) {
    this.uploadCsv(); // upload if valid
  }
}

onFileChange(event: any) {
  const file = event.target.files[0];
  this.reset();
  if (!file) return;

  // 🔹 File validation
  // if (!file.name.endsWith('.csv')) {
  //   this.errors.push('Only CSV file allowed');
  //   this.setErrorState();
  //   return;
  // }

  const allowedExtensions = ['csv', 'xls', 'xlsx'];

const extension = file.name.split('.').pop()?.toLowerCase();

if (!extension || !allowedExtensions.includes(extension)) {

  this.messageTitle = 'Invalid File';

  this.messageText =
    'Only CSV, XLS and XLSX files are allowed';

  this.showMessageBox = true;

  this.setErrorState();

  return;
}

  if (file.size > 4 * 1024 * 1024) {
    this.errors.push('File too large (max 4MB)');
    this.setErrorState();
    return;
  }

  this.selectedFile = file;

  this.buttonText = 'Validating...';

  const reader = new FileReader();

  reader.onload = (e: any) => {
    const text = e.target.result;
    this.validateCSV(text);
  };

  reader.readAsText(file);
}

validateCSV(data: string) {
  const lines = data.split(/\r?\n/);

  if (lines.length < 2) {
    this.errors.push('Invalid CSV file');
    this.setErrorState();
    return;
  }

  const headers = lines[0].split(',').map(h => h.trim());

  const required = ['ItemCode', 'Name', 'ItemSet'];

  const missing = required.filter(r => !headers.includes(r));

  if (missing.length > 0) {
    //this.errors.push('Missing columns: ' + missing.join(', '));
    this.messageTitle = 'Missing columns';
      this.messageText =  'Missing columns: ' + missing.join(', ');
      this.showMessageBox = true;
  }

  const itemSetMap = new Map<string, number[]>();

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',');

    if (values.length !== headers.length) {
      //this.errors.push(`Row ${i + 1}: column mismatch`);
      this.messageTitle = 'Column Mismatch';
      this.messageText =  `Row ${i + 1}: column mismatch`;
      this.showMessageBox = true;
      //continue;
    }

    const row: any = {};
    headers.forEach((h, idx) => row[h] = values[idx]?.trim());

    // 🔴 Required validation
    if (!row['ItemCode']) {
      //this.errors.push(`Row ${i + 1}: ItemCode required`);
        this.messageTitle = 'ItemCode Required';
      this.messageText =  `Row ${i + 1}: ItemCode required`;
      this.showMessageBox = true;
    }

    if (!row['Name']) {
      //this.errors.push(`Row ${i + 1}: Name required`);
       this.messageTitle = 'Name Required';
      this.messageText =  `Row ${i + 1}: Name required`;
      this.showMessageBox = true;
    }

    if (!row['ItemSet']) {
      //this.errors.push(`Row ${i + 1}: ItemSet required`);
       this.messageTitle = 'Item Required';
      this.messageText =  `Row ${i + 1}: ItemSet required`;
      this.showMessageBox = true;
    }

    // ✅ DUPLICATE TRACKING
    const itemSet = row['ItemSet'];

    if (itemSet) {
      if (!itemSetMap.has(itemSet)) {
        itemSetMap.set(itemSet, []);
      }
      itemSetMap.get(itemSet)?.push(i + 1);
    }
  }

  // 🔴 DUPLICATE CHECK
  itemSetMap.forEach((rows, key) => {
    if (rows.length > 1) {

      this.messageTitle = 'Duplicate';
      this.messageText =  `Duplicate ItemSet "${key}" in rows: ${rows.join(', ')}`;
      this.showMessageBox = true;

      // this.errors.push(
      //   `Duplicate ItemSet "${key}" in rows: ${rows.join(', ')}`
      // );
    }
  });

  // FINAL STATE
  if (this.errors.length > 0) {
    this.setErrorState();
  } else {
    this.setValidState();
  }
}

setErrorState() {
  this.isValid = false;
  this.buttonText = 'Fix Errors';
  this.buttonClass = 'bg-red-500 text-white px-4 py-2 rounded';
}

setValidState() {
  this.isValid = true;
  this.buttonText = 'Uploading...';
  this.buttonClass = 'bg-gray-400 text-white px-4 py-2 rounded';

  this.uploadCsv(); // ✅ AUTO UPLOAD
}

uploadCsv() {
  if (!this.selectedFile || !this.isValid) return;

  this.isUploading = true;
  this.buttonText = 'Uploading...';
  this.buttonClass = 'bg-gray-400 text-white px-4 py-2 rounded';

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.masterService.importcsvfile(formData).subscribe({
    next: (res: any) => {
      this.isUploading = false;
      //alert(`Imported ${res.count} records`);

      this.messageTitle = 'Success';
      this.messageText = `Imported ${res.count} records`;
      this.showMessageBox = true;

      this.loadMasters();  
      this.resetUI();
    },
    error: () => {
      this.isUploading = false;
      this.setErrorState();
    }
  });
}

reset() {
  this.errors = [];
  this.isValid = false;
}

resetUI() {
  this.selectedFile = null as any;
  this.errors = [];
  this.isValid = false;

  this.buttonText = 'Import';
  this.buttonClass = 'bg-blue-500 text-white px-4 py-2 rounded';
}


//sortColumn: string = '';
//sortDirection: 'asc' | 'desc' = 'asc';

sortTable(field: string) {

  // toggle direction
  if (this.sortColumn === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = field;
    this.sortDirection = 'asc';
  }

  // sort MAIN DATA (IMPORTANT FIX)
  this.filteredItems.sort((a: any, b: any) => {

    const valA = a?.[field];
    const valB = b?.[field];

    if (valA == null && valB == null) return 0;
    if (valA == null) return this.sortDirection === 'asc' ? -1 : 1;
    if (valB == null) return this.sortDirection === 'asc' ? 1 : -1;

    const isNumber =
      !isNaN(valA as any) && !isNaN(valB as any);

    if (isNumber) {
      return this.sortDirection === 'asc'
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return this.sortDirection === 'asc'
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });

  // re-apply pagination after sorting
  this.currentPage = 1;
}

columns: any[] = [];
titleItems: any[] = [];

removeFields: string[] = [
  'id',
  'commodityGroupDesc',
  'commodityCodeDesc',
  'isRotating',
  'meter',
  'meterDesc',
  'meterGroup',
  'meterGroupDesc',
  'Msds',
  'Image',
  'Alternates',
  'Conditions'
];

// ✅ MUST MATCH EXACT API FIELD NAMES
columnOrder: string[] = ['itemSet', 'itemCode', 'name','status', 'commodityGroup', 'commodityGroupDesc', 'commodityCode', 'commodityCodeDesc', 'lotType', 'receiptTolerance', 'meter', 'meterDesc', 'meterGroup', 'meterGroupDesc', 'qty', 'model', 'serialNo', 'manufacturer', 'manufactureDate', 'period', 'warEndDate', 'orderUnit', 'issueUnit', 'msds', 'image', 'conditionEnabled', 'isKit', 'isCapitalized', 'inspectOnReceipt', 'isSparePart', 'attachToAsset', 'taxExempt', 'minimumStock', 'maximumStock', 'reorderLevel', 'reorderQuantity', 'safetyStock', 'leadTime', 'currentStock', 'totalStock', 'overallRemarks', 'orderUnitCost', 'issueUnitCost', 'conversion', 'baseQty', 'unitCost', 'standardCost', 'lastPurchaseCost', 'averageCost', 'currency', 'taxPercent', 'discountPercent', 'freightCost', 'landedCost', 'reorderCost', 'costingMethod', 'itemstatus', 'createdDate', 'alternates', 'conditions', 'storeroomItems'];

defaultVisibleFields: string[] = ['itemSet', 'itemCode', 'name','status', 'commodityGroup', 'commodityCode', 'qty', 'manufacturer', 'manufactureDate', 'period', 'warEndDate', 'orderUnit', 'issueUnit', 'taxExempt', 'minimumStock', 'maximumStock', 'reorderLevel', 'reorderQuantity', 'safetyStock', 'leadTime', 'currentStock', 'totalStock', 'orderUnitCost', 'issueUnitCost', 'conversion', 'baseQty', 'unitCost', 'standardCost', 'lastPurchaseCost', 'averageCost', 'currency', 'taxPercent', 'discountPercent', 'freightCost', 'landedCost', 'reorderCost', 'costingMethod', 'storeroomItems'];

fieldTitleMap: Record<string, string> = {
  itemSet: 'Item RefNo',
  itemCode: 'Item Code',
  name: 'Item Name',
  status: 'Status',
  commodityGroup: 'Commodity Group',
  commodityCode: 'Commodity Code',
  qty: 'Quantity',
  manufacturer: 'Manufacturer',
  manufactureDate: 'Manufacture Date',
  period: 'Warranty Period',
  warEndDate: 'Warranty End Date',
  orderUnit: 'Order Unit',
  issueUnit: 'Issue Unit',
  taxExempt: 'Tax Exempt',
  minimumStock: 'Minimum Stock',
  maximumStock: 'Maximum Stock',
  reorderLevel: 'Reorder Level',
  reorderQuantity: 'Reorder Quantity',
  safetyStock: 'Safety Stock',
  leadTime: 'Lead Time',
  currentStock: 'Current Stock',
  totalStock: 'Total Stock',
  orderUnitCost: 'Order Unit Cost',
  issueUnitCost: 'Issue Unit Cost',
  conversion: 'Conversion',
  baseQty: 'Base Quantity',
  unitCost: 'Unit Cost',
  standardCost: 'Standard Cost',
  lastPurchaseCost: 'Last Purchase Cost',
  averageCost: 'Average Cost',
  currency: 'Currency',
  taxPercent: 'Tax %',
  discountPercent: 'Discount %',
  freightCost: 'Freight Cost',
  landedCost: 'Landed Cost',
  reorderCost: 'Reorder Cost',
  costingMethod: 'Costing Method',
  storeroomItems: 'Storeroom Items'
};

getItems() {
  this.masterService.getItemlist().subscribe(res => {
    this.titleItems = (res as any[]) || [];

    if (!this.titleItems.length) {
      console.log("No data found");
      return;
    }

    const sampleItem = this.titleItems[0];

    const tempColumns = Object.keys(sampleItem)
      .filter(key => !this.removeFields.includes(key))
      .map(key => ({
        title:  this.fieldTitleMap[key] || this.formatTitle(key),
        field: key,
        visible: this.defaultVisibleFields.includes(key) 
      }));

    tempColumns.sort((a, b) => {
      const aIndex = this.columnOrder.indexOf(a.field);
      const bIndex = this.columnOrder.indexOf(b.field);

      return (aIndex === -1 ? 9999 : aIndex) - (bIndex === -1 ? 9999 : bIndex);
    });

    this.columns = tempColumns;
        this.cdr.detectChanges();

  });

}

// ✅ Format column title
formatTitle(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

filtersFD: Record<string, string> = {};

applyFiltersfield() {

  this.filteredItems = this.items.filter(item => {

    return this.columns.every(col => {

      const filterValue = (this.filtersFD[col.field] ?? '')
        .toString()
        .toLowerCase()
        .trim();

      if (!filterValue) return true;

      const itemValue = (item[col.field] ?? '')
        .toString()
        .toLowerCase();

      return itemValue.includes(filterValue);
    });

  });

  this.currentPage = 1;
}


filterItems() {

  if (!this.fromDate || !this.toDate) {

    this.filteredItems = this.items;

    return;
  }

  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);

  this.filteredItems = this.items.filter(item => {

    const createdDate = new Date(item.createdDate);

    return createdDate >= from &&
           createdDate <= to;

  });

}

clearFilter() {

  this.fromDate = null;

  this.toDate = null;

  // restore original data
  this.filteredItems = [...this.items];

  this.showdatenDropdown=false;

}

filterStock() {

  if (!this.stockFilter) {

    this.filteredItems = [...this.items];

    return;
  }

  // STOCK RETURN
  if (this.stockFilter === 'RETURN') {

    this.filteredItems = this.items.filter(x =>
      x.stockreturn != null &&
      x.stockreturn !== ''
    );

  }

  // AVAILABLE STOCK
  else if (this.stockFilter === 'AVAILABLE') {

    this.filteredItems = this.items.filter(x =>
      x.totalStock > 0
    );

  }

  // OUT OF STOCK
  else if (this.stockFilter === 'OUT') {

    this.filteredItems = this.items.filter(x =>
      x.totalStock == 0
    );

  }

  // LOW STOCK
  else if (this.stockFilter === 'LOW') {

    this.filteredItems = this.items.filter(x =>
      x.totalStock < x.minimumStock
    );

  }

}



}