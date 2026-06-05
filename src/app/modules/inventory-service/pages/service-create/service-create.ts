import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ServiceitemTab } from '../../components/serviceitem-tab/serviceitem-tab';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { ActivatedRoute, Router } from '@angular/router';
import {  LucideAngularModule  } from 'lucide-angular';
import { Funnel, ArrowBigLeft,ArrowBigRight,ChevronsRight,Trash,Search,SquareX,Save,ChevronLeft  } from 'lucide-angular';
import { DocumentsTab } from '../../components/documents-tab/documents-tab';
import { FormArray } from '@angular/forms'
import { SupplierTab } from '../../components/supplier-tab/supplier-tab';
import { Adminmaster } from '../../../../core/services/adminmaster';


@Component({
  selector: 'app-service-create',
  imports: [CommonModule,ReactiveFormsModule,DocumentsTab,ServiceitemTab,SupplierTab,LucideAngularModule, FormsModule],
  templateUrl: './service-create.html',
  styleUrl: './service-create.css',
})
export class ServiceCreate {

  @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';
@Input() deleteMessageBox = false;
@Input() showCommonpopup = false;

@Input() showMessagepopup = false;
@Input() showstockcancel = false;
  selectedId: any;

  @ViewChild(ServiceitemTab)
serviceItemTab!: ServiceitemTab;

    funnel = Funnel; 
  arrowbigleft = ArrowBigLeft;
  arrowbigright = ArrowBigRight;
  chevronsright = ChevronsRight;
  search = Search;
  squarex = SquareX;
  save = Save;
  chevronleft =ChevronLeft;

@Input() itemId!: number;

citems: any[] = [];
cfilteredItems: any[] = [];
filters = {
  name: '',
  description: '',
  status: '',
  search: ''
};

filtersitem = {
  itemCode: '',
  itemName: '',
  status: '',
  search: ''
};

constructor(private fb: FormBuilder,private adminMaster:Adminmaster, private masterService: Master,private router: Router, private cdr : ChangeDetectorRef, private route: ActivatedRoute) {}

 itemForm!: FormGroup;

  ngOnInit(): void {
       const id = this.route.snapshot.paramMap.get('id');
       this.selectedId = Number(id);

  const isEdit = !!this.selectedId;
    this.itemForm = this.fb.group({
  serviceitem: this.fb.group({}),
    documents: this.fb.group({
    docuitemCode: [''],
    docuitemName: [''],
    documentdetail: this.fb.array([])
  })
});
this.setitemlastid()
  }

  serviceitemlist()
  {
         this.router.navigate(['/admin/inventoryservice/service-item']); 
  }

  get serviceitemForm(): FormGroup {
  return this.itemForm.get('serviceitem') as FormGroup;
}

get documentsForm(): FormGroup {
  return this.itemForm.get('documents') as FormGroup;
}

get supplierdetailsForm(): FormGroup {
  return this.itemForm.get('supplierdetails') as FormGroup;
}

pageSize = 10;
currentPage = 1;

get totalPages(): number {
  return Math.ceil(this.cfilteredItems.length / this.pageSize);
}

get paginatedItems() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.cfilteredItems.slice(start, start + this.pageSize);
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


// get changestatusForm(): FormGroup {
//   return this.itemForm.get('changestatus') as FormGroup;
// }

// get reorderForm(): FormGroup {
//   return this.itemForm.get('reorder') as FormGroup;
// }

  //@Output() close = new EventEmitter<void>();  

   activeTab: string = 'serviceitem';

changeTab(tab: string) {
  console.log("TAB:", tab);
  

this.activeTab = tab;
}


selectedAction: string = '';


 id: number = 0;

openCommodityHandler(type: string) {
  this.selectedAction = type;
  if (type === "commodityGroup") this.id = 1;
  else if (type === "orderunit") this.id = 3;

  // ✅ OPEN POPUP IMMEDIATELY
  this.showCommonpopup = true;

  if ((type === "commodityGroup") || (type === "orderunit")) {
    this.masterService.getMastersById(this.id).subscribe(res => {
      this.citems = res as any[];
      this.cfilteredItems = [...this.citems];
      this.cdr.detectChanges();
    });

  } else {

       this.masterService.getItemList().subscribe(res => {
      this.citems = res as any[];
      this.cfilteredItems = [...this.citems];
      this.cdr.detectChanges(); // keep

    });
  }
}

closecommodity()
{
   //this.showCommodity = false;
   this.showCommonpopup = false;
}



newItemRow: any = {
  itemCode: '',
  itemDescription: '',
  itemName: ''
};

newRow: any = {
  name: '',
  description: '',
  masterId:'',
  masterName:'',
  status: true,
  groupId:''
 
};

isAdding = false;

startAdd() {
  this.isAdding = true;
}

showSuccess= false

showfalse = true;

selectedRowId: number | null = null;

MultiNewRow(type: string) {

  this.isAdding = false;

  const masterMap: any = {
    CommodityGroup: 1,
    meterGroup: 2,
    Orderunit: 3
  };

 
    if (type === "Item")
    {

    this.masterService.getItempost(this.newItemRow).subscribe({
      
    next: (res: any) => {

      const newItem = res?.data ?? res;
        
      this.citems.unshift(newItem);   // ✅ single insert

        this.applyFiltersitem();   

        this.cdr.detectChanges();
        this.showSuccess= true;

           // ✅ refresh view properly
      this.currentPage = 1;

      this.selectedRowId = newItem.id || newItem.itemCode;

      this.newItemRow = {
         itemCode: '',
         itemDescription: '',
         itemName:''
      };
      this.isAdding = false;

      setTimeout(() => {
        this.showCommonpopup = false;
      }, 300);
    },

    error: (err) => {

      this.showfalse= true;
      //this.showError('Something went wrong while saving');
    }
  });
}else{
    if (!this.newRow.name) return;

   this.newRow.masterName = type;
  this.newRow.masterId = masterMap[type] ?? 0;
  this.newRow.groupId = 0;

  this.masterService.createMaster(this.newRow).subscribe({
    next: (res: any) => {

      const newItem = res?.data ?? res;
        
      this.citems.unshift(newItem);   // ✅ single insert

        this.applyFilters();   
        this.cdr.detectChanges();

        this.showSuccess= true;

           // ✅ refresh view properly
      this.currentPage = 1;

      this.selectedRowId = newItem.id || newItem.masterId;

      this.newRow = {
        masterId: 0,
        masterName: '',
        name: '',
        description: '',
        status: true,
        groupId: 0
      };

      this.isAdding = false;

      setTimeout(() => {
        this.showCommonpopup = false;
      }, 300);
    },

    error: (err) => {

      this.showfalse= true;
      //this.showError('Something went wrong while saving');
    }
  });

}
}


 saveNewRow() {
    if (!this.newRow.name) return ;

    const newRow = this.newRow.value;
    console.log(this.newRow)

    this.masterService.createMaster(this.newRow).subscribe({
      next: (res: any) => {
        // Add to top of local array
        this.citems.unshift({ ...res });
        this.newRow = { Master: 1, MasterName : 'commodityGroup', Name: '', Description: '', Status: 'Active' };
        this.isAdding = false;
        console.log('Row saved:', res);
      },
      error: (err) => {
        console.error('Error saving row:', err);
        //alert('Failed to save row. Check backend/API.');
      },
    });
  }



cancelAdd() {
  this.isAdding = false;
}


showSearchRow = false;


toggleSearch(type:string) {
  this.showSearchRow = !this.showSearchRow;

 if (!this.showSearchRow) {


    if(type == "Item")
    {
      this.filtersitem = {
       itemCode: '',
       itemName: '',
        status: '',
        search:''
    };
        this.applySearchsitem();
    }else{
      this.filters = {
       name: '',
      description: '',
      status: '',
      search:''
    };

      this.applySearchs();
    }
  }
}

codeitems: any[] = [];

codefilters = {
  name: '',
  description: '',
  commodity: ''
};

codefilteredItems: any[] = [];

applySearchs(){

   const search = (this.filters.search || '').trim().toLowerCase();

  if (!search) {
    this.codefilteredItems = [...this.codeitems];
    this.currentPage = 1;
    return;
  }

   this.codefilteredItems = this.codeitems.filter(item =>{
    const name = (item.item || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();

    return name.includes(search) || desc.includes(search);

   })
    this.codecurrentPage = 1; // reset page
}

applySearchsitem() {
  const search =
    (this.filtersitem.search || '')
    .trim()
    .toLowerCase();
  if (!search) {

    this.cfilteredItems = [...this.citems];

    this.currentPage = 1;

    return;
  }

  this.cfilteredItems = this.citems.filter((item: any) => {

    const itemCode =
      (item.itemCode || '')
      .toString()
      .toLowerCase();

    const itemName =
      (item.itemName || '')
      .toString()
      .toLowerCase();

    return (
      itemCode.includes(search) ||
      itemName.includes(search)
    );

  });

  this.currentPage = 1;
}

showFilterRow = false;


toggleFilter(type:string) {
  this.showFilterRow = !this.showFilterRow;

  if (!this.showFilterRow) {
    this.filters = {
      name: '',
      description: '',
      status: '',
      search:''
    };
   
    if(type == 'Item')
    {
          this.applyFiltersitem();
    }else{
          this.applyFilters();
    }
  }
}

toggleFilteritem() {
  this.showFilterRow = !this.showFilterRow;

  if (!this.showFilterRow) {
    this.filters = {
      name: '',
      description: '',
      status: '',
      search:''
    };
    this.applyFilters();
  }
}


selectedRow: any = null;

applyFilters() {
  this.cfilteredItems = this.citems.filter(item =>
    item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
    item.description.toLowerCase().includes(this.filters.description.toLowerCase())
  );

  this.currentPage = 1; // reset page
}

allItems: any[] = [];
applyFiltersitem() {

  this.cfilteredItems = this.citems.filter(item =>
    item.itemCode.toLowerCase().includes(this.filtersitem.itemCode.toLowerCase()) &&
    item.itemName.toLowerCase().includes(this.filtersitem.itemName.toLowerCase())
  );

  this.currentPage = 1; // reset page
}

codepageSize = 5;
codecurrentPage = 1;

get codetotalPages(): number {
  return Math.ceil(this.codefilteredItems.length / this.codepageSize);
}

get codepaginatedItems() {
  const start = (this.codecurrentPage - 1) * this.codepageSize;
  return this.codefilteredItems.slice(start, start + this.codepageSize);
}

codenextPage() {
  if (this.codecurrentPage < this.codetotalPages) {
    this.codecurrentPage++;
  }
}

codeprevPage() {
  if (this.codecurrentPage > 1) {
    this.codecurrentPage--;
  }
}

codenewRow: any = {
  name: '',
  description: '',
  status: ''
};

codeisAdding = false;

codestartAdd() {
  this.codeisAdding = true;
}


selectItem(item: any) {
  this.selectedRowId = item.id;
  //localStorage.setItem("groupid", item.id);
  if(item.masterId == 1)
  {
  this.itemForm.get('serviceitem')?.patchValue({
    commodityGroup: item.name,
    commodityCode: item.description,
  });
    this.serviceItemTab.loadCommodityCodes(item.id);

 } else if(item.masterId == 6)
 {
   this.itemForm.get('serviceitem')?.patchValue({
    commodityCode: item.name,
    commodityCodeDesc: item.description
    
  });
  localStorage.removeItem("groupid");
 }else if(item.masterId == 3){
    console.log(item)
  this.itemForm.get('serviceitem')?.patchValue({
    //commodityCode: item.Id,
    orderunit: item.name,
    issueunit: item.description
  });
 }
  this.showCommonpopup = false;
}


servicelastId:any = '';
servicestatus:any ='';

setitemlastid() {
    const routeId = this.route.snapshot.paramMap.get('id');
    const urlId = routeId ? Number(routeId) : null;

    const isCreateMode = !urlId || isNaN(urlId);
 if (isCreateMode) {
  this.adminMaster.getitemlastId().subscribe((res: any) => {
      const lastId = Number(res?.lastId ?? 0);
  
      const finalId = lastId + 1;
      this.servicelastId = `ITEM-${String(finalId).padStart(5, '0')}`;    

  });
  this.cdr.detectChanges();
}else{
    this.adminMaster.getServiceItemById(this.selectedId).subscribe((res: any) => {
       this.servicelastId = res.itemSet,
       this.servicestatus = res.status
    })
    this.cdr.detectChanges();
} 
}


buildPayload() {
  const formValue = this.itemForm.value;

  switch (this.activeTab) {

    case 'serviceitem':
      const g = this.serviceitemForm;

      return {
        Id: this.selectedId || 0, // ✅ dynamic
        ServiceItemCode: g.get('serviceitemCode')?.value || '',
        ServiceName: g.get('ServiceName')?.value || '',
        ServiceSet: g.get('ServiceSet')?.value || '',
        Status: g.get('status')?.value || '',
        CommodityGroup: g.get('commodityGroup')?.value || '',
        CommodityCode: g.get('commodityCode')?.value || '',
        ReceiptTolerance: g.get('receiptTolerance')?.value ? Number(g.get('receiptTolerance')?.value) : null,
        OrderUnit: g.get('orderUnit')?.value || '',
        IssueUnit: g.get('issueUnit')?.value || '',
        InspectOnReceipt: !!g.get('inspectOnReceipt')?.value,
        TaxExempt: !!g.get('taxExempt')?.value,
        Taxcode: !!g.get('taxcode')?.value,
        CostCenter: !!g.get('costcenter')?.value,
        MinimumServiceCost: g.get('minimumServiceCost')?.value ? Number(g.get('minimumServiceCost')?.value) : null,
        MaximumServiceCost: g.get('maximumServiceCost')?.value ? Number(g.get('maximumServiceCost')?.value) : null,
        LeadTimeDays: g.get('leadTimeDays')?.value ? Number(g.get('leadTimeDays')?.value) : null,
        ActiveForPurchase: g.get('ActiveForPurchase')?.value || '',
        activeForWorkOrder: g.get('activeForWorkOrder')?.value || '',
        Prorate: g.get('prorate')?.value || '',
        InspectionRequired: g.get('inspectionRequired')?.value || '',
      };

    case 'supplier':

           const supplierdetail = this.supplierdetailsForm.get('supplierdetail')?.value || [];
           const lastId = this.selectedId || Number(localStorage.getItem('lastItemId'));
              return this.selectedId;


      case 'documents': 

        const documentArray = this.documentsForm?.get('documentdetail') as FormArray;
        const ldocId = this.selectedId || Number(localStorage.getItem('lastItemId'));
        return this.selectedId
      

    default:
      return null;
  }
}



submitItem() {

      const isEdit = !!this.selectedId;
      let currentGroup: FormGroup | null = null;

      // ✅ Validate current tab
      if (this.activeTab === 'serviceitem') {
        currentGroup = this.serviceitemForm;
      } else if (this.activeTab === 'supplier') {
        currentGroup = this.supplierdetailsForm;
      }else{
        currentGroup = this.documentsForm;
      }

    
          const payload = this.buildPayload();
          console.log(payload)
          if (!payload) return;

          // ✅ Create FormData here (STEP 4 LOCATION)
        const formData = new FormData();

        // append normal fields
        Object.keys(payload).forEach(key => {
          const value = (payload as any)[key];  // ✅ FIX

          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });


        let apiCall;

        if (this.activeTab === 'serviceitem') {
          apiCall = isEdit
            ? this.masterService.updateItem(this.selectedId, payload)
            : this.masterService.saveTab(payload);
        } else if (this.activeTab === 'supplier') {
          apiCall = this.masterService.storeroomTab(this.selectedId, true);
        }else if (this.activeTab === 'documents') {
          apiCall = this.masterService.documentsTab(this.selectedId, true);
        }

        if (!apiCall) {
          console.error('No API call selected');
          return;
        }

          apiCall.subscribe({
            next: (res:any) => {

               console.log('SUCCESS RESPONSE:', res);
              
              //console.log('showMessageBox:', this.showMessageBox);
              this.showMessageBox = res.success;

              // ✅ Save ID only for new item
              if (!isEdit && this.activeTab === 'general') {
                const lastId = res.itemId;
                this.selectedId = lastId; // 🔥 important
                localStorage.setItem('lastItemId', lastId.toString());
              }
             
              this.messageTitle = isEdit ? 'Updated' : 'Saved';
              this.messageText = res.message;  
              this.cdr.detectChanges();

            },

            error: (err:any) => {
              console.log('ERROR:', err.error);
              this.messageTitle = 'Error';
              this.messageText = err.error?.message || 'Something went wrong';
              this.showMessageBox = true;
            }
          });

        // setTimeout(() => {
        //   this.showMessageBox = false;
        // }, 2000);
}

closePopup()
{
    this.showstockcancel = false;
}

deleteId: number | null = null;

deleteItem(id: number) {

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this vendor?';
  this.showMessageBox = true;

   this.deleteId = id;

}


confirmSuccess(id:number)
{
  this.showMessageBox = false;
    this.router.navigate(['/admin/item-master'])
}

confirmDelete()
{

    if (this.deleteId == null) return;
  this.showMessageBox = false;


    this.masterService.deleteItem(this.deleteId).subscribe({
    next: (res) => {
      this.messageTitle = 'Success';
      this.messageText = res.message;
      this.showMessageBox = true;
    },
    error: (err) => {
      this.messageTitle = 'Error';
      this.messageText = err.error?.message || 'Delete failed';
      this.showMessageBox = true;
    }
  });
  this.showMessageBox = false;
  this.router.navigate(['/admin/item-master'])
}



}