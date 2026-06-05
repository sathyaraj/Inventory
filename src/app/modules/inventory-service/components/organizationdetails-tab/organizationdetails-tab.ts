import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-organizationdetails-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './organizationdetails-tab.html',
  styleUrl: './organizationdetails-tab.css',
})
export class OrganizationdetailsTab {
  @Input() form!: FormGroup


  expandedIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {  
   
      // Add parent form controls
      this.form.addControl('serviceitemCode', this.fb.control(''));
      this.form.addControl('serviceitemName', this.fb.control(''));
      //this.form.addControl('organizationDetails', this.fb.array([]));

    if (this.form) {
    // ✅ FormArray create
    if (!this.form.get('organizationDetails')) {
      this.form.addControl(
        'organizationDetails',
        this.fb.array([])
      );
    }
  }

  }

  get organizationDetails(): FormArray {
  return this.form.get('organizationDetails') as FormArray;
}

// Create row
createOrg(): FormGroup {
  return this.fb.group({
    organization: [''],
    glAccount: [''],
    taxCode: [''],
    taxExempt: [false],
    receiptTolerance: [0]
  });
}

// Add
addOrg() {
  this.organizationDetails.push(this.createOrg());
  this.expandedIndex = this.organizationDetails.length - 1;
}

// Toggle
toggleDetails(index: number) {
  this.expandedIndex = this.expandedIndex === index ? null : index;
}

// Save
saveOrg(index: number) {
  console.log(this.organizationDetails.at(index).value);
}

// Delete
deleteOrg(index: number) {
  this.organizationDetails.removeAt(index);
}

}
