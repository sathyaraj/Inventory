import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addstoreroom-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addstoreroom-modal.html',
  styleUrl: './addstoreroom-modal.css',
})
export class AddstoreroomModal {
form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      storeroom: [''],
      date: [''],
      items: this.fb.array([this.createItem()])
    });

  }

  createItem(): FormGroup {
    return this.fb.group({
      code: [''],
      name: [''],
      qty: [''],
      unit: [''],
      cost: ['']
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

  save() {
    console.log(this.form.value);
  }

}
