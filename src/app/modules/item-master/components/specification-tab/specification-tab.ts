import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule,
  Search,ArrowBigLeft,ArrowBigRight,ArrowDownNarrowWide,ArrowUpNarrowWide,Funnel
} from 'lucide-angular';
import { Master } from '../../../../core/services/master';
import { ItemCreate } from '../../pages/item-create/item-create';
import { MessageBox } from '../../../../shared/message-box/message-box';

interface specific {
       attribute: string;
      description: string,
      specificationvalue: string,
      uom: number,
      tablevalue: string
}

@Component({
  selector: 'app-specification-tab',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule,LucideAngularModule, MessageBox, FormsModule],
  templateUrl: './specification-tab.html',
   styleUrls: ['./specification-tab.css'],
})
export class SpecificationTab{

  @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';
//@Input() showCommonpopup = false;
   
  @Input() form!: FormGroup;

  arrowbigleft = ArrowBigLeft;
  arrowbigright = ArrowBigRight; 

    sortColumn: string = '';
      movedown=ArrowDownNarrowWide;
  moveup=ArrowUpNarrowWide;
  funnel=Funnel;

  id:number = 0
citems: any[] = [];
classificationList: any[] = [];

sortDirection: 'asc' | 'desc' = 'asc';

   private _itemId: any;

  @Input() set itemId(value: any) {

  this._itemId = value;

}

  //@Output() specificationChange = new EventEmitter<any>();

constructor(private fb: FormBuilder, private MasterService: Master,private ItemCreate: ItemCreate,private chr: ChangeDetectorRef) {}

ngOnInit(): void {

  if (!this.form) {
    this.form = this.fb.group({});
  }

if(this._itemId)
{
  this.loadMasters(this._itemId)
}

  // Add all necessary controls

  this.form.addControl('spccode', this.fb.control('',Validators.required)); // ← must exist
  this.form.addControl('spcitem', this.fb.control('',Validators.required)); // ← must exist

  if (!this.form.contains('classification')) {
    this.form.addControl('classification', this.fb.control(''));
  }

  // add any other controls
  if (!this.form.contains('classdescription')) {
    this.form.addControl('classdescription', this.fb.control(''));
  }
  this.form.addControl('specifications', this.fb.array([]));

  // Patch saved data
  const savedData = localStorage.getItem('itemBasic');
  if (savedData) {
    const parsed = JSON.parse(savedData);
    this.form.patchValue({
      spccode: parsed.itemCode,
      spcitem: parsed.itemName
    });
  }

      this.openitemlistgroup();

}

  expandedIndex: number | null = null;

  search = Search;
  //chevronsright = ChevronsRight;


  showStoreroom = false;
  showDetails = false;


    // Getter for vendors FormArray
    get specifications(): FormArray {
      return this.form.get('specifications') as FormArray;
    }

    createAssamblyGroup(specifications?: specific): FormGroup {
      return this.fb.group({
      attribute: [specifications?.attribute || ''],
      description: [specifications?.description || ''],
      specificationvalue: [specifications?.specificationvalue || ''],     
      uom:[specifications?.uom || ''],
      });
    }
    
      // Add vendor row
      addSpecification(specific?: specific) {
        this.specifications.push(this.createAssamblyGroup(specific));
        this.expandedIndex = this.specifications.length - 1; // auto-open new row
      }
    
      // Toggle expanded form
      toggleDetails(index: number) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      }
    
      // Save vendor
      saveSpecification(index: number) {
        const assembledetail = this.specifications.at(index).value;

         this.showMessageBox = true
         this.messageTitle = 'Save';
        this.messageText = "Saved Specification"; 

        //this.expandedIndex = index;
        this.expandedIndex = -1;
      }
    
      // Delete vendor
      // removeSpecification(index: number) {
      //   if (confirm('Are you sure you want to delete this vendor?')) {
      //     this.specifications.removeAt(index);
      //     if (this.expandedIndex === index) {
      //       this.expandedIndex = null;
      //     } else if (this.expandedIndex && this.expandedIndex > index) {
      //       this.expandedIndex--;
      //     }
      //   }
      // }

      deleteIndex: number | null = null;

removeSpecification(index: number) {

  this.deleteIndex = index;

  this.messageTitle = 'Delete Confirmation';
  this.messageText = 'Are you sure you want to delete this specification?';
  this.showMessageBox = true;
}

confirmDeleteSpecification() {

  if (this.deleteIndex !== null) {

    this.specifications.removeAt(this.deleteIndex);

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

              filters = {
          name: '',
          description: '',
          search : ''
        };

        selectedRow: any = null;
        pageSize = 10;
        currentPage = 1;
        //newRow: any = { al_item: '', al_description: '', al_commodityGroup: '', al_commodityCode:'',al_rotating:'' };
        isAdding = false;
        isAddingcondition = false;
        selectedAction: string = '';
        showFilterRow = false;

        showCommonpopup = false;
        showCommonpopup1 = false;


        openClassification() {
          // this.loading = true;
        this.showCommonpopup = true;

        
  this.id = 4;


  // ✅ OPEN POPUP IMMEDIATELY
  this.showCommonpopup = true;

    
    this.MasterService.getMastersById(this.id).subscribe(res => {
      console.log(res)
      this.citems = res as any[];
      this.classificationList = [...this.citems];

      this.chr.detectChanges(); // keep

    });

        }

        closecommodity()
        {
          this.showCommonpopup = false;
        }

        selectItem(item: any) {

          this.form.patchValue({
            classification: item.name,
            classdescription: item.description
          });
                this.showCommonpopup = false;

        }

        openCommodityHandler(type: string) {
  this.ItemCreate.openCommodityHandler(type)
}

        // classificationList = [
        //   { code: 'ELECTRICAL', desc: 'Electrical Components' },
        //   { code: 'MECHANICAL', desc: 'Mechanical Parts' },
        //   { code: 'INSTRUMENTATION', desc: 'Measurement Instruments' },
        //   { code: 'HVAC', desc: 'Heating Ventilation AC' },
        //   { code: 'PLUMBING', desc: 'Water Systems' },
        //   { code: 'SAFETY', desc: 'Safety Equipment' },
        //   { code: 'IT_EQUIPMENT', desc: 'IT Devices' },
        //   { code: 'TOOLS', desc: 'Hand Tools' },
        //   { code: 'VEHICLES', desc: 'Transport Vehicles' },
        //   { code: 'BUILDING', desc: 'Building Materials' },
        //   { code: 'FURNITURE', desc: 'Office Furniture' },
        //   { code: 'CONSUMABLES', desc: 'Daily Use Items' },
        //   { code: 'ROTATING_EQUIPMENT', desc: 'Rotating Machines' },
        //   { code: 'NON_ROTATING_EQUIPMENT', desc: 'Static Equipment' },
        //   { code: 'CHEMICALS', desc: 'Chemical Materials' },
        //   { code: 'SPARE_PARTS', desc: 'Machine Spare Parts' },
        //   { code: 'PIPELINE', desc: 'Pipeline Components' },
        //   { code: 'PUMPS', desc: 'Pump Systems' },
        //   { code: 'VALVES', desc: 'Valve Types' },
        //   { code: 'GENERATOR', desc: 'Power Generators' }
        // ];

        // toggleFilter() {
        //   this.showFilterRow = !this.showFilterRow;
        //   if (!this.showFilterRow) {
        //     this.filters = { code: '', desc: '' };
        //     //this.applyFilters();
        //   }
        // }
        //totalPages = 20;

        get totalPages(): number {
  return Math.ceil(this.specifications.controls.length / this.pageSize);
}
        nextPage() {
          if (this.currentPage < this.totalPages) this.currentPage++;
        }

        prevPage() {
          if (this.currentPage > 1) this.currentPage--;
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
              spccode: res.itemCode,
              spcitem: res.name
            });
          });
        }


        loadMasters(value: number) {
          this.MasterService.getspecificationItem(value).subscribe((res: any) => {

              this.form.patchValue({
              classification: res.classification,
              classdescription: res.classDescription
              })

              this.allSpecifications=res;

              const data = Array.isArray(res.details) ? res.details : [];

              this.specifications.clear();

              data.forEach((item: any) => {
                this.specifications.push(this.createAssamblyGroup(item));
              });

               this.allSpecifications = [...this.specifications.controls];

              this.chr.detectChanges();
          });
        }


        confirmDelete()
        {
          this.showMessageBox = false;
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
     spcitem: group.itemName,
       spccode: group.itemCode
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

  get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
}



attribute = '';
description = '';
value = '';
uom = '';

//allvendorsdetail: any[] = [];

// applyFilters() {

//   const filtered = this.specifications.controls.filter((row: any) => {

//     const attribute = (row.get('attribute')?.value || '').toLowerCase();
//     const description = (row.get('description')?.value || '').toLowerCase();
//     const numericvalue = (row.get('numericvalue')?.value || '').toLowerCase();
//     const uom = (row.get('uom')?.value || '').toLowerCase();

//     return (
//       attribute.includes(this.attribute.toLowerCase()) &&
//       description.includes(this.description.toLowerCase()) &&
//       numericvalue.includes(this.value.toLowerCase()) &&
//       uom.includes(this.uom.toLowerCase())
//     );
//   });

//   this.specifications.clear();
//   filtered.forEach((item: any) => this.specifications.push(item));

//   this.currentPage = 1;
// }

allSpecifications: any[] = [];

applyFilters() {

  const filtered = this.allSpecifications.filter((row: any) => {

    const attribute =
      String(row.get('attribute')?.value || '')
        .toLowerCase();

    const description =
      String(row.get('description')?.value || '')
        .toLowerCase();

    const specificationvalue =
      String(row.get('specificationvalue')?.value || '')
        .toLowerCase();

    const uom =
      String(row.get('uom')?.value || '')
        .toLowerCase();

    console.log({
      attribute,
      description,
      specificationvalue,
      uom
    });

    const match =
      attribute.includes(this.attribute.toLowerCase()) &&
      description.includes(this.description.toLowerCase()) &&
      specificationvalue.includes(this.value.toLowerCase()) &&
      uom.includes(this.uom.toLowerCase());

    console.log('MATCH:', match);

    return match;
  });

  this.specifications.clear();

  filtered.forEach((item: any) => {
    this.specifications.push(item);
  });

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

  const sorted = [...this.specifications.controls].sort((a: any, b: any) => {

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

  this.specifications.clear();
  sorted.forEach((c: any) => this.specifications.push(c));
}


allItems: any[] = [];
applyFiltersitem() {

  this.classificationList = this.citems.filter(item =>
    item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
    item.description.toLowerCase().includes(this.filters.description.toLowerCase())
  );

  this.currentPage = 1; // reset page
}
showSearchRow = false;
startAdd() {
  this.isAdding = true;
}

cancelAdd() {
  this.isAdding = false;
}

newRow: any = {
  name: '',
  description: '',
  masterId:'',
  masterName:'',
   status: true,
  groupId:''
 
};

MultiNewRow(type: string) {

  this.isAdding = false;

  const masterMap: any = {
    classification: 4,
  };

 

    if (!this.newRow.name) return;

   this.newRow.masterName = type;
  this.newRow.masterId = masterMap[type] ?? 0;
  this.newRow.groupId = 0;

  this.MasterService.createMaster(this.newRow).subscribe({
    next: (res: any) => {

      const newItem = res?.data ?? res;
        
      this.citems.unshift(newItem);   // ✅ single insert

        this.applyFilters();   
        this.chr.detectChanges();

           // ✅ refresh view properly
      this.currentPage = 1;

      //this.selectedRowId = newItem.id || newItem.masterId;

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

      //this.showError('Something went wrong while saving');
    }
  });

}

toggleFilter(type:string) {

  this.showFilterRow = !this.showFilterRow;


    this.filters = {
      name: '',
      description: '',
      search : ''
    };
   
  
          this.applyFiltersitem();
}

toggleSearch(type:string) {
  this.showSearchRow = !this.showSearchRow;



      this.filters = {
       name: '',
      description: '',
      search:'',
    };

      this.applySearchs();
    
}

applySearchs(){

   const search = (this.filters.search || '').trim().toLowerCase();

  if (!search) {
    this.classificationList = [...this.citems];
    this.currentPage = 1;
    return;
  }

   this.classificationList = this.citems.filter(item =>{
    const name = (item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();

    return name.includes(search) || desc.includes(search);

   })
    this.currentPage = 1; // reset page
}


}

 