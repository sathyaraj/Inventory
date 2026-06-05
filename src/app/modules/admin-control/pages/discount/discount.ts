import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { Router } from '@angular/router';
import { DiscountTab } from '../../components/discount-tab/discount-tab';
import { dateRangeValidator } from '../../validators/date-range.validators';
import { LucideAngularModule } from 'lucide-angular';
import {List,Coins,Settings} from 'lucide-angular';

@Component({
  selector: 'app-discount',
  imports: [CommonModule, ReactiveFormsModule,DiscountTab,LucideAngularModule],
  templateUrl: './discount.html',
  styleUrl: './discount.css',
})
export class Discount {
  list = List;
Coins =Coins;
Settings=Settings;
  constructor(private fb: FormBuilder, private masterService: Master,private router: Router) {}

 itemForm!: FormGroup;
  ngOnInit(): void {

this.itemForm = this.fb.group({

  discount: this.fb.group({

    discountName: [''],
    discountType: [''],
    discountValue: [''],
    minimumOrderAmount: [''],
    startDate: [''],
     endDate: [''],
    status: ['']

  }, {
    validators: [
      dateRangeValidator('startDate', 'endDate')
    ]
  })

});
  
  }

get discountForm(): FormGroup{
  return this.itemForm.get('discount') as FormGroup;
}
activeTab: string = 'discount';

changeTab(tab: string) {
  console.log("TAB:", tab);
  

this.activeTab = tab;
}

discountlist()
{
           this.router.navigate(['/admin/admin-control/discountlist']); 
}

}
