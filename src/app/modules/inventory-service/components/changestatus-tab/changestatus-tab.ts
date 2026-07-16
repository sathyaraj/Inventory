import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-changestatus-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './changestatus-tab.html',
  styleUrl: './changestatus-tab.css'
})
export class ChangestatusTab{

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // ✅ form இல்லனா create பண்ணு
    if (!this.form) {
      this.form = this.fb.group({});
    }

    // ✅ controls add பண்ணு
    this.form.addControl('currentStatus', this.fb.control('ACTIVE'));
    this.form.addControl('newStatus', this.fb.control('', Validators.required));
    this.form.addControl('statusDate', this.fb.control(this.getTodayDate()));
    this.form.addControl('memo', this.fb.control(''));
    this.form.addControl('rollToOrg', this.fb.control(false));
  }

  // 📅 today date
  getTodayDate(): string {
    return new Date().toISOString().substring(0, 10);
  }

  // 🔄 change status
  changeStatus() {

    if (this.form.invalid) {
      alert('Please select new status');
      return;
    }

    const data = this.form.value;

    // ❌ same status check
    if (data.currentStatus === data.newStatus) {
      alert('Current status and new status cannot be same');
      return;
    }

    // ❌ invalid flow check
    if (!this.isValidStatusChange(data.currentStatus, data.newStatus)) {
      alert('Invalid status transition');
      return;
    }

    console.log('Status Data:', data);

    // 👉 API call (example)
    // this.service.changeStatus(data).subscribe(res => {
    //   alert('Status updated successfully');
    // });
  }

  // ✅ status rules
  isValidStatusChange(current: string, next: string): boolean {

    const rules: any = {
      ACTIVE: ['INACTIVE', 'OBSOLETE'],
      INACTIVE: ['ACTIVE', 'OBSOLETE'],
      OBSOLETE: []
    };

    return rules[current]?.includes(next);
  }

  // 🔄 reset
  resetForm() {
    this.form.patchValue({
      newStatus: '',
      statusDate: this.getTodayDate(),
      memo: '',
      rollToOrg: false
    });
  }
}