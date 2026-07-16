import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import {FormArray,FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import {Search,ChevronsRight,ArrowDownNarrowWide,ArrowUpNarrowWide} from 'lucide-angular';
import { ItemCreate } from '../../../item-master/pages/item-create/item-create';
import { Master } from '../../../../core/services/master';
import { ServiceCreate } from '../../pages/service-create/service-create';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { MessageBox } from '../../../../shared/message-box/message-box';
interface supplierdetails {
  name: string;
  LeadTimeDays: string;
  TaxExempt: string;
  DefaultVendor: string;
  organization: string;
  site: string;
}

@Component({
  selector: 'app-supplier-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule,
    MessageBox
  ],
  templateUrl: './supplier-tab.html',
  styleUrl: './supplier-tab.css'
})
export class SupplierTab {

  showMessageBox: boolean = false;
  messageTitle: string = '';
  messageText: string = '';

  @Input() form!: FormGroup;

  search = Search;
  chevronsright = ChevronsRight;
  movedown = ArrowDownNarrowWide;
  moveup = ArrowUpNarrowWide;

  expandedIndex: number | null = null;

  currentPage = 1;
  pageSize = 10;


  sortColumn: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

    private _itemId: any;

@Input()
set serviceitemId(value: any) {
  this._itemId = value;
}

  constructor(private fb: FormBuilder, private serviceCreate:ServiceCreate, private masterService: Master,private adminMaster: Adminmaster, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

        this.loadMasters(this._itemId,"ServiceItem")

    if (!this.form.get('venitemCode')) {
      this.form.addControl(
        'venitemCode',
        this.fb.control('', Validators.required)
      );
    }

    if (!this.form.get('venitemName')) {
      this.form.addControl(
        'venitemName',
        this.fb.control('', Validators.required)
      );
    }

    if (!this.form.get('supplierdetails')) {
      this.form.addControl(
        'supplierdetails',
        this.fb.array([])
      );
    }
  }

  get supplierdetails(): FormArray {
    return this.form.get('supplierdetails') as FormArray;
  }
  

  createVendorGroup(supplierdetails?: any): FormGroup {
    return this.fb.group({
      id: [supplierdetails?.id || 0],
      pono: [supplierdetails?.pono || '', Validators.required],
      companyName: [supplierdetails?.companyName || ''],
      invoiceno: [supplierdetails?.invoiceno || ''],
      leadtimedelay: [supplierdetails?.leadtimedelay || ''],
      taxexempt: [supplierdetails?.taxexempt || false]
    });
  }

 
  addVendor(supplierdetails?: supplierdetails) {
  this.supplierdetails.push(this.createVendorGroup(supplierdetails));

  const newIndex = this.supplierdetails.length - 1;

  // Open the newly added row
  this.expandedIndex = newIndex;

  // Move to the page where the new row exists
  this.currentPage = Math.floor(newIndex / this.pageSize) + 1;
}

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }


    saveVendor(event: any)  {

  const vendordetails = this.supplierdetails.at(event).value;
   this.expandedIndex = null;

    const index = Number(event);

    const vendorData = {
      ...this.supplierdetails.at(index).value,
      itemId: this._itemId,
      type : 'ServiceItem'
    };
  this.masterService.vendordetails(vendorData).subscribe(res => {
    if(res.success === true)
    {
        this.showMessageBox = true
        this.messageTitle = 'Save';
        this.messageText = "Saved supplier successfully"; 
    }
     this.cdr.detectChanges(); 
        
     this.expandedIndex = null; // keep form open
  });

     this.messageTitle = 'Save';
     this.messageText = 'Save Successfully';
     this.showMessageBox = true;
     this.expandedIndex = index; // keep form open
  }

  // saveVendor(index: number): void {

  //   const rowData = this.supplierdetails.at(index).value;

  //   console.log('Saved Row:', rowData);

  //   this.expandedIndex = null;
  // }

//   deleteIndex: number | null = null;

// deleteVendor(id: number) {

//   this.deleteIndex = id;

//   this.messageTitle = 'Delete Confirmation';
//   this.messageText = 'Are you sure you want to delete this vendor?';
//   this.showMessageBox = false;
// }

// confirmDeleteVendor() {

//     if (this.deleteIndex == null) return;

//     this.masterService.vendordetaildelete(this.deleteIndex).subscribe({
//     next: (res: any) => {

//       this.messageTitle = 'Success';
//       this.messageText = res.message;
//       this.showMessageBox = true;

//       this.deleteIndex = null;

//     },

//     error: (err: any) => {

//       this.messageTitle = 'Error';
//       this.messageText = err.error?.message || 'Delete failed';
//       this.showMessageBox = true;

//       this.deleteIndex = null;
//     }
//   });

//   if (this.deleteIndex !== null) {
//     this.supplierdetails.removeAt(this.deleteIndex);

//     // Handle expanded row
//     if (this.expandedIndex === this.deleteIndex) {

//       this.expandedIndex = null;
//     }
//     else if (
//       this.expandedIndex !== null &&
//       this.expandedIndex > this.deleteIndex
//     ) {

//       this.expandedIndex--;
//     }
//   }

//   this.showMessageBox = false;
//   this.deleteIndex = null;
// }

deleteId: number | null = null;
deleteIndex: number | null = null;

showConfirmBox = false;

deleteVendor(id: number, index: number) {

  this.deleteId = id;
  this.deleteIndex = index;

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this vendor?';

  this.showConfirmBox = true;
}

confirmDelete() {

  if (this.deleteId == null || this.deleteIndex == null) {
    return;
  }

  this.showConfirmBox = false;
  this.supplierdetails.removeAt(this.deleteIndex!);

  this.masterService.vendordetaildelete(this.deleteId)
    .subscribe({
      next: (res: any) => {

        this.messageTitle = 'Success';
        this.messageText = res.message || 'Deleted successfully';

        this.showMessageBox = true;

        this.deleteId = null;
        this.deleteIndex = null;
        this.cdr.detectChanges()
      },

      error: (err: any) => {

        this.messageTitle = 'Error';
        this.messageText =
          err.error?.message || 'Delete failed';

        this.showMessageBox = true;

        this.deleteId = null;
        this.deleteIndex = null;
        this.cdr.detectChanges()
      }
    });
}



  get totalPages(): number {
    return Math.ceil(
      this.supplierdetails.length / this.pageSize
    );
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

poNoFilter = '';
companyFilter = '';
invoiceFilter = '';
leadTimeFilter = '';
taxFilter = '';

allsupplierdetails: any[] = [];

applyFilters() {

  const filtered = this.allsupplierdetails.filter((row: any) => {

    console.log('FULL ROW:', row);

    const pono =String(row.pono || '').toLowerCase();
    const company =String(row.companyname || '').toLowerCase();
    const invoice =String(row.invoiceno || '').toLowerCase();
    const leadtime =String(row.leadTimeDays || '').toLowerCase();
    const tax =String(row.taxExempt).toLowerCase();

    console.log('ROW VALUES:', {
      pono,
      company,
      invoice,
      leadtime,
      tax
    });

    const match =
      pono.includes(this.poNoFilter.toLowerCase()) &&
      company.includes(this.companyFilter.toLowerCase()) &&
      invoice.includes(this.invoiceFilter.toLowerCase()) &&
      leadtime.includes(this.leadTimeFilter.toLowerCase()) &&
      tax.includes(this.taxFilter.toLowerCase());

    console.log('MATCH RESULT:', match);

    return match;
  });

  console.log('FILTERED RESULT:', filtered);

  this.supplierdetails.clear();

  filtered.forEach((item: any) => {
    this.supplierdetails.push(this.createVendorGroup(item));
  });

  this.currentPage = 1;

}

filteredItems: any[] = [];

sortTable(event: any) {

  // toggle direction
  if (this.sortColumn === event) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = event;
    this.sortDirection = 'asc';
  }

  // sort MAIN DATA (IMPORTANT FIX)
  this.filteredItems.sort((a: any, b: any) => {

    const valA = a?.[event];
    const valB = b?.[event];

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


onSort(column: any) {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  // apply sorting logic here
}


vendors: any[] = [];

columns = [
  { field: 'pono', label: 'PO No' },
  { field: 'companyname', label: 'Company Name' },
  { field: 'invoiceno', label: 'Invoice No' },
  { field: 'leadtimeday', label: 'Lead Time' },
  { field: 'taxexempt', label: 'Tax Exempt' }
];

editVendor(event: any) {
  console.log('Edit:', event);
}

openCommodityHandler(type: string) {
  this.serviceCreate.openCommodityHandler(type)
}

ngOnChanges(changes: SimpleChanges) {
  console.log("Changes:", changes);

  if (changes['serviceitemId']?.currentValue) {
    console.log("Received ID:", changes['serviceitemId'].currentValue);

    setTimeout(() => {
      this.loadItem(changes['serviceitemId'].currentValue);
    });
  }
}

loadItem(id: any) {
  this.adminMaster.getServiceItemById(id).subscribe((res: any) => {  
    console.log("API RESPONSE:", res);
    this.form.patchValue({
      venitemCode: res.serviceCode,
      venitemName: res.serviceName
    });
  });
}

loadMasters(value: number,type:string) {
  type="ServiceItem";
  this.masterService.getvendorsItem(value,type).subscribe((res: any) => {

    console.log('API RESPONSE:', res);

    const data = Array.isArray(res) ? res : [];

    this.allsupplierdetails = res;

    this.supplierdetails.clear();

    data.forEach((item: any) => {
      this.supplierdetails.push(this.createVendorGroup(item));

    });


    console.log("FORM VALUE:", this.supplierdetails.value);

    this.cdr.detectChanges();
  });
}



}