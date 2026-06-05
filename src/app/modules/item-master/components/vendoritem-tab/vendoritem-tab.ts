import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronsRight,ArrowDownNarrowWide,ArrowUpNarrowWide } from 'lucide-angular';
import { ItemCreate } from '../../pages/item-create/item-create';
import { Master } from '../../../../core/services/master';
import { MessageBox } from '../../../../shared/message-box/message-box';

interface vendorsdetail {
  name: string;
  LeadTimeDays: string;
  TaxExempt: string;
  DefaultVendor: string;
  organization: string;
  site: string;
}

@Component({
  selector: 'app-vendoritem-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule,MessageBox, FormsModule],
  templateUrl: './vendoritem-tab.html',
  styleUrls: ['./vendoritem-tab.css'],
})
export class VendoritemTab{
    @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';
  @Input() form!: FormGroup;

  search = Search;
  chevronsright = ChevronsRight;

  sortColumn: string = '';
      movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

sortDirection: 'asc' | 'desc' = 'asc';

    private _itemId: any;

@Input()
set itemId(value: any) {

  this._itemId = value;

}

  expandedIndex: number | null = null;

  constructor(private fb: FormBuilder,private ItemCreate: ItemCreate,private masterservice: Master,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {  
    this.loadMasters(this._itemId)
    
    // Add parent form controls
    this.form.addControl('venitemCode', this.fb.control('', Validators.required));
    this.form.addControl('venitemName', this.fb.control('', Validators.required));
    this.form.addControl('vendorsdetail', this.fb.array([]));
    this.openitemlistgroup();

      }

  get vendorsdetail(): FormArray {
    return this.form.get('vendorsdetail') as FormArray;
  }


  createVendorGroup(vendorsdetail?: any): FormGroup {
  return this.fb.group({
    pono: [vendorsdetail?.pono || '', Validators.required],
    companyName: [vendorsdetail?.companyName || ''],
    invoiceno: [vendorsdetail?.invoiceno || ''],
    leadtimedelay: [vendorsdetail?.leadtimedelay || ''],
    taxexempt: [Boolean(vendorsdetail?.taxexempt)]
  });
  
}

  addVendor(vendorsdetail?: vendorsdetail) {
    this.vendorsdetail.push(this.createVendorGroup(vendorsdetail));
    this.expandedIndex = this.vendorsdetail.length - 1; // auto-open the new form
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  saveVendor(event: any)  {

  const vendordetails = this.vendorsdetail.at(event).value;
   this.expandedIndex = null;

    const index = Number(event);

    const vendorData = {
  ...this.vendorsdetail.at(index).value,
  itemId: this._itemId
};
  this.masterservice.vendordetails(vendorData).subscribe(res => {
    if(res.success === true)
    {
        this.showMessageBox = true
        this.messageTitle = 'Save';
        this.messageText = "Saved Vendor"; 
    }
     this.cdr.detectChanges(); 
        
     this.expandedIndex = null; // keep form open
  });

     this.messageTitle = 'Save';
     this.messageText = 'Save Successfully';
     this.showMessageBox = true;
     this.expandedIndex = index; // keep form open
  }

//     deleteVendor(index: number) {
//     if (confirm('Are you sure you want to delete this vendor?')) {
//       this.vendorsdetail.removeAt(index);
//       // Close the form if the deleted row was expanded
//       if (this.expandedIndex === index) {
//         this.expandedIndex = null;
//       } else if (this.expandedIndex && this.expandedIndex > index) {
//         this.expandedIndex--; // adjust expanded index
//       }
//     }
// }

deleteIndex: number | null = null;

deleteVendor(id: number) {

  this.deleteIndex = id;

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this vendor?';
  this.showMessageBox = false;
}

confirmDeleteVendor() {

    if (this.deleteIndex == null) return;

    this.masterservice.vendordetaildelete(this.deleteIndex).subscribe({
    next: (res: any) => {

      this.messageTitle = 'Success';
      this.messageText = res.message;
      this.showMessageBox = true;

      this.deleteIndex = null;

    },

    error: (err: any) => {

      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';
      this.showMessageBox = true;

      this.deleteIndex = null;
    }
  });

  if (this.deleteIndex !== null) {
    this.vendorsdetail.removeAt(this.deleteIndex);

    // Handle expanded row
    if (this.expandedIndex === this.deleteIndex) {

      this.expandedIndex = null;
    }
    else if (
      this.expandedIndex !== null &&
      this.expandedIndex > this.deleteIndex
    ) {

      this.expandedIndex--;
    }
  }

  this.showMessageBox = false;
  this.deleteIndex = null;
}

openCommodityHandler(type: string) {
  this.ItemCreate.openCommodityHandler(type)
}

ngOnChanges(changes: SimpleChanges) {
  console.log("Changes:", changes);

  if (changes['itemId']?.currentValue) {
    console.log("Received ID:", changes['itemId'].currentValue);

    setTimeout(() => {
      this.loadItem(changes['itemId'].currentValue);
    });
  }
}

loadItem(id: any) {
  this.masterservice.getItemById(id).subscribe((res: any) => {  
    console.log("API RESPONSE:", res);
    this.form.patchValue({
      venitemCode: res.itemCode,
      venitemName: res.name
    });
  });
}

loadMasters(value: number) {
  this.masterservice.getvendorsItem(value).subscribe((res: any) => {
    console.log(res)
    const data = Array.isArray(res) ? res : [];

    this.allvendorsdetail = res;

    this.vendorsdetail.clear();

    data.forEach((item: any) => {
      this.vendorsdetail.push(this.createVendorGroup(item));

    });


    console.log("FORM VALUE:", this.vendorsdetail.value);

    this.cdr.detectChanges();
  });
}


showGroupDropdown = false;

filteredGroups: any[] = [];

selectedGroupName = '';

Itemlist: any[] = [];
openitemlistgroup() {
  this.masterservice.getItemList().subscribe(res => {
    this.Itemlist = res as any[] || [];
    
    this.filteredGroups = this.Itemlist;
    this.cdr.detectChanges(); 
  });

}

// 🔍 Filter Group
filterGroups(event: any) {
  const value = event.target.value.toLowerCase();

  this.filteredGroups = this.Itemlist.filter((g: any) =>
    g.itemName.toLowerCase().includes(value)
  );
}

// 🔍 Select Group
selectGroup(group: any) {
  this.form.patchValue({ 
     venitemName: group.itemName,
       venitemCode: group.itemCode
 });
  this.selectedGroupName = group.itemName;
  this.showGroupDropdown = false;
}

closeDropdown() {
  setTimeout(() => {
    this.showGroupDropdown = false;
  }, 200);
}


@HostListener('document:click', ['$event'])
clickOutside(event: any){

 if(!event.target.closest('.dropdown-wrapper')){
   this.showGroupDropdown = false;
 }

}

currentPage = 1;
pageSize = 10;

get totalPages(): number {
  return Math.ceil(this.vendorsdetail.controls.length / this.pageSize);
}

  get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
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

poNoFilter = '';
companyFilter = '';
invoiceFilter = '';
leadTimeFilter = '';
taxFilter = '';

allvendorsdetail: any[] = [];

applyFilters() {

  const filtered = this.allvendorsdetail.filter((row: any) => {

    console.log('FULL ROW:', row);

    const pono =
      String(row.pono || '')
        .toLowerCase();

    const company =
      String(row.companyname || '')
        .toLowerCase();

    const invoice =
      String(row.invoiceno || '')
        .toLowerCase();

    const leadtime =
      String(row.leadTimeDays || '')
        .toLowerCase();

    const tax =
      String(row.taxExempt)
        .toLowerCase();

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

  this.vendorsdetail.clear();

  filtered.forEach((item: any) => {
    this.vendorsdetail.push(this.createVendorGroup(item));
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

// deleteVendor(index: number) {
//   this.vendors.splice(index, 1);
// }

// saveVendor(index: number) {
//   console.log('Save:', index);
// }


}