import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Settings,List,Coins } from 'lucide-angular';
import { CommoditygroupTap } from '../../components/commoditygroup-tap/commoditygroup-tap';
import { UnsavedChangesService } from '../../../../core/services/unsaved-changed';
import { Observable } from 'rxjs';
import { MessageBox } from '../../../../shared/message-box/message-box';


@Component({
  selector: 'app-commoditygroup',
  imports: [CommonModule,ReactiveFormsModule,LucideAngularModule, CommoditygroupTap, MessageBox],
  templateUrl: './commoditygroup.html',
  styleUrl: './commoditygroup.css',
})
export class Commoditygroup {
   Settings =Settings;
  list = List;
  Coins = Coins;

  constructor(private fb: FormBuilder,private router : Router, private unsavedService:UnsavedChangesService){}

      itemForm!: FormGroup;

      ngOnInit(): void {

       this.itemForm = this.fb.group({

              Commoditygroup: this.fb.group({
                commoditygroup: [''],
                commoditycode: [''],
                status: ['']
              }),

            });

          this.itemForm.valueChanges.subscribe(() => {
  this.unsavedService.setDirty(this.itemForm.dirty);
});
            
       }

get commoditygroupForm(): FormGroup{
  return this.itemForm.get('commoditygroup') as FormGroup;
}

activeTab: string = 'commoditygroup';

changeTab(tab: string) {
  console.log("TAB:", tab);
this.activeTab = tab;
}

commoditygrouplist()
{
           this.router.navigate(['/admin/admin-control/commoditygrouplist']); 
}

}
