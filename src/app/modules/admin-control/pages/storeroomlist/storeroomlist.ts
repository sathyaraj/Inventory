import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';
import {
  Warehouse,
  Trash,
  SquarePen,
  Info,
  MoveUp,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide
} from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';

@Component({
  selector: 'app-storeroomlist',
  imports: [CommonModule,ReactiveFormsModule,LucideAngularModule, MessageBox, FormsModule],
  templateUrl: './storeroomlist.html',
  styleUrl: './storeroomlist.css',
})
export class Storeroomlist {

   sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';

showColumnDropdown = false;

showdatenDropdown = false;

showrowDropdown =false;

  warehouse = Warehouse;
trash = Trash;
pencil = SquarePen;
info = Info;
chevronsupdown = MoveUp;
movedown = ArrowDownNarrowWide;
moveup = ArrowUpNarrowWide;
showMessageBox = false;
 messageTitle = '';
 messageText = '';

 constructor(private fb:FormBuilder, private router: Router,private adminMaster: Adminmaster, private chr: ChangeDetectorRef,private route :ActivatedRoute){}
ngOnInit(){
  this.getStoreroomList()
   
    const id = this.route.snapshot.paramMap.get('id') ?? "";
     
}

get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

goToPage(page: number) {
  this.currentPage = page;
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
  this.adminMaster.userdetailslist().subscribe(res => {
    this.items = res as any[];
    this.filteredItems = [...this.items];
    this.currentPage = 1; // ✅ important
    this.chr.detectChanges();
  });
}

 addStoreroom()
  {
     this.router.navigate(['/admin/admin-control/storeroom']); 
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

  this.adminMaster.deleteuserlistItem(this.deleteId).subscribe({

    next: (res) => {

      this.messageTitle = 'Success';
      this.messageText = "Delete Uset";

      // show success popup
      this.showMessageBox = true;

      // refresh list
      this.loadMasters();
      this.chr.detectChanges();

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
  this.router.navigate(['/admin/admin-control/storeroom', id]);

}

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

removeFields: string[] = [];
// ✅ MUST MATCH EXACT API FIELD NAMES

columnOrder: string[] = [

  'storeroomCode',
  'storeroomName',
  'site',
  'building',
  'location',
  'warehouseType',
  'contactPerson',
  'contactNumber',
  'email',
  'department',
  'costCenter',
  'currency',
  'inventoryValue',
  'isActive'

];

defaultVisibleFields: string[] = [

  'storeroomCode',
  'storeroomName',
  'site',
  'warehouseType',
  'contactPerson',
  'contactNumber',
  'inventoryValue',
  'isActive'

];

fieldTitleMap: Record<string, string> = {

  storeroomCode: 'Code',
  storeroomName: 'Storeroom Name',
  site: 'Site',
  building: 'Building',
  location: 'Location',
  warehouseType: 'Type',
  contactPerson: 'Contact Person',
  contactNumber: 'Contact Number',
  email: 'Email',
  department: 'Department',
  costCenter: 'Cost Center',
  currency: 'Currency',
  inventoryValue: 'Inventory Value',
  isActive: 'Status'

};

getStoreroomList() {

  this.adminMaster.storeroomList().subscribe(res => {

    this.titleItems = (res as any[]) || [];

    this.items = [...this.titleItems];

    this.filteredItems = [...this.titleItems];

    this.columns = this.columnOrder.map(field => ({
      title: this.fieldTitleMap[field] || this.formatTitle(field),
      field,
      visible: this.defaultVisibleFields.includes(field)
    }));

    this.chr.detectChanges();

  });

}

// ✅ Format column title
formatTitle(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

}
