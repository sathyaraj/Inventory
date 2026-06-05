import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reorder-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reorder-modal.html',
  styleUrl: './reorder-modal.css',
})
export class ReorderModal {
  form: FormGroup

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      storeroom: ['', Validators.required],
      reorderDate: ['', Validators.required],
      vendor: ['', Validators.required],
      items: this.fb.array([this.createItem()])
    });
  }

   createItem(): FormGroup {
    return this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      currentStock: ['', Validators.required],
      minLevel: ['', Validators.required],
      reorderQty: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required]
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addRow() {
    this.items.push(this.createItem());
  }

  removeRow(index: number) {
    this.items.removeAt(index);
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }


}
