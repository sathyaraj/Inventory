import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reorder-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reorder-tab.html'
})
export class ReorderTab implements OnInit {

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    if (!this.form) {
      this.form = this.fb.group({});
    }

    this.form.addControl('itemCode', this.fb.control('SRV-001'));
    this.form.addControl('description', this.fb.control('Security Service'));
    this.form.addControl('considerContracts', this.fb.control(false));
    this.form.addControl('leadTime', this.fb.control(0));
    this.form.addControl('runBackground', this.fb.control(false));
    this.form.addControl('items', this.fb.array([]));
    
  }

  // ✅ getter
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  // ✅ Preview data
  preview() {
    this.items.clear();

    const data = [
      { item: 'ITM-001', description: 'Bulb', vendor: 'ABC', qty: 10 },
      { item: 'ITM-002', description: 'Cable', vendor: 'XYZ', qty: 5 }
    ];

    data.forEach(d => {
      this.items.push(this.fb.group({
        item: [d.item],
        description: [d.description],
        vendor: [d.vendor],
        qty: [d.qty]
      }));
    });
  }

  // ✅ Run reorder
  runReorder() {
    console.log('Reorder Data:', this.form.value);
    alert('Reorder Created');
  }

  runReport() {
    alert('Report Generated');
  }
}