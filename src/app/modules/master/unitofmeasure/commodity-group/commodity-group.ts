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
  selector: 'app-commodity-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commodity-group.html',
})
export class CommodityGroup {

  form!: FormGroup;
  expandedIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      commodityGroups: this.fb.array([])
    });
  }

  // ✅ getter
  get commodityGroups(): FormArray {
    return this.form.get('commodityGroups') as FormArray;
  }

  // ✅ create group
  createGroup(): FormGroup {
    return this.fb.group({
      commodityGroup: ['', Validators.required],
      useForService: [false],
      codes: this.fb.array([])
    });
  }

  // ✅ create code row
  createCode(): FormGroup {
    return this.fb.group({
      commodityCode: ['', Validators.required],
      useForService: [false]
    });
  }

  // ✅ add group
  addGroup() {
    this.commodityGroups.push(this.createGroup());
    this.expandedIndex = this.commodityGroups.length - 1;
  }

  // ✅ delete group
  deleteGroup(index: number) {
    this.commodityGroups.removeAt(index);
  }

  // ✅ toggle
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  // ✅ codes getter
  getCodes(groupIndex: number): FormArray {
    return this.commodityGroups.at(groupIndex).get('codes') as FormArray;
  }

  // ✅ add code
  addCode(groupIndex: number) {
    this.getCodes(groupIndex).push(this.createCode());
  }

  // ✅ delete code
  deleteCode(groupIndex: number, codeIndex: number) {
    this.getCodes(groupIndex).removeAt(codeIndex);
  }

  // ✅ save
  saveGroup(index: number) {
    console.log(this.commodityGroups.at(index).value);
  }
}