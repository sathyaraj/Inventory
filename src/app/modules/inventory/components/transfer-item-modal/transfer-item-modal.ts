import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-item-modal',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './transfer-item-modal.html',
  styleUrl: './transfer-item-modal.css',
})
export class TransferItemModal {

  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({

        fromStore:['',Validators.required],
        toStore:['',Validators.required],
        date:['',Validators.required],

        items:this.fb.array([
        this.createItem()
        ])

        });
  }

  createItem():FormGroup{

return this.fb.group({

code:['',Validators.required],
name:['',Validators.required],
available:['',Validators.required],
qty:['',[Validators.required,Validators.min(1)]],
unit:['',Validators.required]

});

}

get items():FormArray{
return this.form.get('items') as FormArray;
}

addRow(){
this.items.push(this.createItem());
}

removeRow(index:number){
this.items.removeAt(index);
}

submit(){

if(this.form.invalid){

this.form.markAllAsTouched();
return;

}

console.log(this.form.value);

}

}
