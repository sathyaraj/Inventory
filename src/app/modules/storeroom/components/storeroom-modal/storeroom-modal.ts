import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-storeroom-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './storeroom-modal.html'
})
export class StoreroomModal {

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