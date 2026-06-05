import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { LucideAngularModule } from 'lucide-angular';
import { User,Trash,SquarePen,Info,MoveDown,MoveUp,ArrowDownNarrowWide,ArrowUpNarrowWide  } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';


@Component({
  selector: 'app-vendorlist',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MessageBox,LucideAngularModule],
  templateUrl: './vendorlist.html',
  styleUrl: './vendorlist.css',
})
export class Vendorlist {

  sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';

showColumnDropdown = false;

showdatenDropdown = false;

showrowDropdown =false;


  trash = Trash;
  pencil = SquarePen ;
  info=Info;
  user=User;
  //movedown=MoveDown;
  chevronsupdown = MoveUp;
  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

 showMessageBox = false;
 messageTitle = '';
 messageText = '';

constructor (private fb:FormBuilder,private router: Router, private adminMaster:Adminmaster,private chr:ChangeDetectorRef, private route: ActivatedRoute) {}
ngOnInit(){
  this.getuserlist()
   
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

 adduser()
  {
     this.router.navigate(['/admin/admin-control/company']); 
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
  this.router.navigate(['/admin/admin-control/vendorlist', id]);

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
  'companyName',
  'companyCode',
  'companyEmail',
  'companyPhone',
  'businessType',
  'companyDescription',
  'address1',
  'address2',
  'country',
  'state',
  'city',
  'postalCode',
  'subscriptionPlan',
  'userLimit',
  'expiryDate'
];

defaultVisibleFields: string[] = [

  'companyName',
  'companyCode',
  'companyEmail',
  'companyPhone',
  'businessType',
  'companyDescription',
  'address1',
  'address2',
  'country',
  'state',
  'city',
  'postalCode',
  'subscriptionPlan',
  'userLimit',
  'expiryDate'
];

fieldTitleMap: Record<string, string> = {
  companyName: 'Name',
  companyCode: 'Code',
  companyEmail: 'Email',
  companyPhone: 'Phone',
  businessType: 'Type',
  companyDescription: 'Description',
  address1: 'Address First',
  address2: 'Address Second',
  country: 'Country',
  state: 'State',
  city: 'City',
  postalCode: 'Postal Code',
  subscriptionPlan: 'Plan',
  userLimit: 'User Limit',
  expiryDate: 'Expiry Date'
};

getuserlist() {

  this.adminMaster.companylist().subscribe(res => {

    this.titleItems = (res as any[]) || [];
    console.log(res)
    // IMPORTANT
    this.items = [...this.titleItems];

    this.filteredItems = [...this.titleItems];

    // BUILD COLUMNS
    this.columns = this.columnOrder.map(field => ({

      title: this.fieldTitleMap[field] || this.formatTitle(field),

      field: field,

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
