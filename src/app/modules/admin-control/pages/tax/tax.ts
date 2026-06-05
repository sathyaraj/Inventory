import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicTable } from '../../../../shared/dynamic-table/dynamic-table';
import { Router } from '@angular/router';
import { TaxTab } from '../../components/tax-tab/tax-tab';
import { LucideAngularModule } from 'lucide-angular';
import { Settings,List,Coins } from 'lucide-angular';

@Component({
  selector: 'app-tax',
  imports: [CommonModule,ReactiveFormsModule,TaxTab, LucideAngularModule],
  templateUrl: './tax.html',
  styleUrl: './tax.css',
})
export class Tax {

  Settings =Settings;
  list = List;
  Coins = Coins;

    constructor(private fb: FormBuilder,private router: Router) {}

     itemForm!: FormGroup;

       ngOnInit(): void {

       this.itemForm = this.fb.group({

              tax: this.fb.group({

                taxName: [''],
                taxCode: [''],
                taxType: [''],
                taxPercentage: [''],
                effectiveDate: [''],
                status: ['']

              }),

            });


       }

get taxForm(): FormGroup{
  return this.itemForm.get('tax') as FormGroup;
}
activeTab: string = 'tax';

changeTab(tab: string) {
  console.log("TAB:", tab);
  

this.activeTab = tab;
}

taxlist()
{
           this.router.navigate(['/admin/admin-control/taxlist']); 
}


}
