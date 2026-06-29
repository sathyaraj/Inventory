import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { LucideAngularModule } from 'lucide-angular';
import { Save, RotateCcw, Search, ChevronsRight, ArrowDownNarrowWide,ArrowUpNarrowWide } from 'lucide-angular';
import { CommoditygroupFields } from '../../configs/commoditygroup-fields/commoditygroup-fields';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsavedChangesService } from '../../../../core/services/unsaved-changed';

interface commoditydetails {
  code: string;
  description: string;
}

@Component({
  selector: 'app-commoditygroup-tap',
  imports: [CommonModule,ReactiveFormsModule,DynamicForm,MessageBox,LucideAngularModule],
  templateUrl: './commoditygroup-tap.html',
  styleUrl: './commoditygroup-tap.css',
})
export class CommoditygroupTap {

  Save = Save;
  RotateCcw = RotateCcw;

  search = Search;
  chevronsright = ChevronsRight;
  movedown = ArrowDownNarrowWide;
  moveup = ArrowUpNarrowWide;


@Input() form!: FormGroup;

  editId = 0;

  showMessageBox = false;
  messageTitle = '';
  messageText = '';

  fields = CommoditygroupFields;

    expandedIndex: number | null = null;
 @Input() commodityCodes: any[] = [];

 editingIndex: number | null = null;
 backupRow: any = null;

  currentPage = 1;
  pageSize = 10;


  sortColumn: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  selectedId = 0;

  constructor(private fb:FormBuilder,private adminMaster: Adminmaster,private router: Router, private route:ActivatedRoute,private cdr: ChangeDetectorRef,private unsaveService: UnsavedChangesService ){}

  ngOnInit() {

    const group: any = {};

    CommoditygroupFields.forEach(field=>{
       group[field.controlName] = [
        '',
        field.validators || []
      ];

    })

    this.form = this.fb.group(group);

     // FormArray Add
  this.form.addControl('commoditydetails',this.fb.array([]));

  this.route.params.subscribe(params => {

    if(params['id']) {
       
      this.selectedId = +params['id'];
      this.loadCommodityGroup(this.selectedId);
    }

  });

 this.form.valueChanges.subscribe(() => {
  console.log('Form Changed');
    this.unsaveService.setDirty(true);
  });

  }

  confirmadd() {

     this.showMessageBox = false;

      setTimeout(() => {

    this.router.navigate([
      '/admin/admin-control/commoditygrouplist'
    ]);

  }, 300);

  }


save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.messageTitle = 'Validation';

      this.messageText = 'Please fill all required fields';

      this.showMessageBox = true;

      return;
    }

    const payload = {

      id: this.editId || 0,

      commoditygroup:this.form.get('commoditygroup')?.value,

      description:this.form.get('description')?.value,

      commodityCodes:this.commoditydetails.value

    };

    this.adminMaster.saveCommodityGroup(payload).subscribe({

        next: (res: any) => {

           this.unsaveService.clear();

          this.messageTitle =
            this.editId > 0 ? 'Updated' : 'Saved';

          this.messageText = res.message;

          this.showMessageBox = true;

          if (this.editId === 0) {

            this.onReset();

          }

        },

        error: (err: any) => {

          this.messageTitle = 'Error';

          this.messageText =err?.error?.message || 'Something went wrong';

          this.showMessageBox = true;

        }

      });

  }

  onReset() {

    this.form.reset({
      status: 'Active'
    });

  }



  get commoditydetails(): FormArray {
    return this.form.get('commoditydetails') as FormArray;
  }
  

  createVendorGroup(commoditydetails?: any): FormGroup {
    return this.fb.group({
      id: [commoditydetails?.id || 0],
      code: [commoditydetails?.code || '', Validators.required],
      description: [commoditydetails?.description || ''],
    });
  }

 
  addVendor(commoditydetails?: commoditydetails) {

  this.commoditydetails.push(this.createVendorGroup(commoditydetails));

  const newIndex = this.commoditydetails.length - 1;
  // Open the newly added row
  this.expandedIndex = newIndex;

  // Move to the page where the new row exists
  this.currentPage = Math.floor(newIndex / this.pageSize) + 1;
}


  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }


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
  this.commoditydetails.removeAt(this.deleteIndex!);

  // this.masterService.vendordetaildelete(this.deleteId)
  //   .subscribe({
  //     next: (res: any) => {

  //       this.messageTitle = 'Success';
  //       this.messageText = res.message || 'Deleted successfully';

  //       this.showMessageBox = true;

  //       this.deleteId = null;
  //       this.deleteIndex = null;
  //       this.cdr.detectChanges()
  //     },

  //     error: (err: any) => {

  //       this.messageTitle = 'Error';
  //       this.messageText =
  //         err.error?.message || 'Delete failed';

  //       this.showMessageBox = true;

  //       this.deleteId = null;
  //       this.deleteIndex = null;
  //       this.cdr.detectChanges()
  //     }
  //   });
}



  get totalPages(): number {
    return Math.ceil(
      this.commoditydetails.length / this.pageSize
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

codeFilter = '';
descriptionFilter = '';

allcommoditydetails: any[] = [];

applyFilters() {

  const filtered = this.allcommoditydetails.filter((row: any) => {

    const code =String(row.code || '').toLowerCase();
    const description =String(row.description || '').toLowerCase();

    console.log('ROW VALUES:', {
      code,
      description,
    });

    const match =
      code.includes(this.codeFilter.toLowerCase()) &&
      description.includes(this.descriptionFilter.toLowerCase()) 

    console.log('MATCH RESULT:', match);

    return match;
  });

  console.log('FILTERED RESULT:', filtered);

  this.commoditydetails.clear();

  filtered.forEach((item: any) => {
    this.commoditydetails.push(this.createVendorGroup(item));
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

editVendor(event: any) {
  console.log('Edit:', event);
}

loadCommodityGroup(id: number) {

  this.adminMaster.getCommodityGroupById(id).subscribe((res: any) => {

    console.log(res);

     this.editId = res.id;

    this.form.patchValue({
      commoditygroup: res.commoditygroup,
      description: res.description,
      status: res.status
    });

    // Clear existing rows
    this.commoditydetails.clear();

    // Add API rows into FormArray
    (res.commodityCodes || []).forEach((item: any) => {
      this.commoditydetails.push(
        this.createVendorGroup(item)
      );
    });

  });

}
cancelVendor(index: number) {

  const row = this.commoditydetails.at(index);

  // New row remove
  if (row.get('id')?.value === 0) {
    this.commoditydetails.removeAt(index);
  }

  this.expandedIndex = null;
}
editRow(index: number) {

  this.editingIndex = index;

  // backup original data (for cancel)
  this.backupRow = { ...this.commoditydetails.at(index).value };

}


}
