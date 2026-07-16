import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-return-item-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './return-item-modal.html',
  styleUrl: './return-item-modal.css',
})
export class ReturnItemModal {
  form : FormGroup;
  constructor (private fb: FormBuilder){
     this.form = this.fb.group({
      storeroom: ['', Validators.required],
      returnFrom: ['', Validators.required],
      date: ['', Validators.required],
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {

    return this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      issuedQty: ['', Validators.required],
      returnQty: ['', [Validators.required, Validators.min(1)]],
      condition: ['', Validators.required],
      remarks: ['']
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
