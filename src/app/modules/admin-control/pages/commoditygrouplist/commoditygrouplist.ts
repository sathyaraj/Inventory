import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { LucideAngularModule} from 'lucide-angular';
import { Trash,SquarePen,Info,Settings,MoveUp,ArrowDownNarrowWide,ArrowUpNarrowWide, ChevronDown,ChevronRight,ChevronUp} from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Adminmaster } from '../../../../core/services/adminmaster';

@Component({
  selector: 'app-commoditygrouplist',
  imports: [CommonModule,LucideAngularModule, MessageBox],
  templateUrl: './commoditygrouplist.html',
  styleUrl: './commoditygrouplist.css',
})

export class Commoditygrouplist {

sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';

trash = Trash;
pencil = SquarePen ;
info=Info;
Settings = Settings;
chevronsupdown = MoveUp;
movedown=ArrowDownNarrowWide;
moveup=ArrowUpNarrowWide;
ChevronDown = ChevronDown;
ChevronRight = ChevronRight;
ChevronUp  = ChevronUp;
showMessageBox = false;
messageTitle = '';
messageText = '';

showConfirmBox = false;

filteredItems: any[] = [];

constructor(private fb:FormBuilder, private router: Router, private adminMaster: Adminmaster, private chr :ChangeDetectorRef ){}


ngOnInit(){

    //this.getTaxes()
    this.getCommodityGroups();
}

toggleExpand(item: any) {
  item.expanded = !item.expanded;
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
    .deletecommoditygroup(this.deleteId)
    .subscribe(res => {
          this.showMessageBox = true;


        this.messageTitle = 'Deleted';

        this.messageText = 'Delete tax list'

        setTimeout(() => {


          //this.getTaxes();


        }, 200);

      });
                this.chr.detectChanges();

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

createcommodity()
{
  this.router.navigate(['/admin/admin-control/commoditygroup']);
}

titleItems: any[] = [];


columns: any[] = [];

removeFields = [
  'commodityCodes'
];

defaultVisibleFields = [
  'commoditygroup',
  'description',
  'status'
];

columnOrder = [
  'commoditygroup',
  'description',
  'status'
];

fieldTitleMap: any = {
  commoditygroup: 'Commodity Group',
  description: 'Description',
  status: 'Status'
};

getCommodityGroups() {

  this.adminMaster
      .getCommodityGroups()
      .subscribe(res => {

        this.titleItems = (res as any[]).map(x => ({
          ...x,
          expanded: false
        }));

        this.filteredItems = [...this.titleItems];

        if (!this.titleItems.length)
          return;

        const sampleItem = this.titleItems[0];

        const tempColumns = Object.keys(sampleItem)

          .filter(key =>
            !this.removeFields.includes(key) &&
            key !== 'expanded'
          )

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

        this.chr.detectChanges();

      });

}

formatTitle(text: string): string {

  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

}

editCommodity(item: any) {

  this.router.navigate([
    '/admin/admin-control/commoditygroup',
    item.id
  ]);

}


}
