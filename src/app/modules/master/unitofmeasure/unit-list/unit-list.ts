import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unit-list.html',
})
export class UnitList {

  form!: FormGroup;
  expandedIndex: number | null = null;

  // ✅ UOM dropdown list
  uomList = ['KG', 'GRAM', 'LITER', 'ML', 'BOX', 'NOS'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      itemCode: [''],
      itemName: [''],
      conversions: this.fb.array([])
    });
  }

  // ✅ getter
  get conversions(): FormArray {
    return this.form.get('conversions') as FormArray;
  }

  // ✅ create row
  createRow(): FormGroup {
    return this.fb.group({
      fromUom: ['', Validators.required],
      toUom: ['', Validators.required],
      factor: [1, Validators.required],
      baseQty: [1],
      convertedQty: [{ value: 1, disabled: true }]
    });
  }

  // ✅ add row
  addRow() {
    this.conversions.push(this.createRow());
    this.expandedIndex = this.conversions.length - 1;
  }

  // ✅ delete
  deleteRow(index: number) {
    this.conversions.removeAt(index);
  }

  // ✅ toggle edit
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  // ✅ auto calculation
  calculate(index: number) {
    const row = this.conversions.at(index);

    const qty = row.get('baseQty')?.value || 0;
    const factor = row.get('factor')?.value || 1;

    const result = qty * factor;

    row.get('convertedQty')?.setValue(result, { emitEvent: false });
  }

  // ✅ save
  saveRow(index: number) {
    const data = this.conversions.at(index).getRawValue();
    console.log('Saved:', data);
  }
}