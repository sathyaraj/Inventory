import {
  Component,
  HostListener,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  LucideAngularModule
} from 'lucide-angular';

import {
  DatePickerComponent
} from '../components/date-picker/date-picker';
import { Master } from '../../core/services/master';

import { ServiceitemTab } from '../../modules/inventory-service/components/serviceitem-tab/serviceitem-tab';
import { ServiceCreate } from '../../modules/inventory-service/pages/service-create/service-create';


@Component({
  selector: 'app-admindynamic-form',
  imports: [CommonModule,ReactiveFormsModule,LucideAngularModule],
  templateUrl: './admindynamic-form.html',
  styleUrl: './admindynamic-form.css',
})
export class AdmindynamicForm {

   requiredValidator = Validators.required;

  @Input() form!: FormGroup;

  @Input() fields: any[] = [];

  groups=[];

  showGroupDropdown = false;
filteredGroups: any[] = [];

  constructor(private adminMaster:Master, private servicetab: ServiceitemTab,private serviceCreate: ServiceCreate){}

  ngOnInit() : void{

  //this.filterGroups(Event, type)

}

  onFileChange(event: any, controlName: string) {

    const file = event.target.files[0];

    if (file) {

      this.form.patchValue({
        [controlName]: file
      });

    }

  }



onGroupFocus() {
  
  this.filteredGroups = [...this.groups];
  this.showGroupDropdown = true;

}

 id: number = 0;

filterGroups(event: Event, type: string) {

  const value = (event.target as HTMLInputElement).value.toLowerCase();

  if (type === 'commodityGroup') {
    this.id = 1;
  } else if (type === 'orderunit') {
    this.id = 3;
  }

    console.log(this.id)


  this.adminMaster.getMastersById(this.id).subscribe((res: any) => {

    this.groups = res;

    this.filteredGroups = this.groups.filter((group: any) =>
      (group.name || '').toLowerCase().includes(value)
    );

    this.showGroupDropdown = true;
  });
}

// selectGroup(group: any) {

//   this.form.patchValue({

//     commodityGroup: group.name,

//     commodityCode: group.code

//   });

//   this.showGroupDropdown = false;

// }

selectGroup(group:any){

  this.servicetab.selectGroup(group)
  this.showGroupDropdown = false;

}

// openCommodityHandler(type: string) {
//   this.ItemCreate.openCommodityHandler(type)
//   //this.ItemCreate.opencommodity(type)
// }


closeDropdown() {

  setTimeout(() => {

    this.showGroupDropdown = false;

  }, 200);

}

openCommodityHandler(controlName: string) {
  this.serviceCreate.openCommodityHandler(controlName)
}

@HostListener('document:click', ['$event'])
clickOutside(event: any){

 if(!event.target.closest('.dropdown-wrapper')){
   this.showGroupDropdown = false;
 }

}


}
