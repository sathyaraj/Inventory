import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostcodeTab } from '../../components/costcode-tab/costcode-tab';
import { LucideAngularModule,List,Coins,Settings } from 'lucide-angular';
import { Master } from '../../../../core/services/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-costcode',
  imports: [CommonModule,ReactiveFormsModule,CostcodeTab,LucideAngularModule],
  templateUrl: './costcode.html',
  styleUrl: './costcode.css',
})
export class Costcode {
    list = List;
Coins =Coins;
Settings=Settings;
constructor(private fb: FormBuilder, private masterService : Master, private router : Router ) {}

 itemForm!: FormGroup;

   ngOnInit(): void {
 
 this.itemForm = this.fb.group({
 
   Costcode: this.fb.group({
 
     costCodeNo: [''],
     costCodeName: [''],
     description: [''],
     isActive: ['']
 
   })
 
 });
   
   }

   get costcodeForm(): FormGroup{
  return this.itemForm.get('costcode') as FormGroup;
}
activeTab: string = 'costcode';

changeTab(tab: string) {
  console.log("TAB:", tab);
  
this.activeTab = tab;
}

costcodelist()
{
           this.router.navigate(['/admin/admin-control/costcodelist']);
}


}
