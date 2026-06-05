import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import {
  Search,
  ChevronsRight,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide
} from 'lucide-angular';

@Component({
  selector: 'app-supplier-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './supplier-tab.html',
  styleUrl: './supplier-tab.css'
})
export class SupplierTab {

  showMessageBox: boolean = false;
messageTitle: string = '';
messageText: string = '';

  @Input() form!: FormGroup;

  search = Search;
  chevronsright = ChevronsRight;
  movedown = ArrowDownNarrowWide;
  moveup = ArrowUpNarrowWide;

  expandedIndex: number | null = null;

  currentPage = 1;
  pageSize = 10;


  sortColumn: string = '';

sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    if (!this.form.get('venitemCode')) {
      this.form.addControl(
        'venitemCode',
        this.fb.control('', Validators.required)
      );
    }

    if (!this.form.get('venitemName')) {
      this.form.addControl(
        'venitemName',
        this.fb.control('', Validators.required)
      );
    }

    if (!this.form.get('supplierdetails')) {
      this.form.addControl(
        'supplierdetails',
        this.fb.array([])
      );
    }
  }

  get supplierdetails(): FormArray {
    return this.form.get('supplierdetails') as FormArray;
  }

  createVendorGroup(data?: any): FormGroup {
    return this.fb.group({
      id: [data?.id || 0],
      pono: [data?.pono || '', Validators.required],
      companyName: [data?.companyName || ''],
      invoiceno: [data?.invoiceno || ''],
      leadtimedelay: [data?.leadtimedelay || ''],
      taxexempt: [data?.taxexempt || false]
    });
  }

  addVendor(): void {
    this.supplierdetails.push(
      this.createVendorGroup()
    );
  }

  saveVendor(index: number): void {

    const rowData = this.supplierdetails.at(index).value;

    console.log('Saved Row:', rowData);

    this.expandedIndex = null;
  }

  deleteVendor(index: number): void {

    this.supplierdetails.removeAt(index);

    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    }
  }

  get totalPages(): number {
    return Math.ceil(
      this.supplierdetails.length / this.pageSize
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

  poNoFilter = '';
companyFilter = '';
invoiceFilter = '';
leadTimeFilter = '';
taxFilter = '';

allvendorsdetail: any[] = [];

applyFilters() {

  const filtered = this.allvendorsdetail.filter((row: any) => {

    console.log('FULL ROW:', row);

    const pono =
      String(row.pono || '')
        .toLowerCase();

    const company =
      String(row.companyname || '')
        .toLowerCase();

    const invoice =
      String(row.invoiceno || '')
        .toLowerCase();

    const leadtime =
      String(row.leadTimeDays || '')
        .toLowerCase();

    const tax =
      String(row.taxExempt)
        .toLowerCase();

    console.log('ROW VALUES:', {
      pono,
      company,
      invoice,
      leadtime,
      tax
    });

    const match =
      pono.includes(this.poNoFilter.toLowerCase()) &&
      company.includes(this.companyFilter.toLowerCase()) &&
      invoice.includes(this.invoiceFilter.toLowerCase()) &&
      leadtime.includes(this.leadTimeFilter.toLowerCase()) &&
      tax.includes(this.taxFilter.toLowerCase());

    console.log('MATCH RESULT:', match);

    return match;
  });

  console.log('FILTERED RESULT:', filtered);

  this.supplierdetails.clear();

  filtered.forEach((item: any) => {
    this.supplierdetails.push(this.createVendorGroup(item));
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

columns = [
  { field: 'pono', label: 'PO No' },
  { field: 'companyname', label: 'Company Name' },
  { field: 'invoiceno', label: 'Invoice No' },
  { field: 'leadtimeday', label: 'Lead Time' },
  { field: 'taxexempt', label: 'Tax Exempt' }
];

editVendor(event: any) {
  console.log('Edit:', event);
}

}