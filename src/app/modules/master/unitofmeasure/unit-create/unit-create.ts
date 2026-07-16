import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unit-create.html',
  styleUrl: './unit-create.css',
})
export class UnitCreate implements OnInit {
form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      unit: ['', Validators.required],
      abbreviation: [''],
      description: ['']
    });
  }

  // ✅ Save
  save() {
    if (this.form.invalid) {
      alert('Unit is required');
      return;
    }

    console.log('UOM Data:', this.form.value);

    // API call here
    alert('Unit Created Successfully');
  }

  // ✅ Reset
  resetForm() {
    this.form.reset();
  }
}
