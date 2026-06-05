import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';

import { companyFields } from '../../configs/company-fields/company-fields';
import { addressFields } from '../../configs/address-fields/address-fields';
import { subscriptionFields } from '../../configs/subscription-fields/subscription-fields';

import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import {  Building2 } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicForm,
    LucideAngularModule
  ],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company {
  

  // MESSAGE BOX
  showMessageBox = false;

  messageTitle = '';

  messageText = '';

  Building2 = Building2;

  // STEPPER
  currentStep = 1;

  form!: FormGroup;

  // DYNAMIC FIELDS
  companyFields = companyFields;

  addressFields = addressFields;

  subscriptionFields = subscriptionFields;

  // STEPS
  steps = [

    { id: 1, label: 'Company' },

    { id: 2, label: 'Address' },

    { id: 3, label: 'Subscription' },

    { id: 4, label: 'Review' }

  ];

  constructor(
    private fb: FormBuilder,
    private adminMaster: Adminmaster,
    private route: ActivatedRoute
  ) {

    // FORM
    this.form = this.fb.group({

      // COMPANY
      company_name: ['',Validators.required],
      company_code: ['',Validators.required],
      company_email: ['',Validators.required],
      company_phone: ['',Validators.required],
      business_type: ['',Validators.required],
      company_logo: ['',Validators.required],
      company_description: [''],

      // ADDRESS
      address1: ['',Validators.required],
      address2: [''],
      country: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      postal_code: ['',Validators.required],

      // ADMIN
      admin_name: [''],
      admin_email: [''],
      password: [''],
      confirm_password: [''],

      // SUBSCRIPTION
      subscription_plan: ['enterprise'],
      user_limit: [],
      expiry_date: ['']

    });

  }
  isEdit = false;
companyId = 0;

ngOnInit() {

  
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.companyId = +id;

    this.isEdit = true;

    //this.getUserById(this.userId);
      this.getCompany(this.companyId);


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

  // SUBMIT
 submit() {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;
  }

  const formData = new FormData();

  // ID FOR UPDATE
  formData.append(
    'Id',
    this.companyId?.toString() || '0'
  );

  // COMPANY
  formData.append(
    'CompanyName',
    this.form.value.company_name || ''
  );

  formData.append(
    'CompanyCode',
    this.form.value.company_code || ''
  );

  formData.append(
    'CompanyEmail',
    this.form.value.company_email || ''
  );

  formData.append(
    'CompanyPhone',
    this.form.value.company_phone || ''
  );

  formData.append(
    'BusinessType',
    this.form.value.business_type || ''
  );

  // FILE
  if (this.form.value.company_logo instanceof File) {

    formData.append(
      'CompanyLogo',
      this.form.value.company_logo
    );

  }

  formData.append(
    'CompanyDescription',
    this.form.value.company_description || ''
  );

  // ADDRESS
  formData.append(
    'Address1',
    this.form.value.address1 || ''
  );

  formData.append(
    'Address2',
    this.form.value.address2 || ''
  );

  formData.append(
    'Country',
    this.form.value.country || ''
  );

  formData.append(
    'State',
    this.form.value.state || ''
  );

  formData.append(
    'City',
    this.form.value.city || ''
  );

  formData.append(
    'PostalCode',
    this.form.value.postal_code || ''
  );

  // ADMIN
  formData.append(
    'AdminName',
    this.form.value.admin_name || ''
  );

  formData.append(
    'AdminEmail',
    this.form.value.admin_email || ''
  );

  formData.append(
    'Password',
    this.form.value.password || ''
  );

  formData.append(
    'ConfirmPassword',
    this.form.value.confirm_password || ''
  );

  // SUBSCRIPTION
  formData.append(
    'SubscriptionPlan',
    this.form.value.subscription_plan || ''
  );

  formData.append(
    'UserLimit',
    this.form.value.user_limit || ''
  );

  formData.append(
    'ExpiryDate',
    this.form.value.expiry_date || ''
  );

  // API SELECT
  const request = this.isEdit
    ? this.adminMaster.updateCompany(this.companyId, formData)
    : this.adminMaster.createCompany(formData);

  request.subscribe({

    next: (res:any) => {

      this.messageTitle = this.isEdit
        ? 'Updated'
        : 'Success';

      this.messageText = this.isEdit
        ? 'Company Updated Successfully'
        : 'Company Saved Successfully';

      this.showMessageBox = true;

      console.log(res);

      // RESET ONLY CREATE
      if (!this.isEdit) {

        this.form.reset();

        this.currentStep = 1;

      }

    },

    error: (err:any) => {

      this.messageTitle = 'Error';

      this.messageText = this.isEdit
        ? 'Company Update Failed'
        : 'Company Save Failed';

      this.showMessageBox = true;

      console.log(err);

    }

  });

}

getCompany(id:number) {

  this.adminMaster.getCompany(id)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        if (res && res.length > 0) {

          const data = res[0];

          this.isEdit = true;

          this.companyId = data.id;

          this.form.patchValue({

            company_name: data.companyName,
            company_code: data.companyCode,
            company_email: data.companyEmail,
            company_phone: data.companyPhone,
            business_type: data.businessType,

            address1: data.address1,
            address2: data.address2,
            country: data.country,
            state: data.state,
            city: data.city,
            postal_code: data.postalCode,

            subscription_plan:
              data.subscriptionPlan,

            user_limit:
              data.userLimit,

            expiry_date:
              data.expiryDate

          });

          this.currentStep = 4;

        }

      }

    });

}

}