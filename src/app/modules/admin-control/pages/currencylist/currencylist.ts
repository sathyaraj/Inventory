import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import { Settings,Trash,SquarePen,Info,MoveDown,MoveUp,ArrowDownNarrowWide,ArrowUpNarrowWide  } from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';

@Component({
  selector: 'app-currencylist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule,MessageBox],
  templateUrl: './currencylist.html',
  styleUrl: './currencylist.css',
})
export class Currencylist {

    sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';


   trash = Trash;
  pencil = SquarePen ;
  info=Info;
  Settings = Settings

  chevronsupdown = MoveUp;
  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

showMessageBox = false;
showConfirmBox = false;
messageTitle = '';
messageText = '';

constructor(private fb: FormBuilder,private router: Router, private adminMaster:Adminmaster, private cdr:ChangeDetectorRef){}

ngOnInit(){

    this.getCurrencies()
}

 get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

goToPage(page: number) {
  this.currentPage = page;
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


currencylist: any[] = [];
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


loadadminmaster(){
  this.adminMaster.getcurrencylist().subscribe(res => {
    this.currencylist = res as any[];
    this.filteredItems = [...this.currencylist];
    this.currentPage = 1; // ✅ important
    this.cdr.detectChanges();
  })

}

deleteId: number | null = null;
deleteItem(id: number) {
   this.deleteId = id;
         this.showMessageBox = true;
  this.messageTitle = 'Success';
      this.messageText = 'Are you sure you want to delete this item?';
      this.showConfirmBox  = true;
      
      this.cdr.detectChanges();

}

confirmDelete() {

  if (!this.deleteId) return;

  // close confirmation popup
  this.showConfirmBox = false;

  this.adminMaster.deletecurrency(this.deleteId).subscribe({

    next: (res:any) => {

      this.messageTitle = 'Success';
      this.messageText = 'Delete Currency list';

      // show success popup
      this.showMessageBox = true;
      this.cdr.detectChanges();
      // refresh list
      this.loadadminmaster();

    },

    error: (err:any) => {

      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';

      this.showMessageBox = true;
    }

  });

}


// openItem(id: number) {
//   this.router.navigate(['/admin/item-master/create', id]);

// }

createcurrency()
{
  this.router.navigate(['/admin/admin-control/currency']);
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

columnOrder: string[] = [
  'currencyCode',
  'currencyName',
  'symbol',
  'exchangeRate',
  'decimalPlaces',
  'isDefault',
  'status'
];

defaultVisibleFields: string[] = [
  'currencyCode',
  'currencyName',
  'symbol',
  'exchangeRate',
  'decimalPlaces',
  'isDefault',
  'status'
];

fieldTitleMap: Record<string, string> = {

  currencyCode: 'Currency Code',

  currencyName: 'Currency Name',

  symbol: 'Symbol',

  exchangeRate: 'Exchange Rate',

  decimalPlaces: 'Decimal Places',

  isDefault: 'Default Currency',

  status: 'Status'

};

getCurrencies() {

  this.adminMaster.getcurrencylist().subscribe(res => {

    this.titleItems = (res as any[]) || [];

      this.filteredItems = [...this.titleItems];

    if (!this.titleItems.length) {

      console.log("No data found");

      return;
    }

    const sampleItem = this.titleItems[0];

    const tempColumns = Object.keys(sampleItem)

      .filter(key => !this.removeFields.includes(key))

      .map(key => ({

        title:
          this.fieldTitleMap[key] ||
          this.formatTitle(key),

        field: key,

        visible:
          this.defaultVisibleFields.includes(key)

      }));

    tempColumns.sort((a, b) => {

      const aIndex =
        this.columnOrder.indexOf(a.field);

      const bIndex =
        this.columnOrder.indexOf(b.field);

      return (
        (aIndex === -1 ? 9999 : aIndex) -
        (bIndex === -1 ? 9999 : bIndex)
      );

    });

    this.columns = tempColumns;

    this.cdr.detectChanges();

  });

}

formatTitle(text: string): string {

  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

}


editcurrency(item: any) {
console.log(item)
  this.router.navigate([
    '/admin/admin-control/currency',
    item.id
  ]);

}



}
