import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../../shared/dynamic-form/dynamic-form';
import { personalFields } from '../../configs/personal-fields/personal-fields';
import { contactFields } from '../../configs/contact-fields/contact-fields';
import { roleFields } from '../../configs/role-fields/role-fields';
import { getSecurityFields } from '../../configs/security-fields/security-fields';
import { Adminmaster } from '../../../../core/services/adminmaster';
import { LucideAngularModule } from 'lucide-angular';
import { User } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBox } from '../../../../shared/message-box/message-box';
import { FieldConfig } from '../../validators/input-interface';

@Component({
  selector: 'app-userdetails',
  imports: [CommonModule, ReactiveFormsModule,DynamicForm, LucideAngularModule, MessageBox],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
})
export class Userdetails {

  showMessageBox = false;
 messageTitle = '';
 messageText = '';
  user = User;
  currentStep = 1;
   form!: FormGroup;

   personalFields = personalFields;
   contactFields = contactFields;
   roleFields = roleFields;
  //this.fields = getSecurityFields(this.roles);

   steps = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  // { id: 3, label: 'role' },
  { id: 3, label: 'security' },
  { id: 4, label: 'Review' }
];

 constructor(private fb: FormBuilder, private adminMaster: Adminmaster, private route: ActivatedRoute,private router: Router, private chr: ChangeDetectorRef) {

 this.form = this.fb.group({

  // PERSONAL INFORMATION
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  Employeeid: ['', Validators.required],
  Gender: ['', Validators.required],

  // CONTACT
  email: ['', [Validators.required, Validators.email]],

  phone: [
    '',
    [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]
  ],

  alternatephone: [
    '',
    Validators.pattern('^[0-9]{10}$')
  ],

  country: ['', Validators.required],

  city: ['', Validators.required],

  // SECURITY
  username: ['', Validators.required],

  password: ['', Validators.required],

  PasswordHash: ['', Validators.required],
  role: ['', Validators.required]

}, {
  validators: this.passwordMatchValidator
});

  }
userId: number = 0;
isEdit = false;

  roles: any[] = [];

  // SELECTED ROLE
  selectedRole: any = null;


  fields: FieldConfig[] = [];

  ngOnInit() {

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.userId = +id;

    this.isEdit = true;

    this.getUserById(this.userId);

  }

  this.getRoles();



}

nextStep() {

    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }

  }

  prevStep() {

    if (this.currentStep > 1) {
      this.currentStep--;
    }

  }

 submit() {

  if (this.form.invalid) return;

  const formData = this.form.value;

  const request = this.isEdit
    ? this.adminMaster.updateUser(this.userId, formData)
    : this.adminMaster.createUserDetail(formData);

  request.subscribe({
    next: (res) => {

      this.messageTitle = 'Success';
      this.messageText = this.isEdit
        ? 'User Updated Successfully'
        : 'User Created Successfully';

      this.showMessageBox = true;

      // optional refresh or redirect
      // this.router.navigate(['/users']);

    },

    error: (err) => {

      this.messageTitle = 'API Error';

      this.messageText =
        err?.error?.message || 'Server not reachable';

      this.showMessageBox = true;
    }
  });
}

confirm()
{
    this.router.navigate(['/admin/admin-control/UserDetails', this.userId]);

}

 getRoles() {

    this.adminMaster.getRoles().subscribe({

  next: (res: any) => {

    this.roles = res?.data ?? res ?? [];

    this.fields = getSecurityFields(this.roles);

  },

  error: (err) => {
    console.log(err);
  }

});

  }




passwordMatchValidator(form: FormGroup) {

  const password = form.get('password')?.value;

  const confirmPassword =
    form.get('PasswordHash')?.value;

  if (password !== confirmPassword) {

    form.get('PasswordHash')
      ?.setErrors({ passwordMismatch: true });

  } else {

    form.get('PasswordHash')
      ?.setErrors(null);

  }

  return null;

}

getUserById(id: number) {

  this.adminMaster.getUserById(id)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.form.patchValue({

          FirstName: res.firstName,
          LastName: res.lastName,
          Employeeid: res.employeeId,
          Gender: res.gender,
          dob: res.dob,
          //ProfileImage: res.profileImage,

          email: res.email,
          phone: res.phone,
          alternatephone: res.alternatePhone,

          address1: res.address1,
          address2: res.address2,
          country: res.country,
          city: res.city,

          role: res.role,
          //Permissions: res.permissions,
          //IsActive: res.isActive,

          username: res.username,
          password: res.password,
          PasswordHash: res.confirmPassword

        });

      },

      error: (err) => {

        console.log(err);

      }

    });

}


}
