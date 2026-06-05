import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import { Settings,Trash,SquarePen,Info,MoveDown,MoveUp,ArrowDownNarrowWide,ArrowUpNarrowWide  } from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';

@Component({
  selector: 'app-taxlist',
  imports: [CommonModule,LucideAngularModule,MessageBox],
  templateUrl: './taxlist.html',
  styleUrl: './taxlist.css',
})
export class Taxlist {
      sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';


   trash = Trash;
  pencil = SquarePen ;
  info=Info;
  Settings = Settings;
  chevronsupdown = MoveUp;
  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

showMessageBox = false;
messageTitle = '';
messageText = '';

showConfirmBox = false;


constructor(private fb: FormBuilder ,private router: Router, private adminMaster:Adminmaster, private cdr:ChangeDetectorRef){}

ngOnInit(){

    this.getTaxes()
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


deleteId: number | null = null;
deleteItem(id: number) {
   this.deleteId = id;
   this.messageTitle = 'Success';
   this.messageText = 'Are you sure you want to delete this item?';
   this.showConfirmBox  = true;
}

confirmDelete() {

  if (this.deleteId === null)
    return;

  // CLOSE CONFIRM POPUP
  this.showConfirmBox = false;

  this.adminMaster
    .deleteItem(this.deleteId)
    .subscribe(res => {
          this.showMessageBox = true;


        this.messageTitle = 'Deleted';

        this.messageText = 'Delete tax list'

        setTimeout(() => {


          this.getTaxes();


        }, 200);

      });
                this.cdr.detectChanges();

}


// openItem(id: number) {
//   this.router.navigate(['/admin/item-master/create', id]);

// }

createtax()
{
  this.router.navigate(['/admin/admin-control/tax']);
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
  'taxName',
  'taxCode',
  'taxType',
  'taxPercentage',
  'effectiveDate',
  'status'
];

defaultVisibleFields: string[] = [
  'taxName',
  'taxCode',
  'taxType',
  'taxPercentage',
  'effectiveDate',
  'status'
];

fieldTitleMap: Record<string, string> = {

  taxName: 'Tax Name',

  taxCode: 'Tax Code',

  taxType: 'Tax Type',

  taxPercentage: 'Tax Percentage',

  decimalPlaces: 'Decimal Places',

  effectiveDate: 'Effective Date',

  status: 'Status'

};

getTaxes() {

  this.adminMaster.gettaxlist().subscribe(res => {
    
    this.titleItems = (res as any[]) || [];

      this.filteredItems = [...this.titleItems];

    if(!this.titleItems.length) {

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

edittax(item: any) {
console.log(item)
  this.router.navigate(['/admin/admin-control/tax',item.id]);

}

}
