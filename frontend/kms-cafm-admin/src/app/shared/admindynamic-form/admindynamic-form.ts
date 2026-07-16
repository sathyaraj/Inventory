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

  activeControl: string = '';

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



onGroupFocus(controlName: string) {
  this.activeControl = controlName;

  if (controlName === 'commodityGroup') {
    this.id = 1;
  } else if (controlName === 'orderunit') {
    this.id = 3;
  }

  this.adminMaster.getMastersById(this.id).subscribe((res: any) => {
    this.groups = res;
    this.filteredGroups = res;
    this.showGroupDropdown = true;
  });
}

 id: number = 0;

filterGroups(event: Event, controlName: string) {
  this.activeControl = controlName;

  const value = (event.target as HTMLInputElement).value.toLowerCase();

  const id = controlName === 'commodityGroup' ? 1 : 3;

  this.adminMaster.getMastersById(id).subscribe((res: any) => {
    this.groups = res;

    this.filteredGroups = res.filter((g: any) =>
      (g.name || '').toLowerCase().includes(value)
    );

    this.showGroupDropdown = true;
  });
}



selectedControl = '';


selectGroup(group: any,type:string) {

  const control = type;

  if (control === 'commodityGroup' || control === 'orderunit') {
     this.form.get('serviceitem')?.patchValue({
    commodityGroup: group.name,
    commodityCode: group.description,
  });
  }

  this.showGroupDropdown = false;
}


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
