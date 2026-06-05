import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormsModule } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { LucideAngularModule,
  Search,ArrowBigLeft,ArrowBigRight,ArrowDownNarrowWide,ArrowUpNarrowWide
} from 'lucide-angular';

interface Assmbly {
  item: string;
  description: string;
  quantity: string;
  remark: string;
}

@Component({
  selector: 'app-organization-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageBox,FormsModule,LucideAngularModule],
  templateUrl: './organization-tab.html',
  styleUrls: ['./organization-tab.css'],
})
export class OrganizationTab implements OnInit {
    @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';

  @Input() form!: FormGroup;
  expandedIndex: number | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

     private _itemId: any;

  @Input() set itemId(value: any) {

  this._itemId = value;

}

  constructor(private fb: FormBuilder, private MasterService : Master, private chr : ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.fb.group({});
    }

    if(this._itemId)
    {
      this.loadMasters(this._itemId)
    }

    // Top-level fields
    this.form.addControl('TopLevelItem', this.fb.control(''));
    this.form.addControl('TopLevelCode', this.fb.control(''));
    this.form.addControl('CurrentLevel', this.fb.control(''));
    this.form.addControl('CurrentLevelCode', this.fb.control(''));
    this.form.addControl('BelongsTo', this.fb.control(''));
    this.form.addControl('Remarks', this.fb.control(''));
    this.form.addControl('assemblydetails', this.fb.array([]));

  this.openitemlistgroup();
    
  }

  // Getter for vendors FormArray
  get assemblydetails(): FormArray {
    return this.form.get('assemblydetails') as FormArray;
  }

  // Create vendor FormGroup
  createAssamblyGroup(assemblydetails?: Assmbly): FormGroup {
    return this.fb.group({
      item: [assemblydetails?.item || ''],
      description: [assemblydetails?.description || ''],
      quantity: [assemblydetails?.quantity || ''],
      remark: [assemblydetails?.remark || ''],
    });
  }

  // Add vendor row
  addAssemblyDetail(assemblydetails?: Assmbly) {
      if (this.assemblydetails.length > 0) {
    const last = this.assemblydetails.at(this.assemblydetails.length - 1);
    if (!last.value.item || !last.value.description || !last.value.quantity || !last.value.remark) {
        this.messageTitle = 'Message';
      this.messageText = 'Please fill previous row first';
     this.showMessageBox = true;
      return;
    }
  }
    
    this.assemblydetails.push(this.createAssamblyGroup(assemblydetails));
    this.expandedIndex = this.assemblydetails.length - 1; // auto-open new row
  }

  // Toggle expanded form
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  saveAssemblyDetail(index: number) {
  const assembledetail = this.assemblydetails.at(index).value;

  this.messageTitle = 'Success';
  this.messageText =
    `Assembly Detail ${assembledetail.item || 'Item'} saved successfully`;

   this.expandedIndex = null;
   this.showMessageBox = true;
}

  
  deleteIndex: number | null = null;

removeAssemblyDetail(index: number) {

  this.deleteIndex = index;

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this assembly detail?';
  this.showMessageBox = true;
}

confirmDeleteAssembly() {

  if (this.deleteIndex !== null) {
    this.assemblydetails.removeAt(this.deleteIndex);
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
  this.MasterService.getItemById(id).subscribe((res: any) => {  
    console.log("API RESPONSE:", res);
    this.form.patchValue({
      TopLevelItem: res.itemCode,
      TopLevelCode: res.name
    });
  });
}

loadMasters(value: number) {
  this.MasterService.getorganizationItem(value).subscribe((response: any) => {
  const res = response.data;
  if (!res) {
    console.error("No data found");
    return;
  }
  this.form.patchValue({
    CurrentLevel: res.currentLevel,
    CurrentLevelCode: res.currentLevelCode,
    BelongsTo: res.belongsTo,
    Remarks: res.remarks
  });

  //this.assemblydetails.clear();

  // (res.details || []).forEach((x: any) => {
  //   this.addAssemblyDetail({
  //     item: x.item,
  //     description: x.description,
  //     quantity: x.quantity,
  //     remark: x.remark
  //   });
  // });

   const data = Array.isArray(res.details) ? res.details : [];

              this.assemblydetails.clear();

              data.forEach((item: any) => {
                this.assemblydetails.push(this.createAssamblyGroup(item));
              });
    this.chr.detectChanges(); 

  console.log("FORM VALUE:", this.assemblydetails.value);
});
}




showGroupDropdown = false;

filteredGroups: any[] = [];

selectedGroupName = '';

Itemlist: any[] = [];
openitemlistgroup() {
  this.MasterService.getItemList().subscribe(res => {
    this.Itemlist = res as any[] || [];
    this.filteredGroups = this.Itemlist;
    this.chr.detectChanges(); 
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
     TopLevelCode: group.itemName,
       TopLevelItem: group.itemCode
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

  pageSize = 5;
        currentPage = 1;

    get totalPages(): number {
  return Math.ceil(this.assemblydetails.controls.length / this.pageSize);
}
        nextPage() {
          if (this.currentPage < this.totalPages) this.currentPage++;
        }

        prevPage() {
          if (this.currentPage > 1) this.currentPage--;
        }

         get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
}


  item='';
  description= '';
  quantity= '';
  remarks='';


applyFilters() {

  const filtered = this.assemblydetails.controls.filter((row: any) => {

    const item = (row.item || '').toLowerCase();
    const description = (row.description || '').toLowerCase();
    const quantity = String(row.quantity || '').toLowerCase();
    const remarks = (row.remarks || '').toLowerCase();

    return (
      item.includes(this.item.toLowerCase()) &&
      description.includes(this.description.toLowerCase()) &&
      quantity.includes(this.quantity.toLowerCase()) &&
      remarks.includes(this.remarks.toLowerCase())
    );
  });

  this.assemblydetails.clear();

   this.assemblydetails.clear();
  filtered.forEach((item: any) => this.assemblydetails.push(item));

  this.currentPage = 1;

}



sortTable(column: string) {

  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.assemblydetails.controls.sort((a: any, b: any) => {

    const valA = a.get(column)?.value;
    const valB = b.get(column)?.value;

    if (valA == null) return -1;
    if (valB == null) return 1;

    const isNumber = !isNaN(valA) && !isNaN(valB);

    if (isNumber) {
      return this.sortDirection === 'asc'
        ? valA - valB
        : valB - valA;
    }

    return this.sortDirection === 'asc'
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });
}

}