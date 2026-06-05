import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
