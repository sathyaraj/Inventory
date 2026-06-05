import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Input,SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { LucideAngularModule, Search, ChevronsRight,ArrowDownNarrowWide,ArrowUpNarrowWide } from 'lucide-angular';
import { ItemCreate } from '../../pages/item-create/item-create';
import { Master } from '../../../../core/services/master';
import { isActive } from '@angular/router';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { HttpErrorResponse } from '@angular/common/http';

interface addstoreroomform{
 site: string,
storename: string,
storedescription: string
}

interface addstoreroomlistform{
    itemname: string,
    issuecost: number,
    unitcost: number,
    defaultbin: number,
    currentbalance: number,
    lot: string,
    issueunit: number,
    orderunit: number,
    site: string
  }

@Component({
  selector: 'app-vendor-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, MessageBox, FormsModule],
  templateUrl: './vendor-tab.html',
  styleUrls: ['./vendor-tab.css'],
})
export class VendorTab {

    sortColumn: string = '';
      movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

sortDirection: 'asc' | 'desc' = 'asc';

    @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';

  @Input() form!: FormGroup;
//addstoreroomlistform!: FormGroup;
  //@Input() itemId: any
  search = Search;
  chevronsright = ChevronsRight;

  showStoreroom = false;
  showaddStoreroom = false;
  showdetailStoreroom = false;
  showDetails = false;
  
  private _itemId: any;

@Input()
set itemId(value: any) {

  this._itemId = value;

}

  constructor(private fb: FormBuilder,private ItemCreate:ItemCreate, private masterservice: Master,private cdr: ChangeDetectorRef) {}

ngOnInit(): void {


  this.loadMasters(this._itemId)

  if (!this.form.get('storerooms')) {
  this.form.addControl('storerooms', this.fb.array([]));
}

 // ✅ MUST be FormGroup (not control/array)
  this.form.addControl('addstoreroomform', this.fb.group({
    site: ['', Validators.required],
    storename: ['', Validators.required],
    storedescription: ['', Validators.required]
  }));

  // ✅ MUST be FormGroup
  this.form.addControl('addstoreroomlistform', this.fb.group({
    itemname: [''],
    issuecost: [''],
    unitcost: ['0.00'],
    defaultbin: [''],
    currentbalance: [''],
    lot: [''],
    issueunit: [''],
    orderunit: [''],
    isActive: ['true'],
    site: ['']
  }));
    this.openitemlistgroup();   
}

createStoreroom(data: any): FormGroup {
  return this.fb.group({
    site: [data.site|| ''],
    storename: [data.storename || data.storeroom || ''],
    storedescription: [data.storedescription || ''],
    itemname: [data.itemname || data.itemName || ''],
    issuecost: [data.issuecost || data.issueCost || ''],
    unitcost: [data.unitcost || data.unitCost || 0],
    defaultbin: [data.defaultbin || ''],
    currentbalance: [data.currentbalance || data.currentBalance || 0],
    lot: [data.lot || ""],
    issueunit: [data.issueunit || data.issueUnit || ''],
    orderunit: [data.orderunit|| data.orderUnit||''],
    isActive : [data.isActive || ''],
    id: [data.id || '']
  });
}

  

  // Getter
  get storerooms(): FormArray {
    return this.form.get('storerooms') as FormArray;
  }


  get addStoreroomListForm(): FormGroup {
  return this.form.get('addstoreroomlistform') as FormGroup;
}

  // Open popup
  addliststoreroom() {

    this.showStoreroom = true;
    this.showaddStoreroom = true;
  }

  //addstoreroomlistform!: FormGroup;

  selectedStoreroom: any = null;

addstoreroom() {

  if (this.addStoreForm.invalid) {
    this.addStoreForm.markAllAsTouched();
    return;
  }

  const formValue = this.addStoreForm.value;

  // 🔥 IMPORTANT: store site here
  this.selectedStoreroom = {
    site: formValue.site || '',   // ✅ ensure value
    storename: formValue.storename || '',
    storedescription: formValue.storedescription || ''
  };

  console.log('Saved Store:', this.selectedStoreroom);

   this.storeListForm.patchValue({ 
    site: formValue.site

   })


  this.addStoreForm.reset();

  this.showaddStoreroom = false;
  this.showdetailStoreroom = true;
}

  // Close popup
  closestoreroom() {
    this.showStoreroom = false;
    this.showaddStoreroom = false;
    this.showdetailStoreroom = false;
  }

  codeclosecommodity() {
    this.closestoreroom();
  }

  // Toggle details
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  storeDetailsList: any[] = [];

// submit() {


//   this.messageTitle = 'Save';
//   this.messageText = 'Save Successully';
//   this.showMessageBox = true;

//   if (this.storeListForm.invalid) {
//     console.log('Form is invalid');
//     return;
//   }

//   const listForm = this.form.get('addstoreroomlistform') as FormGroup;

//   // ✅ merge using saved data (NOT form again)
//   const combinedData = {
//     ...listForm.value,
//     ...this.selectedStoreroom,
    
//   };
  
//   //console.log('Final Data:', combinedData);

//   // ✅ push into array
//   this.storerooms.push(this.createStoreroom(combinedData));

//   const list = this.storerooms.value;
//   // reset
//   //listForm.reset();
//   this.closestoreroom()
// }

submit() {

  if (this.storeListForm.invalid) {
    return;
  }

  const listForm = this.form.get('addstoreroomlistform') as FormGroup;

  const combinedData = {
    ...listForm.value,
    ...this.selectedStoreroom,
    itemId: this._itemId
  };

  this.masterservice.storeroomDetails(combinedData).subscribe(res => {
  
    if(res.success === true)
    {
        this.showMessageBox = true
        this.messageTitle = 'Save';
        this.messageText = "Saved Vendor"; 
    }
     this.cdr.detectChanges(); 
        
  });

  // ADD TO FORMARRAY
  this.storerooms.push(this.createStoreroom(combinedData));

  // ✅ IMPORTANT
  this.allStorerooms.push(combinedData);

  this.closestoreroom();
}

  storeclose() {
    this.showdetailStoreroom = false;
  }
   storedeleteRow() {
    console.log('delete clicked');
  }

// deleteRow(index: number) {
//   if (confirm('Are you sure to delete?')) {
//     this.storerooms.removeAt(index);
//   }
// }

deleteId: number | null = null;

deleteRow(id: number) {

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this row?';
  this.showMessageBox = true;

  this.deleteId = id;
}

confirmDelete() {

  if (this.deleteId == null) return;

   const index = this.storerooms.controls.findIndex(
    x => x.get('id')?.value == this.deleteId
  );

  if (index !== -1) {
    this.storerooms.removeAt(index);
  }



  this.showMessageBox = false;
  this.masterservice.storeroomdetaildelete(this.deleteId).subscribe({
    next: (res: any) => {

      this.messageTitle = 'Success';
      this.messageText = res.message;
      this.showMessageBox = true;

      this.deleteId = null;

    },

    error: (err: any) => {

      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';
      this.showMessageBox = true;

      this.deleteId = null;
    }
  });
}
  openCommodityHandler(type: string) {
  this.ItemCreate.openCommodityHandler(type)
  }

  opencommodity()
  {
    this.showStoreroom = true
  }

  get addStoreForm() {
  return this.form.get('addstoreroomform') as FormGroup;
}

get storeListForm() {
  return this.form.get('addstoreroomlistform') as FormGroup;
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
    console.log("API RESPONSE1:", res);
    this.form.patchValue({
      storeitemCode: res.itemCode,
      storeitemName: res.name
    });
     this.storeListForm.patchValue({
      itemname: res.name,
      currentbalance: res.qty,
      unitcost:res.unitCost,
      lot: res.lotType,
      issueunit: res.issueUnit,
      orderunit: res.orderUnit,
      issuecost : res.currency??"AED",
    });

  });
}


// loadMasters() {
//   this.masterservice.getstoreroomItem().subscribe((res: any) => {
     
//     const data = Array.isArray(res) ? res : [];
//     this.storerooms.clear();

//     data.forEach((item: any) => {

//       this.storerooms.push(this.createStoreroom(item));


//     });

//   return this.storerooms.value;

//   });
// }

loadMasters(value:number) {
  
  this.masterservice.getstoreroomItem(value).subscribe((res: any) => {

    console.log("API RESPONSE STR:", res);


    const data = Array.isArray(res) ? res : [];

      // ✅ store original data
      this.allStorerooms = [...data];

      // ✅ clear formarray
      this.storerooms.clear();

      // ✅ load table
      data.forEach((item: any) => {
        this.storerooms.push(this.createStoreroom(item));
      });

    
    //const data = Array.isArray(res) ? res : [];

    // this.storerooms.clear();

    // data.forEach((item: any) => {
    //   this.storerooms.push(this.createStoreroom(item));
    // });

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
     storeitemName: group.itemName,
       storeitemCode: group.itemCode
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
  return Math.ceil(this.storerooms.controls.length / this.pageSize);
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


// FILTER VALUES
storeroomsFilter = '';
standardCostFilter = '';
stockbalanceFilter = '';
statusFilter = '';
siteFilter = '';

// BACKUP DATA
allStorerooms: any[] = [];


// applyFilters() {

//   const filtered = this.allStorerooms.filter((row: any) => {

//     const storename =
//       `${row.storename || ''} ${row.storedescription || ''}`
//         .toLowerCase();

//     const unitcost =
//       String(row.unitcost || row.unitCost || '')
//         .toLowerCase();

//     const currentbalance =
//       String(row.currentbalance || row.currentBalance || '')
//         .toLowerCase();

//     const status =
//       String(row.isActive || '')
//         .toLowerCase();

//     const site =
//       String(row.site || '')
//         .toLowerCase();

//     return (
//       storename.includes(this.storeroomsFilter.toLowerCase()) &&
//       unitcost.includes(this.standardCostFilter.toLowerCase()) &&
//       currentbalance.includes(this.stockbalanceFilter.toLowerCase()) &&
//       status.includes(this.statusFilter.toLowerCase()) &&
//       site.includes(this.siteFilter.toLowerCase())
//     );
//   });

//   // CLEAR TABLE
//   this.storerooms.clear();

//   // REBUILD FILTERED DATA
//   filtered.forEach((item: any) => {
//     this.storerooms.push(this.createStoreroom(item));
//   });
//    this.currentPage = 1;
// }

applyFilters() {



  const filtered = this.allStorerooms.filter((row: any) => {
    const storename =
      `${row.storeroom || ''} ${row.storedescription || ''}`
        .toLowerCase();

    const unitcost =
      String(row.unitcost || row.unitCost || '')
        .toLowerCase();

    const currentbalance =
      String(row.currentbalance || row.currentBalance || '')
        .toLowerCase();

    const status =
      String(row.isActive || '')
        .toLowerCase();

    const site =
      String(row.site || '')
        .toLowerCase();

    console.log('ROW DATA');
    console.log({
      storename,
      unitcost,
      currentbalance,
      status,
      site
    });

    const match =
      storename.includes(this.storeroomsFilter.toLowerCase()) &&
      unitcost.includes(this.standardCostFilter.toLowerCase()) &&
      currentbalance.includes(this.stockbalanceFilter.toLowerCase()) &&
      status.includes(this.statusFilter.toLowerCase()) &&
      site.includes(this.siteFilter.toLowerCase());

    console.log('MATCH RESULT:', match);

    return match;
  });

  // CLEAR TABLE
  this.storerooms.clear();

  // REBUILD FILTERED DATA
  filtered.forEach((item: any) => {
    this.storerooms.push(this.createStoreroom(item));
  });

  this.currentPage = 1;

  console.log('FILTER END');
}

filteredItems: any[] = [];

sortTable(field: string) {

  // toggle sort direction
  if (this.sortColumn === field) {
    this.sortDirection =
      this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = field;
    this.sortDirection = 'asc';
  }

  // convert formarray -> normal array
  const data = this.storerooms.value;

  data.sort((a: any, b: any) => {

    const valA = a?.[field];
    const valB = b?.[field];

    if (valA == null && valB == null) return 0;
    if (valA == null)
      return this.sortDirection === 'asc' ? -1 : 1;

    if (valB == null)
      return this.sortDirection === 'asc' ? 1 : -1;

    const isNumber =
      !isNaN(valA as any) &&
      !isNaN(valB as any);

    if (isNumber) {

      return this.sortDirection === 'asc'
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return this.sortDirection === 'asc'
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());

  });

  // rebuild formarray
  this.storerooms.clear();

  data.forEach((item: any) => {
    this.storerooms.push(this.createStoreroom(item));
  });

  this.currentPage = 1;
}


}