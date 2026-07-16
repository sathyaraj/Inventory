import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule,Search,ChevronsRight,ArrowDownNarrowWide,ArrowUpNarrowWide } from 'lucide-angular';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { ItemCreate } from '../../../item-master/pages/item-create/item-create';
import { Master } from '../../../../core/services/master';
import { ServiceItem } from '../../pages/service-item/service-item';
import { Adminmaster } from '../../../../core/services/adminmaster';

interface documentdetail {
  name: string;
  documents: File | null; 
}

@Component({
  selector: 'app-documents-tab',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule,LucideAngularModule, MessageBox,FormsModule],
  templateUrl: './documents-tab.html',
  styleUrl: './documents-tab.css',
})
export class DocumentsTab {

  @Input() form!: FormGroup;
  @Input() showMessageBox = false;
  @Input() messageTitle = '';
  @Input() messageText = '';

  successTitle = '';
successMessage = '';
showSuccessBox = false;

  search = Search;
  chevronsright = ChevronsRight;
  sortColumn: string = '';
  movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;

  sortDirection: 'asc' | 'desc' = 'asc';

  private _itemId: any;

  @Input() set serviceitemId(value: any) {

  this._itemId = value;

  }
  expandedIndex: number | null = null;

    constructor(private fb: FormBuilder,private masterservice: Master,private cdr: ChangeDetectorRef, private adminMaster: Adminmaster) {}
     getFileName(path: string | null): string {
     if (!path) return '';
      return path.split(/[/\\]/).pop() || '';
    }

      ngOnInit(): void {  

 this.loadDocuments()
  if (this._itemId) {
    this.loadMasters(this._itemId);
  }
  

      this.openitemlistgroup();
      }


        get documentdetail(): FormArray {
    return this.form.get('documentdetail') as FormArray;
  }
  createDocumentGroup(documentdetail?: any): FormGroup {
  return this.fb.group({
    id: [documentdetail?.id || 0],                  
    itemId: [documentdetail?.itemId || 0],         
    name: [documentdetail?.name || '', Validators.required],
    document: [null],                    
    existingFile: [documentdetail?.existingFile || ''] 
  });
}

onFileChange(event: any, index: number) {
  const file = event.target.files[0];
   console.log(file);
  if (file) {
    this.documentdetail.at(index).patchValue({
      document: file,
      existingFile: null // ✅ hide old file
    });
  }
}

submit(index: number) {
  const formData = new FormData();
  formData.append('itemId', String(this._itemId));
  formData.append('Type', 'ServiceItem');
//formData.append('UserId', String(this.userId));

  const documents = this.documentdetail.value;

  documents.forEach((doc: any) => {
    formData.append('names', doc.name);
    if (doc.document) {
      formData.append('files', doc.document);
    }
  });

 this.masterservice.documentsdetails(formData).subscribe({
  next: (res) => {
    console.log('API Response:', res);
    console.log('Success:', res.success);

    if (res.success) {
      this.showSuccessBox = true;

      this.successTitle = 'Save';
      this.successMessage = 'Saved Document';

      this.cdr.detectChanges()
    }
  },
  error: (err) => {
    console.log('Error:', err);
  }
});

}

savedDocuments: any[] = [];

loadDocuments() {
  const itemId = this._itemId;
  if (!itemId) return;

  this.masterservice.getDocuments(itemId).subscribe({
    next: (res: any[]) => {
      console.log(res)

        this.documentdetail.clear();

        res.forEach(item => {
            this.documentdetail.push(this.fb.group({
              id: [item.id],
              name: [item.name],
              document: [null],
              existingFile: [item.documentPath || '']
            }));
        });
      this.cdr.detectChanges();       
    }
  });
}

addVendor(data?: documentdetail) {
  if (!data && this.documentdetail.length > 0) {
    const last = this.documentdetail.at(this.documentdetail.length - 1);
    if (!last.value.name) {
        this.messageTitle = 'Message';
        this.messageText = 'Please fill previous row first';
        this.showMessageBox = true;
      return;
    }
  }

  this.documentdetail.push(this.createDocumentGroup(data));
  this.expandedIndex = this.documentdetail.length - 1;
}

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  

  saveVendor(index: number) {
    const vendorData = this.documentdetail.at(index).value;

         this.showMessageBox = true
         this.messageTitle = 'Save';
         this.messageText = "Saved Document"; 

    this.expandedIndex = index; // keep form open
  }


  showConfirmBox = false;

deleteId: number | null = null;
deleteIndex: number | null = null;

deleteVendor(id: number, index: number) {

  this.deleteId = id;
  this.deleteIndex = index;

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this document?';

  this.showConfirmBox = true;

  this.cdr.detectChanges()

}

confirmDeleteVendor() {

  if (this.deleteId == null || this.deleteIndex == null) {
    return;
  }

  const id = this.deleteId;
  const index = this.deleteIndex;

  console.log(id+"++"+index)

  // Close confirmation popup
  this.showConfirmBox = false;
      this.documentdetail.removeAt(index);

  this.masterservice.documentDetailsdelete(id).subscribe({
    next: (res: any) => {


      // Success popup
      this.messageTitle = 'Success';
      this.messageText = res.message;

      this.showSuccessBox = true;

      this.deleteId = null;
      this.deleteIndex = null;
        this.cdr.detectChanges()

    },

    error: (err: any) => {

      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';

      this.showSuccessBox = true;
    }
  });
    this.cdr.detectChanges()

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
  console.log(id)
  this.adminMaster.getServiceItemById(id).subscribe((res: any) => {  
    this.form.patchValue({
      docuitemCode: res.serviceCode,
      docuitemName: res.serviceName
    });
  }); 
}

vallengh: number = 0;
loadMasters(value: number) {
  this.masterservice.getDocuments(value).subscribe({
    next: (res: any[]) => {
      this.vallengh = res.length;  // ✅ assign to class property
      this.cdr.detectChanges();
    }
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
     docuitemName: group.itemName,
       docuitemCode: group.itemCode
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
  return Math.ceil(this.documentdetail.controls.length / this.pageSize);
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

name = '';
document = '';

//allvendorsdetail: any[] = [];

applyFilters() {

  const filtered = this.documentdetail.controls.filter((row: any) => {

    const name = (row.get('name')?.value || '').toLowerCase();
    //const document = (row.get('document')?.value || '').toLowerCase();
    const document = String(row.get('document')?.value || '').toLowerCase()


    return (
      name.includes(this.name.toLowerCase()) &&
      document.includes(this.document.toLowerCase())
    );
  });

  this.documentdetail.clear();
  filtered.forEach((item: any) => this.documentdetail.push(item));

  this.currentPage = 1;
}

//filteredItems: any[] = [];


sortTable(field: string) {

  if (this.sortColumn === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = field;
    this.sortDirection = 'asc';
  }

  const sorted = [...this.documentdetail.controls].sort((a: any, b: any) => {

    const valA = a.get(field)?.value;
    const valB = b.get(field)?.value;

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

  this.documentdetail.clear();
  sorted.forEach((c: any) => this.documentdetail.push(c));
}

}
