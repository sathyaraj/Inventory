import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

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
    private router: Router){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitted = false;

  

// onSubmit() {
//   this.submitted = true;
//   //this.router.navigate(['/admin/item-master'])

//   if (this.loginForm.invalid) return;

//   this.authService.login(this.loginForm.value).subscribe((res:any)=> {
//     this.authService.saveToken(res.token)
//     this.router.navigate(['/admin/item-master']) // ⚠️ also fix route name
//   });
// }

loading = false;

onSubmit() {

  this.submitted = true;

  if (this.loginForm.invalid) return;

  this.loading = true;

  this.authService
    .login(this.loginForm.value)
    .subscribe({

      next: (res:any) => {

        this.authService
          .saveToken(res.token);

        this.router.navigate([
          '/admin/item-master'
        ]);

        this.loading = false;

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

}

  
  get f() {
  return this.loginForm.controls;
}

// get password() {
//   return this.loginForm.get('password');
// }


} 
