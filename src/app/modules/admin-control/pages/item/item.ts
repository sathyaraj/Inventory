import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { Router } from '@angular/router';
import { CurrencyTab } from '../../components/currency-tab/currency-tab';
import { LucideAngularModule } from 'lucide-angular';
import {List,Coins,Settings} from 'lucide-angular';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CurrencyTab, LucideAngularModule],
  templateUrl: './item.html'
})
export class Item {
list = List;
Coins =Coins;
Settings=Settings;
  constructor(private fb: FormBuilder, private masterService: Master,private router: Router) {}

 itemForm!: FormGroup;

  ngOnInit(): void {

this.itemForm = this.fb.group({

  currency: this.fb.group({

    currencyCode: [''],
    currencyName: [''],
    symbol: [''],
    exchangeRate: [''],
    decimalPlaces: [''],
    status: ['']

  }),

});
  
  }

  currencylist()
  {
         this.router.navigate(['/admin/admin-control/currencylist']); 
  }

//   get itemsettingForm(): FormGroup {
//   return this.itemForm.get('itemsetting') as FormGroup;
// }

get currencyForm(): FormGroup{
  return this.itemForm.get('currency') as FormGroup;
}

activeTab: string = 'currency';

changeTab(tab: string) {
  console.log("TAB:", tab);
  

this.activeTab = tab;
}

}