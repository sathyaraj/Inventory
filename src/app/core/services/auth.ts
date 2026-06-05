import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = 'https://localhost:7108/api';

  // LOGIN
  // login(data: any) {

  //   return this.http.post(
  //     `${this.baseUrl}/auth/login`,
  //     data
  //   );

  // }

 login(data: any):Observable<any>{
  return this.http.post(`${this.baseUrl}/UserDetail/login`, data);
}

  // SAVE TOKEN
  saveToken(token: string): void {

    if (typeof window !== 'undefined') {

      localStorage.setItem('token', token);

    }

  }

  // GET TOKEN
  getToken(): string | null {

    if (typeof window !== 'undefined') {

      return localStorage.getItem('token');

    }

    return null;

  }

  // CHECK LOGIN
  // isLoggedIn(): boolean {

  //   const token = this.getToken();

  //   return !!token;

  // }

  isLoggedIn(): boolean {

  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

   console.log('TOKEN CHECK', token);

  return token !== null && token !== '';
}

  

  // LOGOUT
  logout(): void {

    if (typeof window !== 'undefined') {

      localStorage.removeItem('token');

    }
    this.router.navigate(['/login']);
  }
    // REGISTER
  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

}