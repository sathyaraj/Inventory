import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Search, Save, Plus} from 'lucide-angular';
import { serviceFields } from '../../configs/servicebasic-fields/servicebasic-fields';
import { AdmindynamicForm } from '../../../../shared/admindynamic-form/admindynamic-form';
import { taxAccountingFields } from '../../configs/servicetax-fields/servicetax-fields';
import { configurationFields } from '../../configs/serviceconfig-fields/serviceconfig-fields';
import { servicecontrolFields } from '../../configs/servicecontrol-fields/servicecontrol-fields';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ServiceItem } from '../../pages/service-item/service-item';
import { EventEmitter, Output } from '@angular/core';
import { Master } from '../../../../core/services/master';
import { ServiceCreate } from '../../pages/service-create/service-create';
import { Adminmaster } from '../../../../core/services/adminmaster';

@Component({
  selector: 'app-serviceitem-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, AdmindynamicForm],
  templateUrl: './serviceitem-tab.html',
  styleUrl: './serviceitem-tab.css',
})
export class ServiceitemTab {

  @Output() openCommodity = new EventEmitter<string>();

commodityCodes: any[] = [];
commodityGroups: any[] = [];

  @Input() form!: FormGroup;

  search = Search;
  saveIcon = Save;
  plus = Plus;

  expandedIndex: number | null = null;

  fields = serviceFields;
  taxfields = taxAccountingFields;
  configfields = configurationFields;
  controlfields = servicecontrolFields;

  constructor(private fb: FormBuilder,private serviceCreate : ServiceCreate,private adminMaster:Adminmaster, private masterService: Master,@Inject(PLATFORM_ID) private platformId: object) {}

 ngOnInit(): void {

  this.setitemlastid()

  this.form.addControl(
    'serviceCode',
    this.fb.control('', Validators.required)
  );

  this.form.addControl(
    'serviceName',
    this.fb.control('', Validators.required)
  );

  this.form.addControl(
    'serviceSet',
    this.fb.control('')
  );

  const allFields = [
    ...serviceFields,
    ...taxAccountingFields,
    ...configurationFields,
    ...servicecontrolFields
  ];

  allFields.forEach(field => {

    if (!this.form.contains(field.controlName)) {

      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      this.form.addControl(
        field.controlName,
        this.fb.control(
          field.type === 'toggle' ? false : '',
          validators
        )
      );
    }

  });

}

 selectedGroupName = '';
 showGroupDropdown = false;

 selectGroup(group: any) {
  console.log(group)
  this.form.patchValue({ commodityGroup: group.name,commodityCode: group.description
 });
  this.selectedGroupName = group.name;
  this.showGroupDropdown = false;

}

@HostListener('document:click', ['$event'])
clickOutside(event: any){



 if(!event.target.closest('.dropdown-wrapper')){
   this.showGroupDropdown = false;
 }

}

openCommodityHandler(type: string) {
this.serviceCreate.openCommodityHandler(type)
}


showmeterDropdown = false;
meterCodes: any[] = [];

filteredGroups: any[] = [];
filteredmeter: any[] = [];

selectedmeterName = '';


loadCommodityCodes(groupId: number) {

  if (!groupId) return;

  this.masterService.getMastersById(groupId)
    .subscribe((res: any) => {
      this.commodityCodes = res.data || res || [];
    });

}

loadCommodityGroups() {
  this.masterService.getMastersById(1).subscribe((res: any) => {
    this.commodityGroups = res.data || res || [];
    this.filteredGroups = [...this.commodityGroups];
  });
}

itemlastId: number = 0;


setitemlastid() {

  this.adminMaster.getitemlastId().subscribe((res: any) => {

    const lastId = Number(res?.lastId || 0);

    console.log(lastId)

    const itemSetValue = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('ItemSetValue') || ''
      : '';

    const finalValue = itemSetValue
      ? itemSetValue
      : 'SERVICE-' + (lastId + 1).toString().padStart(5, '0');

    setTimeout(() => {
      this.form?.patchValue(
        { serviceSet: finalValue },
        { emitEvent: false }
      );
    });

  });
}





}