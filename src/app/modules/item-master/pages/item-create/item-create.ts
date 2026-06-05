import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, input, Input, Output, ViewChild } from '@angular/core';
import { VendorTab } from '../../components/vendor-tab/vendor-tab';
import { GeneralTab } from '../../components/general-tab/general-tab';
import { SpecificationTab } from '../../components/specification-tab/specification-tab';
import { OrganizationTab } from '../../components/organization-tab/organization-tab';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import {  LucideAngularModule  } from 'lucide-angular';
import { Funnel, ArrowBigLeft,ArrowBigRight,ChevronsRight,Trash,Search,SquareX,Save,ChevronLeft  } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VendoritemTab } from '../../components/vendoritem-tab/vendoritem-tab';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { AssemblyTab } from '../../components/assembly-tab/assembly-tab';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { DocumentsTab } from '../../components/documents-tab/documents-tab';

interface alternate {
  id: number;
  itemId: number;
  al_item: number;
  al_description: string;
  al_commodityGroup: string;
  al_commodityCode: string;
  al_rotating: boolean;
  item: string;
  alternateItem: string;
}

interface condition {
  id: number;
  itemId: number;
  conditionCode: string;
  description: string;
  conditionRate: number;
  item: string;
}

interface Item {
  Id: number;
  ItemCode: string;
  Name: string;
  ItemSet: string;
  Status: string;
  CommodityGroup: string;
  CommodityGroupDesc: string;
  CommodityCode: string;
  CommodityCodeDesc: string;
  IsRotating: boolean;
  LotType: string;
  ReceiptTolerance: number | null;
  Meter: string;
  MeterDesc: string;
  MeterGroup: string;
  MeterGroupDesc: string;
  Qty: number | null,
  Model: string,
  SerialNo: string,
  Manufacturer: string,
  ManufactureDate: Date,
  period: number | null,
  warrantyType: string,
  WarEndDate: Date,
  OrderUnit: string;
  IssueUnit: string;
  Msds: string;
  Image: string;
  ConditionEnabled: boolean;
  IsKit: boolean;
  IsCapitalized: boolean;
  InspectOnReceipt: boolean;
  IsSparePart: boolean;
  AttachToAsset: boolean;
  TaxExempt: boolean;
  OverallRemarks:boolean;

   /* Inventory Control */
  minimumStock: number | null;
  maximumStock: number | null;
  reorderLevel: number | null;
  reorderQuantity: number | null;
  safetyStock: number | null;
  leadTime: number | null;
  currentStock: number | null;
  totalStock: number | null;


  /* Units & Conversion */
  OrderUnitCost: number | null;
  IssueUnitCost: number | null;
  conversion: number | null;
  baseqty: number | null;

  /* Costing */
  unitCost: number | null;
  standardCost: number | null;
  lastPurchaseCost: number | null;
  averageCost: number | null;
  totalorderunit: number | null;
  currency: string;
  taxPercent: number | null;
  discountPercent: number | null;
  freightCost: number | null;
  landedCost: number | null;
  reorderCost: number | null;
  costingMethod: string;
  stockreturn: string;
  returnreason: string;

  alternates: alternate[];
  condition: condition[];
}

interface vendordetail {
  id: number;
  itemId: number;
  name: string,
  LeadTimeDays:string,
  TaxExempt:boolean,
  DefaultVendor:boolean,
  organization:string,
  site:string
}
interface specific {
  id: number,
  itemId: number,
  attribute: string,
  description: string,
  datatype: boolean,
  alphavalue: string,
  numericvalue: number,
  uom: string,

}



interface assemblydetail{
  id:number,
  AssemblyId:number,
  Item: string,
  Description:string,
  Quantityf:boolean,
  Remark:string
  }

  interface assembly{
 id: number;
itemId: number;
TopLevelItem:string,
TopLevelCode:string,
CurrentLevel:string,
CurrentLevelCode:string,
BelongsTo:string,
Remarks:string,
  assemblydetails: assemblydetail[];
}

interface addstoreroomform{
 site: string,
storename: string,
storedescription: string
}

interface addstoreroomlistform{
    itemname: string,
    issuecost: number,
    unitcost: number,
    defaultbin: number,
    currentbalance: number,
    lot: string,
    issueunit: number,
    orderunit: number,
    site: string
  }

interface documentdetail {
  id?: number;                 
  itemId?: number;           
  name: string;
  document?: File | null;    
  existingFile?: string;     
}


  
@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [CommonModule, GeneralTab, VendorTab,VendoritemTab,SpecificationTab, OrganizationTab, DocumentsTab , ReactiveFormsModule, FormsModule,LucideAngularModule, MessageBox],
  templateUrl: './item-create.html',
  styleUrls: ['./item-create.css'],
})
export class ItemCreate {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @ViewChild(GeneralTab) generalTab!: GeneralTab;

@Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';
@Input() deleteMessageBox = false;
@Input() showCommonpopup = false;

@Input() showMessagepopup = false;
@Input() showstockcancel = false;




  funnel = Funnel; 
  arrowbigleft = ArrowBigLeft;
  arrowbigright = ArrowBigRight;
  chevronsright = ChevronsRight;
  search = Search;
  squarex = SquareX;
  save = Save;
  chevronleft =ChevronLeft;

  constructor(private fb: FormBuilder, private masterService: Master,private router: Router, private cdr: ChangeDetectorRef,private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: object) {}
  
  itemForm!: FormGroup;
  
  selectedId: any;
  ngOnInit(): void {
this.allItems = [...this.pItems];
   const id = this.route.snapshot.paramMap.get('id');
       this.selectedId = Number(id);

  const isEdit = !!this.selectedId;
      this.setitemlastid()

    this.itemForm = this.fb.group({
      general: this.fb.group({
      itemCode: ['', Validators.required],
      itemName: ['', Validators.required],
      status: ['ACTIVE'],
      itemSet: [''],
      commodityGroup: [''],
      commodityGroupDesc: [''],
      commodityCodeDesc: [''],
      commodityCode: [''],
      rotating: [false],
      lotType: ['NOLOT'],
      receiptTolerance: [''],
      meter: [''],
      meterDesc: [''],
      meterGroupDesc: [''],
      meterGroup: [''],
      qty: ['', Validators.required],
      model: [''],
      serialno: [''],
      Manufacturer: [''],
      ManufactureDate: [''],
      period: [''],
      warrantyType:['month'],
      WarEndDate: [''],
      orderUnit: [''],
      issueUnit: [''],
      totalorderunit:[''],
      msds: [''],
      image: [''],
      conditionEnabled: [''],
      kit: [''],
      capitalized: [''],
      inspectOnReceipt: [''],
      sparePart: [''],
      attachToAsset: [''],
      taxExempt: [''],
      overallremarks:[''],
          /* Inventory Control */
      minimumStock: [''],
      maximumStock: [''],
      reorderLevel: [0, [
    Validators.required,
    Validators.min(1),
    Validators.max(100)
  ]],
      reorderQuantity: [''],
      safetyStock: [''],
      leadTime: [''],
      currentStock:[''],
      totalStock:[''],

      /* Units & Conversion */
      conversion: [''],
      baseqty: [''],

      /* Costing */
      orderunitCost:['0.00'],
      issueunitcost:['0.00'],
      unitCost: ['0.00'],
      standardCost: ['0.00'],
      lastPurchaseCost: ['0.00'],
      averageCost: ['0.00'],
      currency: ['AED'],
      taxPercent: ['5'],
      discountPercent: ['0'],
      freightCost: ['0.00'],
      landedCost: ['0.00'],
      reorderCost: ['0.00'],
      stockreturn: [''],
      returnreason:[''],
      costingMethod: [''],
      alternates: this.fb.array([]),
      condition: this.fb.array([]),
      }),
       
      vendor: this.fb.group({
         storeitemCode: [''],
         storeitemName: [''],
        storerooms: this.fb.array([]),
          addstoreroomform: this.fb.group({
              site: ['', Validators.required],
              storename: ['', Validators.required],
              storedescription: ['', Validators.required]
            }),

            addstoreroomlistform: this.fb.group({
              itemname: [''],
              issuecost: [''],
              unitcost: ['0.00'],
              defaultbin: [''],
              currentbalance: [''],
              lot: [''],
              issueunit: [''],
              orderunit: [''],
              site: ['']
            })
      }),

      vendoritem : this.fb.group({
       vendorsdetail: this.fb.array([]),
      }),
      specification: this.fb.group({
         specific: this.fb.array([]),
      }),

      organization: this.fb.group({
        TopLevelItem:[],
        TopLevelCode:[],
        CurrentLevel:[],
        CurrentLevelCode:[],
        BelongsTo:[],
        Remarks:[],
        assemblydetails: this.fb.array([]),
      }),

      documents: this.fb.group({
        docuitemCode: [''],
        docuitemName: [''],
           documentdetail: this.fb.array([]),
      }),

       itemCancel: this.fb.group({
    cancelItem: [''],
    cancelQty: [''],
    transactionType: [''],
    referenceNo: [''],
    reason: ['']
  })

    });


}
  

  itemlist()
  {
         this.router.navigate(['/admin/item-master']); 
  }

  get generalForm(): FormGroup {
  return this.itemForm.get('general') as FormGroup;
}

get vendorForm(): FormGroup {
  return this.itemForm.get('vendor') as FormGroup;
}

get vendoritemForm(): FormGroup {
  return this.itemForm.get('vendoritem') as FormGroup;
}

get specificationForm(): FormGroup {
  return this.itemForm.get('specification') as FormGroup;
}

get organizationForm(): FormGroup {
  return this.itemForm.get('organization') as FormGroup;
}

get documentsForm(): FormGroup {
  return this.itemForm.get('documents') as FormGroup;
}

get addStoreForm() {
  return this.itemForm.get('addstoreroomform') as FormGroup;
}

get storeListForm() {
  return this.itemForm.get('addstoreroomlistform') as FormGroup;
}

get itemCancel(): FormGroup {
  return this.itemForm.get('itemCancel') as FormGroup;
}
  @Output() close = new EventEmitter<void>();  

   activeTab: string = 'general';
     vendorData: any;
     VendoritemData:any;
     generalData : any;
     specificationData : any;
     organizationData : any; 


changeTab(tab: string) {

   if (this.activeTab) {
    this.tabHistory.push(this.activeTab);
  }

  console.log("TAB:", tab);
  localStorage.setItem('TAB',tab)
  

this.activeTab = tab;
}
  get alternates(): FormArray {
  return this.itemForm.get('alternates') as FormArray;
}

  get condition(): FormArray {
  return this.itemForm.get('condition') as FormArray;
}

get assemblydetails(): FormArray {
  return this.itemForm.get('organization.assemblydetails') as FormArray;
}

get vendorsdetail(): FormArray {
  return this.itemForm.get('vendorsdetail') as FormArray;
}

get documentdetail(): FormArray {
  return this.itemForm.get('documentdetail') as FormArray;
}

deleteItemId: number | null = null;

buildPayload() {
  const formValue = this.itemForm.value;

  console.log(this.activeTab)
  switch (this.activeTab) {

    case 'general':
      const g = this.generalForm;

      return {
        Id: this.selectedId || 0, // ✅ dynamic
        ItemCode: g.get('itemCode')?.value || '',
        Name: g.get('itemName')?.value || '',
        ItemSet: g.get('itemSet')?.value || '',
        Status: g.get('status')?.value || '',
        CommodityGroup: g.get('commodityGroup')?.value || '',
        CommodityGroupDesc: g.get('commodityGroupDesc')?.value || '',
        CommodityCode: g.get('commodityCode')?.value || '',
        CommodityCodeDesc: g.get('commodityCodeDesc')?.value || '',
        IsRotating: !!g.get('rotating')?.value,
        LotType: g.get('lotType')?.value || 'NOLOT',
        ReceiptTolerance: g.get('receiptTolerance')?.value ? Number(g.get('receiptTolerance')?.value) : null,
        Qty: g.get('qty')?.value ? Number(g.get('qty')?.value) : null,
        Meter: g.get('meter')?.value || '',
      MeterDesc: g.get('meterDesc')?.value || '',
      MeterGroup: g.get('meterGroup')?.value || '',
      MeterGroupDesc: g.get('meterGroupDesc')?.value || '',
      Model: g.get('model')?.value || '',
      Manufacturer: g.get('Manufacturer')?.value || '',
      Period: g.get('period')?.value ? Number(g.get('period')?.value) : 0, 
      //Manufacturer: g.get('manufacturer')?.value || '',
       SerialNo: g.get('serialno')?.value || '',

  ManufactureDate: g.get('ManufactureDate')?.value
    ? new Date(g.get('ManufactureDate')?.value)
    : null,

  warrantyType: g.get('warrantyType')?.value || null,

  WarEndDate: g.get('WarEndDate')?.value
    ? new Date(g.get('WarEndDate')?.value)
    : null,

      OrderUnit: g.get('orderUnit')?.value || '',
      IssueUnit: g.get('issueUnit')?.value || '',
      Msds: g.get('msds')?.value || '',
      Image: g.get('image')?.value || '',
      ConditionEnabled: !!g.get('conditionEnabled')?.value,
      IsKit: !!g.get('kit')?.value,
      IsCapitalized: !!g.get('capitalized')?.value,
      InspectOnReceipt: !!g.get('inspectOnReceipt')?.value,
      IsSparePart: !!g.get('sparePart')?.value,
      AttachToAsset: !!g.get('attachToAsset')?.value,
      TaxExempt: !!g.get('taxExempt')?.value,

      MinimumStock: g.get('minimumStock')?.value ? Number(g.get('minimumStock')?.value) : null,
      MaximumStock: g.get('maximumStock')?.value ? Number(g.get('maximumStock')?.value) : null,
      ReorderLevel: g.get('reorderLevel')?.value ? Number(g.get('reorderLevel')?.value) : null,
      ReorderQuantity: g.get('reorderQuantity')?.value ? Number(g.get('reorderQuantity')?.value) : null,
      OverallRemarks: g.get('overallremarks')?.value || '',
      SafetyStock: g.get('safetyStock')?.value ? Number(g.get('safetyStock')?.value) : null,
      LeadTime: g.get('leadTime')?.value ? Number(g.get('leadTime')?.value) : null,

      CurrentStock: g.get('currentStock')?.value ? Number(g.get('currentStock')?.value) : null,
      TotalStock: g.get('totalStock')?.value ? Number(g.get('totalStock')?.value) : null,
      Stockreturn:g.get('stockreturn')?.value || '',
      Returnreason: g.get('returnreason')?.value || '',

       OrderUnitCost: g.get('orderunitCost')?.value ? Number(g.get('orderunitCost')?.value) : null,
      IssueUnitCost: g.get('issueunitcost')?.value ? Number(g.get('issueunitcost')?.value) : null,

     Conversion: g.get('conversion')?.value ? Number(g.get('conversion')?.value) : null,
     BaseQty: g.get('baseQty')?.value ? Number(g.get('baseQty')?.value) : null,

     UnitCost: g.get('unitCost')?.value ? Number(g.get('unitCost')?.value) : null,
            StandardCost: g.get('standardCost')?.value ? Number(g.get('standardCost')?.value) : null,

          LastPurchaseCost: g.get('lastPurchaseCost')?.value ? Number(g.get('lastPurchaseCost')?.value) : null,
          AverageCost: g.get('averageCost')?.value ? Number(g.get('averageCost')?.value) : null,

          Currency: g.get('currency')?.value || null,

          TaxPercent: g.get('taxPercent')?.value ? Number(g.get('taxPercent')?.value) : null,
          DiscountPercent: g.get('discountPercent')?.value ? Number(g.get('discountPercent')?.value) : null,

          FreightCost: g.get('freightCost')?.value ? Number(g.get('freightCost')?.value) : null,
          LandedCost: g.get('landedCost')?.value ? Number(g.get('landedCost')?.value) : null,

          ReorderCost: g.get('reorderCost')?.value ? Number(g.get('reorderCost')?.value) : null,

          CostingMethod: g.get('costingMethod')?.value || null,

        alternates: formValue.general.alternates?.map((a: any) => ({
          id: a.id || 0,
          al_item: a.al_item,
          al_description: a.al_description,
          al_commodityGroup: a.al_commodityGroup,
          al_commodityCode: a.al_commodityCode,
          al_rotating: !!a.al_rotating
        })),

        conditions: formValue.general.condition?.map((c: any) => ({
          id: c.id || 0,
          conditionCode: c.con_code,
          description: c.con_description,
          conditionRate: Number(c.con_conditionrate)
        })) || []
      };

    case 'vendors':

     //const v = this.vendorForm.value.storerooms;
      const storerooms = this.vendorForm.get('storerooms')?.value;
        //const lastId = this.selectedId || Number(localStorage.getItem('lastItemId'));
              return this.selectedId;

      // const payload = storerooms.map((v: any) => ({
      //   storeroom: v.storename || '',
      //   issueCost: v.issuecost || 0,
      //   unitCost: v.unitcost || 0,
      //   defaultBin: v.defaultbin || '',
      //   currentBalance: v.currentbalance || 0,
      //   lot: v.lot || '',
      //   issueUnit: v.issueunit || '',
      //   orderUnit: v.orderunit || '',
      //   site: v.site || ''
      // }));

      // return payload;

    case 'vendorsitem':

           const vendorsdetail = this.vendoritemForm.get('vendorsdetail')?.value || [];
           const lastId = this.selectedId || Number(localStorage.getItem('lastItemId'));
              return this.selectedId;

    case 'spec':

        const s = this.specificationForm;
        const specs = s.get('specifications')?.value || [];

            return {
              Id:  0,
              Itemid: this.selectedId || 0,
               spccode: s.get('spccode')?.value || '',
              spcitem: s.get('spcitem')?.value || '',
              classification: s.get('classification')?.value || '',
              classdescription: s.get('classdescription')?.value || '',

              details: specs.map((p:any)=>({
                  //id: p.id ,
                  attribute: p.attribute || '',
                  description: p.description || '',
                  value: p.value || '',
                  uom: p.uom || '',
              }))
            }

    case 'org':
      const o = this.organizationForm;
      const organ = o.get('assemblydetails')?.value || [];

      return {
        Id: 0,
        ItemId: Number(this.selectedId || localStorage.getItem('lastItemId')),
        TopLevelItem: o.get('TopLevelItem')?.value || '',
        TopLevelCode: o.get('TopLevelCode')?.value || '',
        CurrentLevel : o.get('CurrentLevel')?.value || '',
        CurrentLevelCode: o.get('CurrentLevelCode')?.value || '',
        BelongsTo: o.get('BelongsTo')?.value || '',
        Remarks: o.get('Remarks')?.value || '',
        details: (o.get('assemblydetails')?.value || []).map((a: any) => ({
          Item: a.item,
          Description: a.description,
          Quantity: Number(a.quantity) || 0,
          Remark : a.remark
        }))
      }

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
      if (this.activeTab === 'general') {
        currentGroup = this.generalForm;
      } else if (this.activeTab === 'vendors') {
        currentGroup = this.vendorForm;
      }else if (this.activeTab === 'vendorsitem') {
        currentGroup = this.vendoritemForm;
      }else  if (this.activeTab === 'spec') {
        currentGroup = this.specificationForm;
      }else  if (this.activeTab === 'documents') {
        currentGroup = this.documentsForm;
      }else  {
        currentGroup = this.organizationForm;
        //currentGroup = this.itemForm.get(this.activeTab) as FormGroup;
      }

      // console.log(currentGroup)

      //   if(this.activeTab != "vendors")
      //   {
      //         if (!currentGroup || currentGroup.invalid) {
      //         currentGroup?.markAllAsTouched();

      //         Object.keys(currentGroup.controls).forEach((key) => {
      //           const control = currentGroup.get(key);

      //           if (control?.invalid) {
      //             console.log('Invalid field:', key);
      //             console.log('Current value:', control.value);
      //             console.log('Errors:', control.errors);
      //           }
      //         });

      //         console.warn('Please fill required fields');
      //         return;
      //       }
      //   }

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

        // ✅ get file from child (GeneralTab)
        if (this.generalTab?.selectedMsdsFile) {
          formData.append('Msds', this.generalTab.selectedMsdsFile);
        }

        let apiCall;

        if (this.activeTab === 'general') {
          apiCall = isEdit
            ? this.masterService.updateItem(this.selectedId, payload)
            : this.masterService.saveTab(payload);
        } else if (this.activeTab === 'vendors') {
          apiCall = this.masterService.storeroomTab(this.selectedId, true);
        }else if (this.activeTab === 'vendorsitem') {
          apiCall = this.masterService.vendoritemTab(this.selectedId, true);
        }else if (this.activeTab === 'spec') {
          apiCall = this.masterService.specificationitemTab(this.selectedId, payload);
        }else if (this.activeTab === 'documents') {
          apiCall = this.masterService.documentsTab(this.selectedId, true);
        }else{
          apiCall = this.masterService.ItemAssemblyTab(this.selectedId, payload);
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

  // this.masterService.getItemById(id).subscribe((res: any) => {

  //   console.log(res);

  //   this.itemCancel.patchValue({
  //     cancelItem: res.itemCode,
  //     cancelQty: res.qty
  //   });

  //   console.log(this.itemCancel.value);

  // });

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


// confirmDelete()
// {
//   this.showMessageBox = false;
//   this.router.navigate(['/admin/item-master'])
// }

showStoreroomlist = false;
showStoreroom = false;
showCommodity= false;
selectedAction: string = '';

opencommodity(type:string)
{
  //const selectElement = type;
  //const value = selectElement.value;
  this.selectedAction = type;  
  console.log(type)
  if(this.selectedAction === "commodity")
  {
   this.showCommodity = true;
  }else if(this.selectedAction === "storeroom")
  {
    this.showStoreroom = true
    
     this.masterService.getMastersById(6).subscribe(res => {
    this.citems = res as any[];

    this.cfilteredItems = [...this.citems];

    // this.loading = false;
  });
    
  }
}

closecommodity()
{
   this.showCommodity = false;
   this.showCommonpopup = false;
}


// commodity group

citems: any[] = [];

filters = {
  name: '',
  description: '',
  status: '',
  search:''
};

filtersitem = {
  itemCode: '',
  itemName: '',
   status: '',
    search:''

};



cfilteredItems: any[] = [];

loadMasters() {
  this.masterService.getMasters().subscribe(res => {
    this.citems = res as any[];
    this.cfilteredItems = [...this.citems]; // copy after getting data
  });
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

// applyFiltersitem() {
//    this.pItems =this.pItems.filter(item =>
//     item.item.toLowerCase().includes(this.filters.name.toLowerCase()) &&
//     item.description.toLowerCase().includes(this.filters.description.toLowerCase())
//   );

//   console.log(this.pItems)

//   this.currentPage = 1; // reset page
// }

selectRow(item: any) {
  this.selectedRow = item;
}

doubleClickRow(item: any) {
  this.selectedRow = item;
  this.insertItem();
}

insertItem() {
  if (!this.selectedRow) return;
  this.generalForm.patchValue({
    itemCode: this.selectedRow.name,
    description: this.selectedRow.description
  });

  //this.closecommodity(); // if you have popup close
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


//commodity code

codeitems: any[] = [];

codefilters = {
  name: '',
  description: '',
  commodity: ''
};

codefilteredItems: any[] = [];

codeloadMasters() {
  this.masterService.getMasters().subscribe(res => {
    this.codeitems = res as any[];
    this.codefilteredItems = [...this.codeitems]; // copy after getting data
  });
}

codeselectedRow: any = null;

codeapplyFilters() {
  this.codefilteredItems = this.codeitems.filter(item =>
    item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
    item.description.toLowerCase().includes(this.filters.description.toLowerCase())
  );

  this.codecurrentPage = 1; // reset page
}

codeselectRow(item: any) {
  this.codeselectedRow = item;
}

codedoubleClickRow(item: any) {
  this.codeselectedRow = item;
  this.codeinsertItem();
}

codeinsertItem() {
  if (!this.codeselectedRow) return;

  this.generalForm.patchValue({
    itemCode: this.codeselectedRow.name,
    description: this.codeselectedRow.description
  });

  this.closecommodity(); // if you have popup close
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


// Save new row to backend
  codesaveNewRow() {
    if (!this.codenewRow.name) return;

    const codenewRow = this.codenewRow.value;

    this.masterService.createMaster(this.codenewRow).subscribe({
      next: (res: any) => {
        // Add to top of local array
        this.codeitems.unshift({ ...res });
        this.codenewRow = {Master: 3, MasterName : 'commodityCode', Name: '', Description: '', Status: '' };
        this.codeisAdding = false;
        console.log('Row saved:', res);
      },
      error: (err) => {
        console.error('Error saving row:', err);
        //alert('Failed to save row. Check backend/API.');
      },
    });
  }

codecancelAdd() {
  this.codeisAdding = false;
}

codeshowFilterRow = false;

codetoggleFilter() {
  this.codeshowFilterRow = !this.codeshowFilterRow;

  if (!this.codeshowFilterRow) {
    this.codefilters = {
      name: '',
      description: '',
      commodity: ''
    };
    this.codeapplyFilters();
  }
}


codeclosecommodity()
{
   this.showCommodity = false;

}

// commodity group

sitems: any[] = [];

sfilteredItems: any[] = [];

storeinsertItem() {
  if (!this.selectedRow) return;
  this.generalForm.patchValue({
    itemCode: this.selectedRow.name,
    description: this.selectedRow.description
  });

  //this.closecommodity(); // if you have popup close
}

showaddStoreroom = true;
showdetailStoreroom =false;

closestoreroom()
{
   this.selectedAction = "";
  this.showStoreroom = false;
    this.showaddStoreroom = true;
    this.showdetailStoreroom =false;
}

addstoreroomform!: FormGroup;

openpopup()
{
  this.showStoreroomlist = true;
  //this.showaddStoreroom = true;
  this.showdetailStoreroom =false;
   this.addstoreroomform = this.fb.group({
    site: [''],
    storename: [''],
    storedescription: ['']
  });
}

closestoreroomlist()
{
    this.selectedAction = "";
    this.showStoreroomlist = false;
}

addstoreroomlistform!: FormGroup;

//itemForm!: FormGroup;
  showDetails = true;
  trash = Trash;

addstoreroom()
{
 this.showaddStoreroom = false;
  this.showdetailStoreroom =true;

  this.addstoreroomlistform = this.fb.group({
      item: [''],
      issuecost: [''],
      unitcost: ['0.00'],
      defaultbin: [''],
      currentbalance: [''],
      lot: [''],
      issueunit: [''],
      orderunit: [''],
      site: ['BEDFORD']
    });

}

 toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  deleteRow() {
    console.log('delete clicked');
  }

  submit() {
    console.log(this.itemForm.value);
  }

  storeclose() {
    console.log('popup closed');
  }

//   get alternates(): FormArray {
//   return this.itemForm.get('alternates') as FormArray;
// }

  id: number = 0;

openCommodityHandler(type: string) {
  this.selectedAction = type;
  if (type === "CommodityGroup") this.id = 1;
  else if (type === "CommodityCode") this.id = 6;
  else if (type === "Orderunit") this.id = 3;
  else if (type === "Issueunit") this.id = 4;
  else if (type === "meterGroup") this.id = 2;
  else if (type === "Meter") this.id = 7;

  // ✅ OPEN POPUP IMMEDIATELY
  this.showCommonpopup = true;

  if ((type === "CommodityGroup") || (type === "Orderunit") || (type === "meterGroup") ) {
    
    this.masterService.getMastersById(this.id).subscribe(res => {

      this.citems = res as any[];
      this.cfilteredItems = [...this.citems];

      this.cdr.detectChanges(); // keep

    });

  } else {

       this.masterService.getItemList().subscribe(res => {
      this.citems = res as any[];
      console.log(this.citems)
      this.cfilteredItems = [...this.citems];
      this.cdr.detectChanges(); // keep

    });
  }
}

openCommodityHandleralter(type: string, rowIndex: number) {

  this.selectedAction = type;
  this.selectedRow = rowIndex;
  // this.loading = true;
  this.showCommonpopup = true;

//   if (type === "CommodityGroup") {
//     this.id = 2;
//   } else if (type === "CommodityCode") {
//     this.id = 3;
//   } else if (type === "LotType") {
//     this.id = 4;
//   }

//   console.log(type)

// if (type !== "Item" && type !== "AlItem") 
// {
//   this.masterService.getMastersById(this.id).subscribe(res => {
//     this.citems = res as any[];

//     this.cfilteredItems = [...this.citems];

//     // this.loading = false;
//   });
// }else{

//   this.pItems;
// }
//this.pItems;
}

pItems = [
  { item: 'MECH001', description: 'Steer Tire - Bridgestone', group: 'TIRE', code: '-', set: 'SET1' },
  { item: 'MECH002', description: 'ENGINE SECONDARY FUEL FILTER ELEMENT', group: 'FILTERS', code: '-', set: 'SET1' },
  { item: 'MECH003', description: 'GoodYear G362 11R22.5 tire', group: 'TIRE', code: '-', set: 'SET1' },
  { item: 'MECH004', description: 'GoodYear G362 11R22.5 tire', group: 'TIRE', code: '-', set: 'SET1' },
  { item: 'MECH005', description: 'GoodYear G362 11R22.5 tire', group: 'TIRE', code: '-', set: 'SET1' },

  { item: 'ELEC001', description: 'Standard Laptop Computer', group: '-', code: '-', set: 'SET1' },
  { item: 'MECH006', description: 'Pressure Pump', group: '-', code: '-', set: 'SET1' },
  { item: 'ELEC002', description: 'Windows XP Operating System', group: '-', code: '-', set: 'SET1' },
  { item: 'ELEC003', description: 'Microsoft Office XP Pro', group: '-', code: '-', set: 'SET1' },
  { item: 'ELEC004', description: 'Laser printer (local)', group: '-', code: '-', set: 'SET1' },

  { item: 'MECH007', description: 'Motor Controlled Valve', group: 'VALVE', code: '-', set: 'SET1' },
  { item: 'MECH008', description: '24 Volt-DC Motor', group: 'MOTOR', code: '-', set: 'SET1' },
  { item: 'MECH009', description: 'Precisionaire Disposable Air Filter', group: 'FILTERS', code: '-', set: 'SET1' },

  { item: 'ELEC005', description: '5 ft. X 6 ft. window pane', group: '-', code: '-', set: 'SET1' },
  { item: 'MECH010', description: 'Pipe Gaskets', group: '-', code: '-', set: 'SET1' },
  { item: 'MECH011', description: 'Brake Parts', group: '-', code: '-', set: 'SET1' },

  { item: 'MECH012', description: 'ENGINE FUEL INJECTOR NOZZLE', group: 'FUEL', code: '-', set: 'SET1' },
  { item: 'MECH013', description: 'Pin, Split- E-43', group: 'MECH', code: '-', set: 'SET1' },
  { item: 'MECH014', description: 'Oil- Air Cylinder', group: 'MECH', code: '-', set: 'SET1' }
];



selectItem(item: any) {
  this.selectedRowId = item.id;
  console.log(item)
  //localStorage.setItem("groupid", item.id);
  if(item.masterId == 1)
  {
  this.itemForm.get('general')?.patchValue({
    commodityGroup: item.name,
    commodityCode: item.description,
  });
    this.generalTab.loadCommodityCodes(item.id);

 } else if(item.masterId == 6)
 {
   this.itemForm.get('general')?.patchValue({
    commodityCode: item.name,
    commodityCodeDesc: item.description
    
  });
  localStorage.removeItem("groupid");
 }else if(item.masterId == 3){
  this.itemForm.get('general')?.patchValue({
    //commodityCode: item.Id,
    orderUnit: item.name,
    issueUnit: item.description
  });
 }else if(item.masterId == 4){
  this.itemForm.get('general')?.patchValue({
    //commodityCode: item.Id,
    issueUnit: item.name
  });
 }else if(item.masterId == 5){
  this.itemForm.get('general')?.patchValue({
    lotType: item.name,
  });
 }else if(item.masterId == 2){
  this.itemForm.get('general')?.patchValue({
    meterGroup: item.name,
    meter : item.description
  });
 } else {


  this.itemForm.get('general')?.patchValue({
    itemCode: item.itemCode,
    itemName: item.itemName
  });

 }
 
  this.showCommonpopup = false;
}

selectgroup(item:any,type:string)
{
  if(type === "vendor")
  {
      console.log(type)

 this.itemForm.get('vendor')?.patchValue({
    storeitemCode: item.itemCode,
    storeitemName: item.itemName
  });
  }else if(type === "vendorItem")
  {
 this.itemForm.get('vendoritem')?.patchValue({
    venitemCode: item.itemCode,
    venitemName: item.itemName
  });
  }else if(type === "spec"){
     this.itemForm.get('specification')?.patchValue({
    spccode: item.itemCode,
    spcitem: item.itemName
  });
  }else if(type === "organization"){
     this.itemForm.get('organization')?.patchValue({
    TopLevelItem: item.itemCode,
    TopLevelCode: item.itemName
  });
  }else{
  this.itemForm.get('documents')?.patchValue({
    docuitemCode: item.itemCode,
    docuitemName: item.itemName
  });
  }
   this.showCommonpopup = false;
}



selectItemalter1(item: any) {
  console.log(item)
   const index = this.alternates.length - 1;

if (index >= 0) {

  this.alternates.at(index).patchValue({
    al_item: item.item,
    al_description: item.description,
    al_commodityGroup: item.group,
    al_commodityCode: item.code,
    al_rotating: item.set
  });

  this.showCommodity = false;

} else {
  console.error('No rows available to patch');
}
}

selectItemalter(item: any) {
  if (this.selectedRow != null && this.alternates.length > this.selectedRow) {
    const row = this.alternates.at(this.selectedRow);
    row.patchValue({
      al_item: item.item,
      al_description: item.description,
      al_commodityGroup: item.group,
      al_commodityCode: item.code,
      al_rotating: item.set === 'SET1' // convert string to boolean
    });
    this.showCommodity = false;
  } else {
    console.error('Invalid row index');
  }
}

itemlastId:any = '';
itemstatus:any ='';

setitemlastid() {
    const routeId = this.route.snapshot.paramMap.get('id');
    const urlId = routeId ? Number(routeId) : null;

    const isCreateMode = !urlId || isNaN(urlId);
 if (isCreateMode) {
  this.masterService.getitemlastId().subscribe((res: any) => {
      const lastId = Number(res?.lastId ?? 0);
  
      const finalId = lastId + 1;
      this.itemlastId = `ITEM-${String(finalId).padStart(5, '0')}`;    

  });
}else{
    this.masterService.getItemById(this.selectedId).subscribe((res: any) => {
       this.itemlastId = res.itemSet,
       this.itemstatus = res.status
    })
} 
}

globalSearch = '';

applyGlobalSearch() {

  const search = this.globalSearch.toLowerCase();

  this.cfilteredItems = this.pItems.filter(item =>
    item.item?.toLowerCase().includes(search) ||
    item.description?.toLowerCase().includes(search) 
  );

  this.currentPage = 1;
}

tabHistory: string[] = [];

goBackTab() {

  const previousTab = this.tabHistory.pop();

  if (previousTab) {
    this.activeTab = previousTab;
    localStorage.setItem('tabhtry', previousTab);
  }else{
    this.router.navigate(['/admin/item-master']);
  }
}

}