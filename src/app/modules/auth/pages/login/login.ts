import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
loginForm!: FormGroup
  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router, private chr: ChangeDetectorRef){}

  ngOnInit(){

    if (this.authService.isLoggedIn()) {

    this.router.navigate([
      '/admin/dashboard'
    ]);

  }

  //   if (typeof window !== 'undefined') {     
  //     if (localStorage.getItem('token')) {
  //   this.router.navigate(['/admin/item-master']);
  // }
//}

  //      if (this.authService.isLoggedIn()) {
  //   this.router.navigate(['/admin/dashboard']);
  // }

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitted = false;

// onSubmit() {
//   if (this.loginForm.invalid) return;

//   const payload = {
//     email: this.loginForm.value.email,     // FIX 1
//     passwordHash: this.loginForm.value.password // FIX 2
//   };

//   console.log('LOGIN PAYLOAD:', payload);

//   this.authService.login(payload).subscribe({
//    next: (res: any) => {

//   localStorage.setItem('token', res.token);
//   localStorage.setItem('role', res.role);
//   localStorage.setItem('permissions', JSON.stringify(res.permissions));

//   this.authService.saveToken(res.token);

//   this.router.navigate(['/admin/dashboard']);

// },

//   error: (err) => {
//     console.log(err);
//   }
//   });
// }


showMessage = false;
messageText = '';
messageType = '';

onSubmit() {

  this.submitted = true;

  if (this.loginForm.invalid) {

    this.messageType = 'error';

    this.messageText = 'Please enter valid email and password';

    this.showMessage = true;

    return;
  }

  const payload = {

    email: this.loginForm.value.email,

    passwordHash: this.loginForm.value.password

  };


  this.authService.login(payload).subscribe(res => {

this.showMessage = true;

  console.log('LOGIN RESPONSE', res);

      this.authService.saveToken(res.token);

       console.log(
    'TOKEN AFTER SAVE',
    localStorage.getItem('token')
  );


      localStorage.setItem('role', res.role);

      localStorage.setItem(
        'permissions',
        JSON.stringify(res.permissions)
      );

     // this.authService.saveToken(res.token);

      // SUCCESS MESSAGE
      this.messageType = 'success';

      this.messageText = 'Login successful';

      

      setTimeout(() => {

        this.router.navigate([
          '/admin/dashboard'
        ]);

      }, 1000);

     // this.chr.detectChanges()

  });

}

  
  get f() {
  return this.loginForm.controls;
}

// get password() {
//   return this.loginForm.get('password');
// }
}
