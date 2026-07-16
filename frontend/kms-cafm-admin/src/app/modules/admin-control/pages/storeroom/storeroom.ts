import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { LucideAngularModule } from 'lucide-angular';
import {  Building2, User } from 'lucide-angular';
import { storeroomBasicFields } from '../../configs/storeroom-basic-fields/storeroom-basic-fields';
import { storeroomContactFields } from '../../configs/storeroom-contact-fields/storeroom-contact-fields';
//import { storeroomCostFields } from '../../configs/storeroom-cost-fields/storeroom-cost-fields';
//import { storeroomStatusFields } from '../../configs/storeroom-status-fields/storeroom-status-fields';
//import { Master } from '../../../../core/services/master';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { ActivatedRoute, Router } from '@angular/router';
import { addressFields } from '../../configs/address-fields/address-fields';
import {
  Country,
  State,
  City
} from 'country-state-city';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { UnsavedChangesService } from '../../../../core/services/unsaved-changed';


@Component({
  selector: 'app-storeroom',
  imports: [CommonModule,ReactiveFormsModule,DynamicForm,LucideAngularModule, MessageBox],
  templateUrl: './storeroom.html',
  styleUrl: './storeroom.css',
})
export class Storeroom {

  countries: any[] = [];
states: any[] = [];
cities: any[] = [];

    // MESSAGE BOX
  showMessageBox = false;

  messageTitle = '';

  messageText = '';

    Building2 = Building2;
  user = User;
  // STEPPER
  currentStep = 1;

  form!: FormGroup;

  basicInformationFields = storeroomBasicFields;
  contactInformationFields = storeroomContactFields;
  //costInformationFields = storeroomCostFields;
  addressInformationFields = addressFields;


  steps = [
  { id: 1, label: 'Basic Information' },
  { id: 2, label: 'Address Information' },
  { id: 3, label: 'Contact Information' },
  //{ id: 4, label: 'Cost Information' },
  { id: 4, label: 'Review' }

];

constructor(private fb:FormBuilder, private adminMaster: Adminmaster,private router: Router, private route: ActivatedRoute, private chr:ChangeDetectorRef, private unsavedService:UnsavedChangesService){
  this.form = this.fb.group({

  // Basic Information
  storeroomCode: ['', Validators.required],
  storeroomName: ['', Validators.required],
  description: [''],
  site: ['', Validators.required],
  building: [''],
  floor: [''],
  location: [''],
  warehouseType: [''],

   // ADDRESS
  address1: ['',Validators.required],
  address2: [''],
  country: [null,Validators.required],
  state: [null,Validators.required],
  city: [null,Validators.required],
  postal_code: ['',Validators.required],

  // Contact Information
  contactPerson: [''],
  contactNumber: [''],
  mobileNumber: [''],
  email: [''],
  department: [''],
  supervisor: [''],

  // Cost Information
  // costCenter: [''],
  // budgetCode: [''],
  // currency: [''],
  // standardCost: [0],
  // inventoryValue: [0],
  // accountingCode: [''],
  // taxGroup: [''],

  // Status
  status: ['Active'],

});
}


ngOnInit() {

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.isEdit = true;

    this.storeroomId = +id;

    this.getStoreroom(this.storeroomId);

  }

   this.countries = Country.getAllCountries();

  const countryField =
    this.addressInformationFields.find(
      x => x.controlName === 'country'
    );

  if (countryField) {

    countryField.options =
      this.countries.map(c => ({
        label: c.name,
        value: c.isoCode
      }));

  }

     this.form.valueChanges.subscribe(() => {
  this.unsavedService.setDirty(this.form.dirty);
});

}

onCountryChange(countryCode: string) {

  console.log('Country:', countryCode);

  this.states =
    State.getStatesOfCountry(countryCode);

    console.log('States:', this.states);

  const stateField =
    this.addressInformationFields.find(
      x => x.controlName === 'state'
    );

  if (stateField) {

    stateField.options =
      this.states.map(s => ({
        label: s.name,
        value: s.isoCode
      }));
       this.chr.detectChanges();
  console.log(stateField.options);
  }

  this.form.patchValue({
    state: '',
    city: ''
  });

}

onStateChange() {

  const countryCode =
    this.form.get('country')?.value;

  const stateCode =
    this.form.get('state')?.value;

  this.cities =
    City.getCitiesOfState(
      countryCode,
      stateCode
    );

  const cityField =
    this.addressInformationFields.find(
      x => x.controlName === 'city'
    );

  if (cityField) {

    cityField.options =
      this.cities.map(c => ({
        label: c.name,
        value: c.name
      }));

  }

}

 // NEXT STEP
  nextStep() {

    if (this.currentStep < this.steps.length) {

      this.currentStep++;

    }

  }

  // PREVIOUS STEP
  prevStep() {

    if (this.currentStep > 1) {

      this.currentStep--;

    }

  }

  // FILE CHANGE
  onFileChange(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.form.patchValue({

        company_logo: file

      });

    }

  }


isEdit = false;
storeroomId = 0;

submit() {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  const payload = {

    id: this.storeroomId || 0,

    // Basic Information
    storeroomCode: this.form.value.storeroomCode,
    storeroomName: this.form.value.storeroomName,
    description: this.form.value.description,
    site: this.form.value.site,
    building: this.form.value.building,
    floor: this.form.value.floor,
    location: this.form.value.location,
    warehouseType: this.form.value.warehouseType,

    //address Information
     // ADDRESS
    Address1: this.form.value.address1, 
    Address2: this.form.value.address2,
    Country : this.form.value.country,
    State: this.form.value.state,
    City:this.form.value.city,
    PostalCode:this.form.value.postal_code,

    // Contact Information
    contactPerson: this.form.value.contactPerson,
    contactNumber: this.form.value.contactNumber,
    mobileNumber: this.form.value.mobileNumber,
    email: this.form.value.email,
    department: this.form.value.department,
    supervisor: this.form.value.supervisor,

    // Cost Information
    // costCenter: this.form.value.costCenter,
    // budgetCode: this.form.value.budgetCode,
    // currency: this.form.value.currency,
    // standardCost: this.form.value.standardCost,
    // inventoryValue: this.form.value.inventoryValue,
    // accountingCode: this.form.value.accountingCode,
    // taxGroup: this.form.value.taxGroup,

    // Status
    isActive: this.form.value.status,
    // isMainStoreroom: this.form.value.isMainStoreroom,
    // allowNegativeStock: this.form.value.allowNegativeStock,
    // autoReorder: this.form.value.autoReorder,
    // remarks: this.form.value.remarks

  };

  const request = this.isEdit
    ? this.adminMaster.updateStoreroom(this.storeroomId, payload)
    : this.adminMaster.createStoreroom(payload);

  request.subscribe({

    next: (res: any) => {
      this.messageTitle = this.isEdit
        ? 'Updated'
        : 'Success';

      this.messageText = this.isEdit
        ? 'Storeroom Updated Successfully'
        : 'Storeroom Saved Successfully';
        
            this.chr.detectChanges()

      this.showMessageBox = true;

      if (!this.isEdit) {

        this.form.reset();

      }

    },

    error: (err: any) => {

      this.messageTitle = 'Error';

      this.messageText = this.isEdit
        ? 'Storeroom Update Failed'
        : 'Storeroom Save Failed';

      this.showMessageBox = true;

      console.log(err);

    }

  });

}


getStoreroom(id: number) {

  this.adminMaster.getStoreroom(id)
    .subscribe({

      next: (res: any) => {

        if (res) {

          this.isEdit = true;

          this.storeroomId = res.id;

           this.loadStates(res.country);

              setTimeout(() => {

                this.form.patchValue({
                  country: res.country,
                  state: res.state
                });

                this.loadCities(res.state);

                this.form.patchValue({
                  city: res.city
                });

              }, 100);


          this.form.patchValue({

            storeroomCode: res.storeroomCode,
            storeroomName: res.storeroomName,
            description: res.description,
            site: res.site,
            building: res.building,
            floor: res.floor,
            location: res.location,
            warehouseType: res.warehouseType,

            address1: res.address1,
            address2: res.address2,
            country: res.country,
            
            postal_code: res.postalcode,

            contactPerson: res.contactPerson,
            contactNumber: res.contactNumber,
            mobileNumber: res.mobileNumber,
            email: res.email,
            department: res.department,
            supervisor: res.supervisor,

            // costCenter: res.costCenter,
            // budgetCode: res.budgetCode,
            // currency: res.currency,
            // standardCost: res.standardCost,
            // inventoryValue: res.inventoryValue,
            // accountingCode: res.accountingCode,
            // taxGroup: res.taxGroup,

            status: res.isActive,
            // isMainStoreroom: res.isMainStoreroom,
            // allowNegativeStock: res.allowNegativeStock,
            // autoReorder: res.autoReorder,
            // remarks: res.remarks

          });

        }

      }

    });

}

loadStates(countryCode: string) {

  this.states = State.getStatesOfCountry(countryCode);

  console.log('Form State:', this.form.get('state')?.value);

  const stateField =
    this.addressInformationFields.find(
      x => x.controlName === 'state'
    );
    console.log('State Options:', stateField?.options);

  if (stateField) {

    stateField.options =
      this.states.map(s => ({
        label: s.name,
        value: s.isoCode
      }));

  }

}

loadCities(stateCode: string) {

  const countryCode =
    this.form.get('country')?.value;

  this.cities =
    City.getCitiesOfState(
      countryCode,
      stateCode
    );

  const cityField =
    this.addressInformationFields.find(
      x => x.controlName === 'city'
    );

  if (cityField) {

    cityField.options =
      this.cities.map(c => ({
        label: c.name,
        value: c.name
      }));

  }

}

onFieldAction(event: any) {

  switch(event.action) {

    case 'loadStates':
      this.loadStates(event.value);
      break;

    case 'loadCities':
      this.loadCities(event.value);
      break;
  }

}

confirmredirect()
{
    this.router.navigate(['/admin/admin-control/storeroomlist']);

}


}
