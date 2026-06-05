import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges,OnChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { ItemCreate } from '../../pages/item-create/item-create';
import { LucideAngularModule, Search,Funnel,ArrowBigLeft,ArrowBigRight, ChevronsRight,Plus} from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { AuthService } from '../../../../core/services/auth';
import { Adminmaster } from '../../../../core/services/adminmaster';



interface alternate {
  al_item?: string;
  al_description?: string;
  al_commodityGroup?: string;
  al_commodityCode?: string;
  al_rotating?: boolean;
  item_id?: number; // we will add this before saving
}

interface condition {
  itemId?: number;
  conditionCode?: string;
  description?: string;
  conditionRate?: number;
  item?: string;
}

@Component({
  selector: 'app-general-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,LucideAngularModule,FormsModule, DatePickerComponent, MessageBox],
   templateUrl: './general-tab.html',
  styleUrls: ['./general-tab.css'],
})



export class GeneralTab implements OnInit {

  @Input() showMessageBox = false;
@Input() messageTitle = '';
@Input() messageText = '';

@Input() showstockcancel= false;
  qty: number = 0;
search = Search;
 funnel = Funnel; 
  arrowbigleft = ArrowBigLeft;
  arrowbigright = ArrowBigRight; 
  chevronsright = ChevronsRight; 
  plus = Plus;
@Input() form!: FormGroup;
@Output() generalChange = new EventEmitter<any>(); 
 //@ViewChild('scrollContainer')scrollContainer!: ElementRef;
@Input() itemId: any
id!: number;
  //Statuses = ['Active', 'InActive']

  constructor(private fb: FormBuilder,private masterService: Master, private cd : ChangeDetectorRef,private ItemCreate: ItemCreate, private route:ActivatedRoute,@Inject(PLATFORM_ID) private platformId: object, private authService: AuthService,private router: Router,private adminMaster: Adminmaster) {}
itemSetValue:any =""
  //commodityGroups: any[] = [];
commodityCodes: any[] = [];

ngOnInit(): void {

  this.getCurrency();
  this.loadCommodityGroups();
  this.loadMeterGroups();
  this.loadOrderUnits();
  this.setitemlastid();
  this.getdiscount();
  this.gettax();
      
    this.form.addControl('itemCode', this.fb.control('', Validators.required));
    this.form.addControl('itemName', this.fb.control('', Validators.required));
    this.form.addControl('itemSet', this.fb.control(''));
    this.form.addControl('status', this.fb.control(''));
    this.form.addControl('commodityGroup', this.fb.control(''));
    this.form.addControl('commodityGroupDesc', this.fb.control(''));
    this.form.addControl('commodityCodeDesc', this.fb.control(''));
    this.form.addControl('commodityCode', this.fb.control(''));
    this.form.addControl('rotating', this.fb.control(false));
    this.form.addControl('lotType', this.fb.control(''));
    this.form.addControl('receiptTolerance', this.fb.control(''));
    this.form.addControl('meter', this.fb.control(''));
    this.form.addControl('meterDesc', this.fb.control(''));
    this.form.addControl('meterGroupDesc', this.fb.control(''));
    this.form.addControl('meterGroup', this.fb.control(''));
    this.form.addControl('qty', this.fb.control('',[Validators.required,Validators.pattern('^[1-9][0-9]*$')]));
    this.form.addControl('model', this.fb.control(''));
    this.form.addControl('serialno', this.fb.control(''));
    this.form.addControl('Manufacturer', this.fb.control(''));
    this.form.addControl('ManufactureDate', this.fb.control(''));
    this.form.addControl('period', this.fb.control(''));
    this.form.addControl('warrantyType', this.fb.control(''));
    this.form.addControl('WarEndDate', this.fb.control(''));
    this.form.addControl('orderUnit', this.fb.control(''));
    this.form.addControl('issueUnit', this.fb.control(''));
    //this.form.addControl('msds', this.fb.control(''));
    //this.form.addControl('image', this.fb.control(''));
    this.form.addControl('conditionEnabled', this.fb.control(''));
    this.form.addControl('kit', this.fb.control(''));
    this.form.addControl('capitalized', this.fb.control(''));
    this.form.addControl('inspectOnReceipt', this.fb.control(''));
    this.form.addControl('sparePart', this.fb.control(''));
    this.form.addControl('attachToAsset', this.fb.control(''));
    this.form.addControl('taxExempt', this.fb.control(''));

    this.form.addControl('minimumStock', this.fb.control(''));
    this.form.addControl('maximumStock', this.fb.control(''));
    this.form.addControl('reorderLevel', this.fb.control(''));
    this.form.addControl('reorderQuantity', this.fb.control(''));
    this.form.addControl('safetyStock', this.fb.control(''));
    this.form.addControl('currentStock', this.fb.control(''));
    this.form.addControl('totalStock', this.fb.control(''));
    this.form.addControl('leadTime', this.fb.control(''));
    this.form.addControl('overallremarks', this.fb.control(''));

this.form.addControl('orderUnit', this.fb.control(''));
this.form.addControl('issueUnit', this.fb.control(''));
this.form.addControl('conversion', this.fb.control(''));
this.form.addControl('baseqty', this.fb.control(''));
this.form.addControl('totalorderunit', this.fb.control(''));
this.form.addControl('totalqty', this.fb.control(''));
this.form.addControl('orderunitCost', this.fb.control(''));
this.form.addControl('issueunitcost', this.fb.control(''));


this.form.addControl('receiptTolerance', this.fb.control(''));
this.form.addControl('unitCost', this.fb.control(''));
this.form.addControl('standardCost', this.fb.control(''));
this.form.addControl('lastPurchaseCost', this.fb.control(''));
this.form.addControl('averageCost', this.fb.control(''));

this.form.addControl('currency', this.fb.control('INR'));
this.form.addControl('taxPercent', this.fb.control(''));
this.form.addControl('discountPercent', this.fb.control(''));
this.form.addControl('freightCost', this.fb.control(''));
this.form.addControl('landedCost', this.fb.control(''));
this.form.addControl('reorderCost', this.fb.control(''));
this.form.addControl('conversion', this.fb.control(''));
this.form.addControl('costingMethod', this.fb.control(''));
this.form.addControl('stockreturn',this.fb.control(''));
this.form.addControl('returnreason',this.fb.control(''));

    this.form.addControl('alternates', this.fb.array([]));
    this.form.addControl('condition', this.fb.array([]));


    this.form.valueChanges.subscribe((val: any) => {

  const startDateRaw = val.ManufactureDate;
  const value = Number(val.period);
  const type = val.warrantyType;



  if (!startDateRaw || !value) return;

  const startDate = new Date(startDateRaw);

  if (isNaN(startDate.getTime())) return;

  const endDate = new Date(startDate);

  switch (type) {

    case 'year':
      endDate.setFullYear(endDate.getFullYear() + value);
      break;

    case 'month':
      endDate.setMonth(endDate.getMonth() + value);
      break;

    case 'days':
    default:
      endDate.setDate(endDate.getDate() + value);
      break;
  }

  const formatted = endDate.toISOString().split('T')[0];
  this.form.patchValue(
    { WarEndDate: formatted },
    { emitEvent: false }
  );
});

      //this.openitemlistgroup();

this.opencommoditygroup();
}

get alternates(): FormArray {
  return this.form.get('alternates') as FormArray;
}
get condition(): FormArray {
  return this.form.get('condition') as FormArray;
}
get f() {
  return this.form.controls;
}

showPopup = false;

openPopup() {
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}


//conditionEnabled = false;
showCommidycode= false;

conditionenabled() {
  const val = this.form.get('conditionEnabled')?.value;
  const conditionArray = this.form.get('condition') as FormArray;

  if (val) {
    if (conditionArray.length === 0) {
      conditionArray.push(this.createconditioncode());
    }
  } else {
    conditionArray.clear();
  }
}

closecommodity1()
{
   this.showCommidycode = false;
}

//showCommonpopup = false

selectItem(item: any) {

  if(item.masterId == 2)
  {
  

  this.form.patchValue({
    commodityGroup: item.name,
    commodityGroupDesc: item.description
  });

 } else if(item.masterId == 3)
 {
   this.form.patchValue({
    commodityCode: item.name,
    commodityCodeDesc: item.description
  });
 }else if(item.masterId == 4){
  this.form.patchValue({
    //commodityCode: item.Id,
    issueUnit: item.name
  });
 }else{
  this.form.patchValue({
    itemCode: item.item,
    itemName: item.description
  });
 }
 
  //this.showCommonpopup = false;
}

selectItemalter(item: any) {
   const index = this.alternates.length - 1;

if (index >= 0) {

  this.alternates.at(index).patchValue({
    al_item: item.item,
    al_description: item.description,
    al_commodityGroup: item.group,
    al_commodityCode: item.code,
    al_rotating: item.set
  });

  this.showCommonpopup = false;

} else {
  console.error('No rows available to patch');
}
}
showCommonpopup = false;
showCommonpopup1 = false;

openCommodityHandleralter(type: string, rowIndex: number) {

  this.selectedAction = type;
  this.selectedRow = rowIndex;
  // this.loading = true;
  this.showCommonpopup = true;

  this.getItems();
}
pItems: any[] = [];

getItems() {
  this.masterService.getItemlist().subscribe((res: any) => {

    this.pItems = res;
    this.citems = [...this.pItems];
    this.cfilteredItems = [...this.pItems];

    this.cd.detectChanges();
  });
}


// DATA LIST
items = [
  { code: 'ITEM001', name: 'Motor Pump' },
  { code: 'ITEM002', name: 'Valve' },
  { code: 'ITEM003', name: 'Pipe' }
];

// FILTERED LIST
filteredItems = [...this.items];

// DROPDOWN CONTROL
openDropdown = false;

filterList(event: any) {
  const value = event.target.value.toLowerCase();

  this.filteredItems = this.items.filter(x =>
    x.code.toLowerCase().includes(value) ||
    x.name.toLowerCase().includes(value)
  );
}

// ===========================
// Commodity Group
// ===========================
showCommodity= false;
citems: any[] = [];
cfilteredItems: any[] = [];
commodity: any[] = [];
filters = {
  name: '',
  description: '',
  commodity: ''
};
selectedRow: any = null;
pageSize = 10;
currentPage = 1;
newRow: any = { al_item: '', al_description: '', al_commodityGroup: '', al_commodityCode:'',al_rotating:'' };
isAdding = false;
isAddingcondition = false;
selectedAction: string = '';
showFilterRow = false;
// loading: boolean = false;

openCommodityHandler(type: string) {
  this.ItemCreate.openCommodityHandler(type)
  //this.ItemCreate.opencommodity(type)
}


// Apply filters
applyFilters() {
  this.cfilteredItems = this.citems.filter(item =>
    item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
    item.description.toLowerCase().includes(this.filters.description.toLowerCase())
  );
  this.currentPage = 1;
}

// Row selection
selectRow(item: any) {
  console.log(item)
  this.selectedRow = item;
}

doubleClickRow(item: any) {
  this.selectedRow = item;
}


// Pagination
get totalPages(): number {
  return Math.ceil(this.cfilteredItems.length / this.pageSize);
}

get paginatedItems() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.cfilteredItems.slice(start, start + this.pageSize);
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

prevPage() {
  if (this.currentPage > 1) this.currentPage--;
}


createAlternate(): FormGroup {
  return this.fb.group({
    al_item: [''],
    al_description: [''],
    al_commodityGroup: [''],
    al_commodityCode: [''],
    al_rotating: [false]
  });
}

startAdd() {
  this.alternates.push(this.createAlternate());
  this.isAdding = true
}

deleteRow(index: number) {
  this.alternates.removeAt(index);
}

cancelAdd() {
  this.isAdding = false;
}



saveNewRow() {
   const data: alternate[] = this.form.value.alternates;

      if (this.alternates.length === 0) return;

      const lastIndex = this.alternates.length - 1;
      const row = this.alternates.at(lastIndex);

      if (row.invalid) {
        row.markAllAsTouched();
        return;
      }

      console.log('Saved Row:', row.value);

      this.isAdding = false; // ✅ stop adding mode
}

createconditioncode(): FormGroup {
  return this.fb.group({
    con_code: [''],
    con_description: [''],
    con_conditionrate: ['']
   
  });
}



startconditionAdd()
{
   this.condition.push(this.createconditioncode());
    this.isAddingcondition = true;
}

codedeleteRow(index: number) {
  this.condition.removeAt(index);
}

codecancelAdd() {
  this.isAddingcondition = false;
}

codesaveNewRow(){
  const data: condition[]  = this.form.value.condition;
    console.log(data)

          if (this.condition.length === 0) return;

      const lastIndex = this.condition.length - 1;
      const row = this.condition.at(lastIndex);

      if (row.invalid) {
        row.markAllAsTouched();
        return;
      }

      console.log('Saved Row:', row.value);

      this.isAddingcondition = false; // ✅ stop adding mode

  // 👉 Example API call
  // this.masterService.createcondition(data).subscribe({
  //   next: (res) => {
  //     console.log('Saved successfully');
  //     this.isAdding = false;
  //   },
  //   error: (err) => {
  //     console.error(err);
  //   }
  // });
}

// Filter toggle
toggleFilter() {
  this.showFilterRow = !this.showFilterRow;
  if (!this.showFilterRow) {
    this.filters = { name: '', description: '', commodity: '' };
    this.applyFilters();
  }
}

// Close commodity modal
closecommodity() {
  this.showCommonpopup = false;
}

getYear(event: any) {
  const year = new Date(event.target.value).getFullYear();

  this.form.patchValue({
    period: `${year}-01-01` // ✅ valid date
  });
}

onFileChange(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxSize = 2 * 1024 * 1024; // 2MB

  // ❌ Type validation
  if (!allowedTypes.includes(file.type)) {
     this.messageTitle = 'files allowed';
      this.messageText = 'Only PDF, DOC, DOCX files allowed';
     this.showMessageBox = true;
    event.target.value = '';
    return;
  }

  // ❌ Size validation
  if (file.size > maxSize) {
     this.messageTitle = 'File Size';
      this.messageText = 'File size must be less than 2MB';
     this.showMessageBox = true;
    event.target.value = '';
    return;
  }

  // ✅ Valid file
  console.log('File OK:', file);
}

isInvalid(controlName: string): boolean {
  const control = this.form.get(controlName);
  return !!(control && control.invalid && (control.touched || control.dirty));
}

selectedMsdsFile: File | null = null;

onMsdsChange(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  // ❌ Type validation
  if (!allowedTypes.includes(file.type)) {
this.messageTitle = 'files allowed';
      this.messageText = 'Only PDF, DOC, DOCX files allowed';
     this.showMessageBox = true;    event.target.value = ''; // ✅ reset input
    return;
  }

  // ❌ Size validation
  if (file.size > maxSize) {
    //alert('File size must be less than 5MB');
      this.messageTitle = 'File Size';
      this.messageText = 'File size must be less than 5MB';
     this.showMessageBox = true;
    event.target.value = ''; // ✅ reset input
    return;
  }

  // ✅ Store separately (BEST PRACTICE)
  this.selectedMsdsFile = file;
}

ngOnChanges(changes: SimpleChanges) {
  console.log("Changes:", changes);

  if (changes['itemId']?.currentValue) {
   // console.log("Received ID:", changes['itemId'].currentValue);

    setTimeout(() => {
      this.loadItem(changes['itemId'].currentValue);
    });
    this.cd.detectChanges();
  }
}


loadItem(id: any) {
  this.masterService.getItemById(id).subscribe((res: any) => {  
   this.qty=res.qty,
    this.form.patchValue({
      itemCode: res.itemCode,
      itemName: res.name,
      commodityGroup: res.commodityGroup,
      commodityCode: res.commodityCode,
      Manufacturer: res.manufacturer,
      ManufactureDate: res.manufactureDate
       ? res.manufactureDate.split('T')[0]
        : null,
      qty: res.qty,
      status: res.status,
      rotating:res.isRotating,
      lotType: res.lotType,
      receiptTolerance:res.receiptTolerance,
      meter: res.meter,
      meterDesc:res.meterDesc,
      meterGroup:res.meterGroup,
      meterGroupDesc:res.meterGroupDesc,
      model: res.model,
      serialno: res.serialNo,
      period:res.period,
      warrantyType: res.warrantyType,
      WarEndDate: res.warEndDate
      ? res.warEndDate.split('T')[0]
        : null,
      orderUnit: res.orderUnit,
      issueUnit: res.issueUnit,
      orderunitCost: res.orderUnitCost,
      issueunitcost: res.issueUnitCost,
      overallremarks: res.overallRemarks,
      msds: res.msds,
      image: res.image,
      conditionEnabled: res.conditionEnabled,
      kit:res.isKit,
      capitalized:res.isCapitalized,
      inspectOnReceipt:res.inspectOnReceipt,
      sparePart:res.isSparePart,
      attachToAsset:res.attachToAsset,
      taxExempt:res.taxExempt,
      minimumStock: res.minimumStock,
      maximumStock: res.maximumStock,
      reorderLevel: res.reorderLevel,
      reorderQuantity: res.reorderQuantity,
      safetyStock: res.safetyStock,
      leadTime: res.leadTime,
      conversion: res.conversion,
      baseQty: res.baseQty,
currentStock: res.currentStock,
totalStock:res.totalStock,
  unitCost: res.unitCost,
  standardCost: res.standardCost,
  lastPurchaseCost: res.lastPurchaseCost,
  averageCost: res.averageCost,

  currency: res.currency,

  taxPercent: res.taxPercent,
  discountPercent: res.discountPercent,

  freightCost: res.freightCost,
  landedCost: res.landedCost,

  reorderCost: res.reorderCost,
  costingMethod: res.costingMethod,
  stockreturn: res.stockreturn,
  returnreason: res.returnreason
    });
  });
}

allowOnlyNumbers(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  const char = event.key;

  // Allow control keys (backspace, delete, arrows)
  if (
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight' ||
    event.key === 'Tab'
  ) {
    return;
  }

  if (!/^[0-9]$/.test(char)) {
    event.preventDefault();
    return;
  }

  if (input.value.length === 0 && char === '0') {
    event.preventDefault();
  }
}

commodityGroups: any[] = [];
opencommoditygroup() {
  this.id = 1
  this.masterService.getMastersById(this.id).subscribe(res => {
    this.commodityGroups = res as any[];
    console.log(this.commodityGroups)
    this.cd.detectChanges(); 
  });
}

showGroupDropdown = false;
showmeterDropdown = false;
meterCodes: any[] = [];

filteredGroups: any[] = [];
filteredmeter: any[] = [];

selectedGroupName = '';
selectedmeterName = '';

onGroupFocus() {

  this.showGroupDropdown = true;
  this.opencommoditygroup();
}


// 🔍 Filter Group
filterGroups(event: any) {
  const value = event.target.value.toLowerCase();

  this.filteredGroups = this.commodityGroups.filter((g: any) =>
    g.name.toLowerCase().includes(value) || g.description.toLowerCase().includes(value)
  );
}

// 🔍 Select Group
selectGroup(group: any) {
  this.form.patchValue({ commodityGroup: group.name,commodityCode: group.description
 });
  this.selectedGroupName = group.name;
  this.showGroupDropdown = false;

}

// 🔍 Filter Code
filterMeter(event: any) {
  const value = event.target.value.toLowerCase();

  this.filteredmeter = this.meterCodes.filter((c: any) =>
    c.name.toLowerCase().includes(value)
  );
}

selectMeter(code:any) {

  this.form.patchValue({
    meterGroup: code.name,   // show selected name in textbox
    meter: code.description  // optional hidden id if needed
  });

  this.selectedmeterName = code.name;
  this.showmeterDropdown = false;
}

loadCommodityCodes(groupId: number) {

  if (!groupId) return;

  this.masterService.getMastersById(groupId)
    .subscribe((res: any) => {
      this.commodityCodes = res.data || res || [];
    });

}

loadCommodityGroups() {
  this.masterService.getMastersById(1).subscribe((res: any) => {
    this.commodityGroups = res.data || res || [];
    this.filteredGroups = [...this.commodityGroups];
  });
}

loadMeterGroups() {
  this.masterService.getMastersById(6).subscribe((res: any) => {
    this.meterCodes = res.data || res || [];
    this.filteredmeter = [...this.meterCodes];
  });
}


// Order Unit Dropdown
showOrderUnitDropdown = false;

orderUnits: any[] = [];
filteredOrderUnits: any[] = [];

selectedOrderUnit = '';


loadOrderUnits(){
  // Example Master ID for units
  this.masterService.getMastersById(3).subscribe((res:any)=>{
    this.orderUnits = res.data || res || [];
    this.filteredOrderUnits = [...this.orderUnits];
  });
}

filterOrderUnit(event:any){
 const value = event.target.value.toLowerCase();

 this.filteredOrderUnits = this.orderUnits.filter((x:any)=>
   x.name.toLowerCase().includes(value)
 );
}

selectOrderUnit(unit:any){
 this.form.patchValue({
   orderUnit: unit.name,issueUnit:unit.description
 });

 this.selectedOrderUnit = unit.name;
 this.showOrderUnitDropdown = false;
}


itemlastId: number = 0;


setitemlastid() {

  this.masterService.getitemlastId().subscribe((res: any) => {

    const lastId = Number(res?.lastId || 0);

    const itemSetValue = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('ItemSetValue') || ''
      : '';

    const finalValue = itemSetValue
      ? itemSetValue
      : 'ITEM-' + (lastId + 1).toString().padStart(5, '0');

    setTimeout(() => {
      this.form?.patchValue(
        { itemSet: finalValue },
        { emitEvent: false }
      );
    });

  });
}

closeDropdown() {
 setTimeout(() => {
   this.showGroupDropdown = false;
 }, 200); // allows click selection before closing
}

closeMeterDropdown(){
 setTimeout(()=>{
   this.showmeterDropdown=false;
 },200);
}

closeOrderUnitDropdown(){
 setTimeout(()=>{
   this.showOrderUnitDropdown = false;
 },200);
}


@HostListener('document:click', ['$event'])
clickOutside(event: any){

 if(!event.target.closest('.dropdown-wrapper2')){
   this.showOrderUnitDropdown = false;
 }

 if(!event.target.closest('.dropdown-wrapper')){
   this.showGroupDropdown = false;
 }

 if(!event.target.closest('.dropdown-wrapper1')){
   this.showmeterDropdown = false;
 }
}

calculationconversion() {

  const conversion = Number(this.form.get('conversion')?.value) || 0;
  const orderQty = Number(this.form.get('qty')?.value) || 0;

  if (conversion <= 0) {
    this.form.patchValue({
      totalQty: 0
    });
    return;
  }

  const totalQty = orderQty * conversion;
  const totalorderunit = orderQty / conversion;

  console.log(totalQty);
 
  this.form.patchValue({
    totalorderunit: totalorderunit,
    totalQty: totalQty
  });
}

calculationorderofunit() {

  const orderUnitCost =
    Number(this.form.get('orderunitCost')?.value) || 0;

  const conversion =
    Number(this.form.get('conversion')?.value) || 0;

  this.calculationreorder();

  if (conversion === 0) {

    this.form.patchValue({
      issueunitcost: 0,
      unitCost: 0,
      standardCost: 0
    });

    return;
  }

  // ✅ calculation
  const issueUnitCost = orderUnitCost / conversion;

  // ✅ decimal(18,2)
  const roundedIssueUnitCost =
    Number(issueUnitCost.toFixed(2));

  const roundedStandardCost =
    Number((roundedIssueUnitCost - 3).toFixed(2));

  this.form.patchValue({

    issueunitcost: roundedIssueUnitCost,

    unitCost: roundedIssueUnitCost,

    standardCost: roundedStandardCost

  });
}
calculationfreight() {
  const orderUnitCost = Number(this.form.get('orderunitCost')?.value) || 0;
  const taxPercent = Number(this.form.get('taxPercent')?.value) || 0;
  const freightCost = Number(this.form.get('freightCost')?.value) || 0;
  const discountPercent = Number(this.form.get('discountPercent')?.value) || 0;
  // Tax calculation
  const taxAmount = orderUnitCost * (taxPercent / 100);
  // Discount calculation
  const discountAmount = orderUnitCost * (discountPercent / 100);
  // Final landed cost
  const landedCost =
    orderUnitCost +
    taxAmount +
    freightCost -
    discountAmount;

  this.form.patchValue({
    landedCost: landedCost
  });

  return landedCost;
}

calculationreorder() {

  const reorderqty =
    Number(this.form.get('reorderQuantity')?.value) || 0;

  const issueunitcost =
    Number(this.form.get('issueunitcost')?.value) || 0;

  // ✅ decimal(18,2)
  const reorderCost = +(reorderqty * issueunitcost).toFixed(2);

  this.form.patchValue({
    reorderCost: reorderCost
  });
}

calculationReorderLevel() {

  const maximumStock = Number(this.form.get('maximumStock')?.value) || 0;
  const reorderLevel = Number(this.form.get('reorderLevel')?.value) || 0;

  const reorderQuantity = (reorderLevel / 100) * maximumStock;

  this.form.patchValue({
    reorderQuantity: Math.round(reorderQuantity * 100) / 100
  }, { emitEvent: false });
}

calculationlastPurchaseCost()
{
  const lastPurchaseCost = Number(this.form.get('lastPurchaseCost')?.value) || 0;
  const orderunitCost = Number(this.form.get('orderunitCost')?.value) || 0;

// const orderUnitCost =
//  Number(this.form.get('orderunitcost')?.value) || 0;

//  const lastPurchaseCost =
//  Number(this.form.get('lastPurchaseCost')?.value) || 0;

 const averageCost =
 (orderunitCost + lastPurchaseCost) / 2;

 this.form.patchValue({
   averageCost: averageCost.toFixed(2)
 });

}

calculationsafetystocklevel() {
  const minimumStock = Number(this.form.get('minimumStock')?.value) || 0;

  // prevent negative values
  if (minimumStock < 0) return;

  const safetyStock = Math.ceil(minimumStock / 2);

  this.form.patchValue({
    safetyStock: safetyStock
  }, { emitEvent: false }); // ✅ prevent loop
}

calculationtotalstock() {
  const minimumStock = Number(this.form.get('minimumStock')?.value) || 0;
  const maximumStock = Number(this.form.get('maximumStock')?.value) || 0;

  // prevent negative values
  if (minimumStock < 0) return;

  const totalStock = minimumStock+maximumStock;

  this.form.patchValue({
    totalStock: totalStock
  }, { emitEvent: false }); // ✅ prevent loop
}


deleteItem(id: number) {

  this.showstockcancel = true;
  //if (!confirm('Are you sure you want to delete this item?')) return;

  // this.messageTitle = 'Success';
  //     this.messageText = 'Are you sure you want to delete this item?';
  //     this.showMessageBox = true;

  // this.masterService.deleteItem(id).subscribe({
  //   next: (res) => {
  //     this.messageTitle = 'Success';
  //     this.messageText = res.message;
  //     this.showMessageBox = true;
  //   },
  //   error: (err) => {
  //     this.messageTitle = 'Error';
  //     this.messageText = err.error?.message || 'Delete failed';
  //     this.showMessageBox = true;
  //   }
  // });
}

confirmDelete(id: number)
{
  this.showMessageBox = false;
    this.masterService.deleteItem(id).subscribe({
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
}


showStockDropdown = false;

filteredStock: any[] = [];

selectedStockName = '';

Itemlist: any[] = [];

openitemlistgroup() {
  
  this.masterService.getItemlistlastid().subscribe(res => {
    this.Itemlist = res as any[] || [];
    console.log(this.Itemlist)
    this.filteredGroups = this.Itemlist;
    this.cd.detectChanges(); 
  });

}

openmasterdetailgroup() {
  this.id=1
  this.masterService.getmasterDetailList(this.id).subscribe(res => {
    this.Itemlist = res as any[] || [];
    console.log(this.Itemlist)
    this.filteredGroups = this.Itemlist;
    this.cd.detectChanges(); 
  });

}

// 🔍 Filter Group
filterStocks(event: any) {
  //const value = event.target.value.toLowerCase();
  const value =
  (event?.target?.value || '')
  .toString()
  .toLowerCase();
  this.filteredStock = this.Itemlist.filter((g: any) =>
     (g?.name || '')
    .toString()
    .toLowerCase()
    .includes(value)
  );
}

// 🔍 Select Group
selectStock(group: any) {
  this.form.patchValue({ 
     itemName: group.name,
       itemCode: group.itemCode,
       itemSet:group.itemSet,
       commodityGroup: group.commodityGroup,
       commodityCode: group.commodityCode,
       lotType: group.lotType,
       model:group.model,
       serialno: group.serialNo,
       Manufacturer:group.manufacturer,
       minimumStock: group.minimumStock,
       maximumStock: group.maximumStock,
       reorderLevel: group.reorderLevel,
       safetyStock: group.safetyStock,
       reorderQuantity: group.reorderQuantity,
       currentStock: group.currentStock ?? group.qty,
       orderUnit: group.orderUnit,
       issueUnit: group.issueUnit,
       conversion: group.conversion,
       lastPurchaseCost: group.lastPurchaseCost
 });
  this.selectedStockName = group.itemName;
  this.showStockDropdown = false;
}

stockDropdown() {
  setTimeout(() => {
    this.showStockDropdown = false;
  }, 200);
}


checkQuantity(controlName: string) {

  if(this.qty)
  {
  const qty = Number(this.form.get(controlName)?.value || 0);

  if (!qty  || qty > this.qty) {

    this.form.get(controlName)?.setErrors({
      exceedQty: true
    });

  } else {

    this.form.get(controlName)?.setErrors(null);
  }
}
}



currencylist: any[] = [];

getCurrency() {

  this.adminMaster
    .getcurrencylist()
    .subscribe({

      next: (res: any) => {

        this.currencylist = res;

        console.log(this.currencylist);

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

getdiscount() {
  this.adminMaster.getdiscountlist().subscribe({
    next: (res: any) => {

      const today = new Date();

      const activeDiscount = res.find((item: any) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        return (
          item.status === 'Active' &&
          today >= startDate &&
          today <= endDate
        );
      });

      if (activeDiscount) {
        this.form.patchValue({
          discountPercent: activeDiscount.discountValue
        });
      }
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

gettax() {
  this.adminMaster.gettaxlist().subscribe({
    next: (res: any) => {
      console.log(res)
      if (res && res.length > 0) {

        const latestTax = res.sort(
          (a: any, b: any) =>
            new Date(b.effectiveDate).getTime() -
            new Date(a.effectiveDate).getTime()
        )[0];

        this.form.patchValue({
          taxPercent: latestTax.taxPercentage
        });

        console.log('Latest Tax:', latestTax);
      }
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

}


