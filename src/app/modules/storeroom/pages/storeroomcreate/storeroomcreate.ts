import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-storeroomcreate',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './storeroomcreate.html',
  styleUrl: './storeroomcreate.css',
})
export class Storeroomcreate {
      storeroomForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(){

  this.storeroomForm = this.fb.group({
    storeroomCode:['',Validators.required],
    storeroomName:['',Validators.required],
    organization:['',Validators.required],
    location:[''],
    capacity:[''],
    manager:[''],
    description:['']
  })

}

  get f() {
    return this.storeroomForm.controls;
  }

  save() {
  console.log("save")
    if (this.storeroomForm.invalid) {
      this.storeroomForm.markAllAsTouched();
      return;
    }

    console.log('Form Data:', this.storeroomForm.value);

  }

}
